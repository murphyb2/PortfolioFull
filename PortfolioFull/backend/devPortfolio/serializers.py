from rest_framework import serializers, fields
from rest_framework.serializers import ImageField
from backend.devPortfolio.models import Project, About, TechTag

# Project serializer

class TechTagSerializer(serializers.ModelSerializer):

    class Meta:
        model = TechTag
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    tags = TechTagSerializer(many=True, read_only=True)
    class Meta:
        model = Project
        fields = '__all__'
        # fields = (
        #     'id',
        #     'name',
        #     'short_title',
        #     'url',
        #     'description',
        #     'cover_image',
        #     'inProgress',
        #     'tags'
        # )


class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = (
            'prof_pic',
            'description'
        )


