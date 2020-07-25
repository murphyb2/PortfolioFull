from django.contrib import admin
from .models import Image, About


class ImageAdmin(admin.ModelAdmin):
    list_display = ('alt_text', 'priority', 'portfolio_section')


# Register admin class with associated model
admin.site.register(Image, ImageAdmin)


admin.site.register(About)
