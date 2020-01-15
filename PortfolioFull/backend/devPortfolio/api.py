from backend.devPortfolio.models import Project, About
from rest_framework import viewsets, permissions
from .serializers import ProjectSerializer, AboutSerializer

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
