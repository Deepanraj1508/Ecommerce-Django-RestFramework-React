# SWAGGER DOCUMENTATION

# Django Rest Framework and drf-yasg

This project demonstrates how to set up and document a Django Rest Framework (DRF) API using drf-yasg for automatic generation of Swagger and ReDoc documentation.

## Getting Started

These instructions will guide you through the process of setting up the project and generating API documentation.

### Prerequisites

- Python 3.6+
- Django 3.0+
- Django Rest Framework (DRF)

### Installation

1. **Install drf-yasg:**

    ```bash
    pip install drf-yasg
    ```

### Configuration

1. **Update `settings.py`:**

    Add `drf_yasg` to your `INSTALLED_APPS`:

    ```python
    INSTALLED_APPS = [
        ...
        'rest_framework',
        'drf_yasg',
        ...
    ]
    ```

    Ensure that your Django Rest Framework settings are configured:

    ```python
    REST_FRAMEWORK = {
        'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
    }
    ```

2. **Create a Swagger Schema View:**

    Create a new file `urls_swagger.py` (or add to your existing `urls.py`):

    ```python
    from rest_framework import permissions
    from drf_yasg.views import get_schema_view
    from drf_yasg import openapi
    from django.urls import path

    schema_view = get_schema_view(
        openapi.Info(
            title="Project Name",
            default_version='v1',
            description="Test description",
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
    ```

    Accessing the Documentation

    ```
    Swagger UI: http://127.0.0.1:8000/swagger/
    ReDoc: http://127.0.0.1:8000/redoc/
    ```

3. **Include the Swagger URLs:**

    Include the Swagger URLs in your main `urls.py` file:

    ```python
    from django.contrib import admin
    from django.urls import path, include
    from .urls_swagger import urlpatterns as swagger_urls

    urlpatterns = [
        path('admin/', admin.site.urls),
        path('api/', include('your_app_name.urls')),
        ...
    ]

    # Add the swagger urls
    urlpatterns += swagger_urls
    ```

### Running the Server

Run your Django server:

```bash
python manage.py runserver
