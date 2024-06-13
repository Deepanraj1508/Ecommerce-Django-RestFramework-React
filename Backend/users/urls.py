from django.urls import path
from .views import *

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('contact', ContactView.as_view()),
    path('password-reset', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('reset-password/<int:uid>/<str:token>', SetNewPasswordView.as_view(), name='password_reset_confirm'),
    path('request-otp', RequestOTPView.as_view(), name='request_otp'),
    path('verify-otp', VerifyOTPView.as_view(), name='verify_otp'),
    path('set-new-password', SetNewPasswordView.as_view(), name='set_new_password'),
]