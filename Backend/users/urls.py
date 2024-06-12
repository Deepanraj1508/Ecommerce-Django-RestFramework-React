from django.urls import path
from .views import RegisterView,LoginView,UserView,LogoutView,ContactView,PasswordResetRequestView,SetNewPasswordView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('contact', ContactView.as_view()),
    path('password-reset', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('reset-password/<int:uid>/<str:token>', SetNewPasswordView.as_view(), name='password_reset_confirm'),
]