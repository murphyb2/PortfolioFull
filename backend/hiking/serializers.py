from rest_framework import serializers, fields
from backend.hiking.models import HikingKey


class HikingKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = HikingKey

        fields = (
            'name',
            'api_key',
        )
