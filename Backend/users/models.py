from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    password_reset_token_created_at = models.DateTimeField(blank=True, null=True)
    otp = models.CharField(max_length=6, blank=True, null=True)
    phone_number = models.CharField(max_length=15, unique=True, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    timestamp = models.DateTimeField(default=timezone.now)
    updatedate = models.DateTimeField(auto_now=True)
    username = None
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return self.name
