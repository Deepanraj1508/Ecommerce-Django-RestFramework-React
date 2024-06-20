from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from .email_utils import send_registration_email, send_contact_message, send_otp_sms
from django.utils.crypto import get_random_string
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from datetime import datetime, timezone, timedelta
from django.utils import timezone
from .serializers import UserSerializer, PasswordResetSerializer, SetNewPasswordSerializer, ContactSerializer
from .models import User
from twilio.rest import Client
from django.core.exceptions import ObjectDoesNotExist
import jwt
import logging

User = get_user_model()
logger = logging.getLogger(__name__)
client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

def send_otp(phone_number, otp):
    try:
        send_otp_sms(phone_number, otp)
    except Exception as e:
        raise Exception('Failed to send OTP via SMS.')

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            phone_number = serializer.validated_data['phone_number']

            if User.objects.filter(email=email).exists():
                return Response({'error': 'Email address is already registered.'}, status=status.HTTP_400_BAD_REQUEST)
            if User.objects.filter(phone_number=phone_number).exists():
                return Response({'error': 'Phone number is already registered.'}, status=status.HTTP_400_BAD_REQUEST)

            user = serializer.save(is_active=False)  # Save the user as inactive initially

            # Generate OTP
            otp = get_random_string(length=6, allowed_chars='0123456789')
            user.otp = otp
            user.save()

            # Send OTP via SMS
            try:
                send_otp(phone_number, otp)
            except Exception as sms_error:
                user.delete()  # Rollback user creation if SMS sending fails
                return Response({'error': 'Please enter a valid phone number to receive the one-time password (OTP) via SMS.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'message': 'User registered. Please verify your phone number.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTPView(APIView):
    def post(self, request):
        otp = request.data.get('otp')
        try:
            user = User.objects.get(otp=otp)
            user.is_active = True
            user.otp = ''
            user.save(update_fields=['is_active', 'otp'])
            send_registration_email(user.name, user.email)
            return Response({'message': 'OTP verified and user activated.'}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': 'Invalid OTP or phone number.'}, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = User.objects.get(email=serializer.validated_data['email'])
                token = default_token_generator.make_token(user)
                reset_url = f"{settings.FRONTEND_URL}/reset-password/{user.pk}/{token}/"
                expiration_time = timezone.now() + timezone.timedelta(minutes=10)
                user.password_reset_token_created_at = expiration_time
                user.save()

                reset_link_with_expiry = f'{reset_url} (valid for 10 minutes)'
                send_mail(
                    'Password Reset Request',
                    f'Click the link to reset your password: {reset_link_with_expiry}',
                    settings.DEFAULT_FROM_EMAIL,
                    [user.email]
                )
                return Response({'message': 'Password reset link sent.'}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'error': 'User with this email does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SetNewPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uid, token):
        logger.debug(f"Received POST request for password reset. uid: {uid}, token: {token}")

        try:
            user = User.objects.get(pk=uid)
        except User.DoesNotExist:
            logger.error(f"User with ID {uid} does not exist.")
            return Response({'error': 'Invalid user.'}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            logger.error(f"Invalid token for user ID {uid}.")
            return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)

        if user.password_reset_token_created_at < timezone.now():
            logger.error(f"Token has expired for user ID {uid}.")
            return Response({'error': 'Token has expired.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = SetNewPasswordSerializer(data=request.data)
        if serializer.is_valid():
            user.set_password(serializer.validated_data['new_password'])
            user.password_reset_token_created_at = None  # Reset token creation time after use
            user.save()
            logger.info(f"Password reset successful for user ID {uid}.")
            return Response({'message': 'Password has been reset.'}, status=status.HTTP_200_OK)
        else:
            logger.error(f"Invalid serializer data for user ID {uid}: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')

        payload = {
            'id': user.id,
            'exp': datetime.now(timezone.utc) + timedelta(minutes=60),
            'iat': datetime.now(timezone.utc)
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

        response = Response({'jwt': token})
        response.set_cookie(key='jwt', value=token, httponly=True)
        return response

class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        if not user:
            raise AuthenticationFailed('User not found!')

        serializer = UserSerializer(user)
        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {"message": 'Success'}
        return response

class ContactView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        name = serializer.validated_data['name']
        email = serializer.validated_data['email']
        message = serializer.validated_data['message']

        try:
            send_contact_message(name, email, message)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception:
            return Response({'detail': 'Message saved, but email sending failed.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
