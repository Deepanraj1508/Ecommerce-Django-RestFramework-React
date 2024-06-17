from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.urls import path

schema_view = get_schema_view(
   openapi.Info(
      title="Ecommerce Website",
      default_version='v2',
      description='''E-commerce built with Django Rest Framework and React, offering seamless user experience and robust backend functionality for online shopping needs.
      Enjoy smooth navigation, secure transactions, and dynamic product management.''',
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@blog.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]