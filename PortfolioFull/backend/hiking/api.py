from backend.hiking.models import HikingKey
from rest_framework import viewsets, permissions
from .serializers import HikingKeySerializer


class HikingKeyViewSet(viewsets.ModelViewSet):
    permissions_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = HikingKeySerializer

    queryset = HikingKey.objects.all()
