from rest_framework import serializers
from .models import User,Contact

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name','email', 'password', 'phone_number']
        extra_kwargs ={
            'password' : {'write_only':True}
        }
        
    def create(self, validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'message']

    def validate_email(self, value):
        if '@' not in value:
            raise serializers.ValidationError("Invalid email address")
        return value