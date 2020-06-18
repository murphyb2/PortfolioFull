from django.contrib import admin
from backend.devPortfolio.models import Project, About, TechTag


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'url', 'description',
                    'cover_image', 'created_at')


admin.site.register(Project, ProjectAdmin)


class AboutAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'prof_pic')


admin.site.register(About, AboutAdmin)

class TechTagAdmin(admin.ModelAdmin):
    list_display = ('tech',)


admin.site.register(TechTag, TechTagAdmin)
