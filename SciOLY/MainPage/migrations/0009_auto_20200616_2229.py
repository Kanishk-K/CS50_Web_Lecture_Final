# Generated by Django 3.0.7 on 2020-06-17 03:29

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('MainPage', '0008_profilerequests'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ProfileRequests',
            new_name='ProfileRequest',
        ),
    ]
