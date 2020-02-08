from rest_framework import routers
from .api import HikingKeyViewSet


# hiking/ already configured to path in ../PortfolioFull/urls.py
router = routers.DefaultRouter()
router.register('api/key', HikingKeyViewSet, basename='hiking')

urlpatterns = router.urls
