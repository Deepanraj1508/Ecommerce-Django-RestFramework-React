from rest_framework.views import APIView # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.exceptions import AuthenticationFailed # type: ignore
from rest_framework import  status # type: ignore
from rest_framework.permissions import AllowAny # type: ignore
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from .email_utils import send_registration_email,send_contact_message,send_otp_sms
from django.utils.crypto import get_random_string
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from datetime import datetime, timezone, timedelta
from django.utils import timezone
from .serializers import *
from .models import User
from twilio.rest import Client # type: ignore
from django.core.exceptions import ObjectDoesNotExist
import jwt
import logging


User = get_user_model()
logger = logging.getLogger(__name__)
client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)


#Registration
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Check if user already exists with the given email or phone number
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
                send_otp_sms(phone_number, otp)
            except Exception as sms_error:
                # Handle SMS sending failure
                user.delete()  # Rollback user creation if SMS sending fails
                return Response({'error': 'Please enter a valid phone number to receive the one-time password (OTP) via SMS.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            return Response({'message': 'User registered. Please verify your phone number.'}, status=status.HTTP_201_CREATED)
        
        except Exception as registration_error:
            # Handle registration failure
            return Response({'error': str(registration_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class VerifyOTPView(APIView):
    def post(self, request):
        otp = request.data.get('otp')

        try:
            user = User.objects.get(otp=otp)

            # Update only necessary fields
            user.is_active = True
            user.otp = ''
            user.save(update_fields=['is_active', 'otp'])
            send_registration_email(user.name, user.email)

            return Response({'message': 'OTP verified and user activated.'}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': 'Invalid OTP or phone number.'}, status=status.HTTP_400_BAD_REQUEST)


# Email to password change
class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = User.objects.get(email=serializer.validated_data['email'])
                token = default_token_generator.make_token(user)
                reset_url = f"{settings.FRONTEND_URL}/reset-password/{user.pk}/{token}/"
                
                # Add expiration time (10 minutes from now)
                expiration_time = timezone.now() + timezone.timedelta(minutes=10)
                user.password_reset_token_created_at = expiration_time
                user.save()

                # Mention expiration time in the email content
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

    def post(self, request, uid, token, *args, **kwargs):
        logger.debug(f"Received POST request for password reset. uid: {uid}, token: {token}")

        try:
            user = User.objects.get(pk=uid)
        except User.DoesNotExist:
            logger.error(f"User with ID {uid} does not exist.")
            return Response({'error': 'Invalid user.'}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            logger.error(f"Invalid token for user ID {uid}.")
            return Response({'error': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)

        if not user.password_reset_token_created_at:
            logger.error(f"password_reset_token_created_at is None for user ID {uid}.")
            return Response({'error': 'Password reset token creation time not set.'}, status=status.HTTP_400_BAD_REQUEST)

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
    
    
#User Login 
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
                'exp': timezone.now() + timedelta(minutes=60),  # expiration time in UTC
                'iat': datetime.utcnow()  # issued at time in UTC
            }
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        
        response = Response({
            'jwt': token
        })
        response.set_cookie(key='jwt', value=token, httponly=True)
        
        return response
    

# User get data
class UserView(APIView):
    
    def get(self, request):
        token = request.COOKIES.get('jwt')
        
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        
        user = User.objects.filter(id=payload['id']).first()
        if not user:
            raise AuthenticationFailed('User not found!')
        
        # Assuming you have a serializer for the User model
        serializer = UserSerializer(user)
        
        return Response(serializer.data)


#Logout 
class LogoutView(APIView):
     def post(self, request):
         response = Response()
         response.delete_cookie('jwt')
         response.data = {
             "message" : 'Success'
         }
         return response
     

# Contanct Page
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