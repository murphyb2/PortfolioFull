from django.db import models


class HikingKey(models.Model):
    GOOGLE = 'go'
    HIKING_PROJECT = 'hp'
    NAME_CHOICES = [
        (GOOGLE, 'Google'),
        (HIKING_PROJECT, 'Hiking Project'),
    ]

    name = models.CharField(max_length=2, choices=NAME_CHOICES, default=GOOGLE)

    api_key = models.CharField(max_length=2000, null=True)
    verbose_name_plural = "Hiking_Data"

    def __str__(self):
        return "API Key"
