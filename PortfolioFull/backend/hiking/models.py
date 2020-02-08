from django.db import models


class HikingKey(models.Model):
    api_key = models.CharField(max_length=2000, null=True)
    verbose_name_plural = "Hiking_Data"

    def __str__(self):
        return "API Key"
