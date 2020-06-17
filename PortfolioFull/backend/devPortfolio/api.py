from backend.devPortfolio.models import Project, About, TechTag
from rest_framework import viewsets, permissions
from .serializers import ProjectSerializer, AboutSerializer, TechTagSerializer

# Project Viewset


class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]
    serializer_class = ProjectSerializer

    queryset = Project.objects.all().order_by('-created_at')


class AboutViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]
    serializer_class = AboutSerializer

    queryset = About.objects.all()

class TechTagViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]
    serializer_class = TechTagSerializer

    queryset = TechTag.objects.all()
