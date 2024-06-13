from rest_framework import serializers
from .models import User, Contact, PhoneOTP

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'phone_number']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False)
    phone_number = serializers.CharField(required=False)

    def validate(self, attrs):
        email = attrs.get('email')
        phone_number = attrs.get('phone_number')

        if not email and not phone_number:
            raise serializers.ValidationError("Either email or phone number is required.")

        if email:
            if not User.objects.filter(email=email).exists():
                raise serializers.ValidationError("User with this email does not exist.")
        elif phone_number:
            if not User.objects.filter(phone_number=phone_number).exists():
                raise serializers.ValidationError("User with this phone number does not exist.")

        return attrs
    
class SetNewPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True)
    re_new_password = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['new_password'] != data['re_new_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'message']

    def validate_email(self, value):
        if '@' not in value:
            raise serializers.ValidationError("Invalid email address")
        return value

class OTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField()

    def validate_phone_number(self, value):
        if not User.objects.filter(phone_number=value).exists():
            raise serializers.ValidationError("User with this phone number does not exist.")
        return value
    
class VerifyOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    otp = serializers.CharField()

    def validate(self, data):
        phone_number = data.get('phone_number')
        otp = data.get('otp')

        if not User.objects.filter(phone_number=phone_number).exists():
            raise serializers.ValidationError("User with this phone number does not exist.")

        if not PhoneOTP.objects.filter(phone_number=phone_number, otp=otp, is_verified=False).exists():
            raise serializers.ValidationError("Invalid OTP.")

        return data