# Generated by Django 3.0.3 on 2020-06-18 18:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('devPortfolio', '0006_auto_20200617_1712'),
    ]

    operations = [
        migrations.CreateModel(
            name='TechKeywords',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('keywords', models.TextField(max_length=1000)),
            ],
        ),
        migrations.AlterField(
            model_name='project',
            name='url',
            field=models.URLField(blank=True, unique=True),
        ),
        migrations.AddField(
            model_name='project',
            name='keywords',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='devPortfolio.TechKeywords'),
        ),
    ]
