from django.db import models
from django.contrib.auth.models import User


class TechTag(models.Model):
    tech = models.CharField(max_length=100)
    icon = models.ImageField(upload_to='pictures/tech', null=True)

    def __str__(self):
        return self.tech


class CertDoc(models.Model):
    doc = models.FileField(upload_to='files/certs')
    title = models.CharField(max_length=200)

    def __str__(self):
        return self.title


class TechKeywords(models.Model):
    keywords = models.TextField(max_length=1000)

    verbose_name_plural = "Keywords"

    def __str__(self):
        return ("Keywords")


class Project(models.Model):
    name = models.CharField(max_length=200)
    short_title = models.CharField(max_length=12, null=True)
    url = models.URLField(max_length=200, unique=True, blank=True)
    description = models.TextField(max_length=2000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    cover_image = models.ImageField(upload_to='pictures/', null=True)
    inProgress = models.BooleanField(default=False)
    tags = models.ManyToManyField(TechTag, blank=True)
    keywords = models.ForeignKey(
        TechKeywords, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


class About(models.Model):
    description = models.TextField(max_length=2000, blank=True)
    prof_pic = models.ImageField(upload_to='pictures/profilePic', null=True)

    resume = models.FileField(upload_to='files/resume', blank=True)
    certs = models.ManyToManyField(CertDoc, blank=True)

    verbose_name_plural = "About"

    def __str__(self):
        return ("About Page")
