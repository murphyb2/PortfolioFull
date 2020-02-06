from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('backend.devPortfolio.urls')),
    path('photo/', include('backend.photoPortfolio.urls')),
    # path('', include('accounts.urls')),
    path('hiking/', include('backend.hiking.urls')),
    # path('', include('subway.urls')),
    path('admin/', admin.site.urls),
]
if settings.DEBUG:
    # Use static() to add url mapping to serve static files during development (only)
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
