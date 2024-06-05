from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializers
from .models import User
import jwt
from datetime import datetime, timezone, timedelta


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

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