# Generated by Django 3.0.3 on 2020-02-08 16:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hiking', '0002_auto_20200208_1131'),
    ]

    operations = [
        migrations.AddField(
            model_name='hikingkey',
            name='name',
            field=models.CharField(choices=[('go', 'Google'), ('hp', 'Hiking Project')], default='go', max_length=2),
        ),
    ]
