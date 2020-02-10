from rest_framework import routers
from .api import ProjectViewSet, AboutViewSet
from django.urls import path, include
from ..hiking.urls import router as hikingRouter


router = routers.DefaultRouter()
router.register('api/projects', ProjectViewSet, basename='project')
router.register('api/about', AboutViewSet, basename='about')

# include the routes from the hiking app
router.registry.extend(hikingRouter.registry)


urlpatterns = [
    path('', include(router.urls)),
]
