from django.contrib import admin
from backend.devPortfolio.models import Project, About


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'url', 'description',
                    'cover_image', 'created_at')


admin.site.register(Project, ProjectAdmin)


class AboutAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'prof_pic')


admin.site.register(About, AboutAdmin)
