# Generated by Django 3.0.3 on 2020-08-31 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('devPortfolio', '0010_auto_20200814_1112'),
    ]

    operations = [
        migrations.AlterField(
            model_name='certdoc',
            name='doc',
            field=models.FileField(upload_to='files/certs'),
        ),
    ]
