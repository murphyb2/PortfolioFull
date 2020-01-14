from rest_framework import serializers, fields
from rest_framework.serializers import ImageField
from devPortfolio.models import Project, About

# Project serializer


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project

        fields = (
            'id',
            'name',
            'short_title',
            'url',
            'description',
            'cover_image',
            'inProgress'
        )


class AboutSerializer(serializers.ModelSerializer):

    class Meta:
        model = About
        fields = (
            'prof_pic',
            'description'
        )
