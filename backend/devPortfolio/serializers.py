from rest_framework import serializers, fields
from rest_framework.serializers import ImageField
from backend.devPortfolio.models import Project, About, TechTag, TechKeywords, CertDoc

# Project serializer


class TechTagSerializer(serializers.ModelSerializer):

    class Meta:
        model = TechTag
        fields = '__all__'


class TechKeywordsSerializer(serializers.ModelSerializer):

    class Meta:
        model = TechKeywords
        fields = '__all__'


class CertDocSerializer(serializers.ModelSerializer):

    class Meta:
        model = CertDoc
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    tags = TechTagSerializer(many=True, read_only=True)
    keywords = TechKeywordsSerializer(many=False, read_only=True)

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
    certs = CertDocSerializer(many=True, read_only=True)

    class Meta:
        model = About
        fields = '__all__'
        # fields = (
        #     'prof_pic',
        #     'description'
        # )
