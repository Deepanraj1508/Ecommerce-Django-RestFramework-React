from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from .serializers import UserSerializers,ContactSerializer
from .models import User
import jwt
from datetime import datetime, timezone, timedelta
import logging

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        name = serializer.validated_data['name']
        email = serializer.validated_data['email']
        website_name = 'EcomGrove'
        registration_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        support_email = 'support@ecomgrove.com'  # replace with actual support email
        support_phone = '+1-800-123-4567'  # replace with actual support phone number

        email_subject = f"Registration Successful! Welcome to {website_name}"
        email_body = f"""
        Dear {name},

        Thank you for registering with {website_name}! We are thrilled to welcome you to our shopping community.

        Your registration form has been successfully submitted, and your account is now active.

        Here are the details you provided:

        Full Name: {name}
        Email Address: {email}
        Registration Date: {registration_date}

        What to Expect Next:

        - Explore Our Catalog: Browse through our extensive range of products and find what you love.
        - Exclusive Offers: Stay tuned for special discounts and offers available only to our registered members.
        - Easy Checkout: Enjoy a seamless and secure checkout experience with multiple payment options.
        - Order Tracking: Keep track of your orders and get real-time updates on your shipments.

        To get you started, here’s a special welcome gift: Use code WELCOME10 for 10% off your first purchase!

        If you have any questions or need assistance, our customer support team is here to help. Contact us at {support_email} or {support_phone}.

        Thank you for choosing {website_name}. We look forward to serving you!

        Happy Shopping!

        Best regards,

        {website_name},
        Karur,
        Tamilnadu.
        """

        try:
            # Send automatic response to the user
            send_mail(
                subject=email_subject,
                message=email_body,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=False,
            )

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error sending email: {e}")
            return Response({'detail': 'Message saved, but email sending failed.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        
        response = Response({
            'jwt': token
        })
        response.set_cookie(key='jwt', value=token, httponly=True)
        
        return response


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
        serializer = UserSerializers(user)
        
        return Response(serializer.data)

class LogoutView(APIView):
     def post(self, request):
         response = Response()
         response.delete_cookie('jwt')
         response.data = {
             "message" : 'Success'
         }
         return response
    

logger = logging.getLogger(__name__)

class ContactView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        name = serializer.validated_data['name']
        email = serializer.validated_data['email']
        message = serializer.validated_data['message']

        try:
            # Send email to predefined email address
            send_mail(
                subject=f"New Contact Message from {name}",
                message=f"Name: {name}\nEmail: {email}\nMessage: {message}",
                from_email=email,
                recipient_list=[settings.EMAIL_HOST_USER],
                fail_silently=False,
            )

            # Send automatic response to the user
            send_mail(
                subject="Thank you for contacting us",
                message=f"Dear {name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nShopHub.Pvt.Ltd,\nKarur,\nTamilNadu.",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=False,
            )

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error sending email: {e}")
            return Response({'detail': 'Message saved, but email sending failed.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)