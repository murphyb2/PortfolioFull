# Generated by Django 3.0.2 on 2020-01-14 18:34

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='About',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(blank=True, max_length=2000)),
                ('prof_pic', models.ImageField(null=True, upload_to='pictures/profilePic')),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('short_title', models.CharField(max_length=12, null=True)),
                ('url', models.URLField(unique=True)),
                ('description', models.TextField(blank=True, max_length=2000)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('cover_image', models.ImageField(null=True, upload_to='pictures/')),
                ('inProgress', models.BooleanField(default=False)),
            ],
        ),
    ]