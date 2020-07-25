from rest_framework import routers
from .api import HikingKeyViewSet


# hiking/ already configured to path in ../PortfolioFull/urls.py
router = routers.SimpleRouter()
router.register('hiking/api/keys', HikingKeyViewSet, basename='hikingKeys')

urlpatterns = router.urls
