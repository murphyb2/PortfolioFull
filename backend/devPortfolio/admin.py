from django.contrib import admin
from backend.devPortfolio.models import Project, About, TechTag, TechKeywords


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'url', 'description',
                    'cover_image', 'created_at')


admin.site.register(Project, ProjectAdmin)


class AboutAdmin(admin.ModelAdmin):
    list_display = ('id', 'description', 'prof_pic', 'resume')


admin.site.register(About, AboutAdmin)


class TechTagAdmin(admin.ModelAdmin):
    list_display = ('tech',)


admin.site.register(TechTag, TechTagAdmin)


class TechKeywordsAdmin(admin.ModelAdmin):
    list_display = ('keywords',)


admin.site.register(TechKeywords, TechKeywordsAdmin)
