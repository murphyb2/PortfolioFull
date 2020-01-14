from rest_framework import routers
from .api import ProjectViewSet, AboutViewSet

router = routers.DefaultRouter()
router.register('api/projects', ProjectViewSet, basename='project')
router.register('api/about', AboutViewSet, basename='about')

urlpatterns = router.urls
