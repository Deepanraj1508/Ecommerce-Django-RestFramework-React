
from django.contrib import admin
from django.urls import path,include
from .urls_swagger import urlpatterns as swagger_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('authentication.urls')),
]

# Add the swagger urls
urlpatterns += swagger_urls

