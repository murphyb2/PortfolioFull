from django.contrib import admin
from backend.hiking.models import HikingKey


class HikingKeyAdmin(admin.ModelAdmin):
    list_display = ('name', 'api_key',)


admin.site.register(HikingKey, HikingKeyAdmin)
