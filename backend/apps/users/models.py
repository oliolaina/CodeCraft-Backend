from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    is_admin = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # Keep django admin permissions synced with business role flag.
        if self.is_admin:
            self.is_staff = True
        super().save(*args, **kwargs)
