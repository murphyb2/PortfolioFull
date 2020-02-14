from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User


class Command(BaseCommand):

    def handle(self, *args, **options):
        if not User.objects.filter(username="bryan").exists():
            User.objects.create_superuser(
                "bryan", "brymurph@gmail.com", "58Fi#v98XH8q*2xe")
            self.stdout.write(self.style.SUCCESS(
                'Successfully created new super user'))
            print("Created new superuser")
