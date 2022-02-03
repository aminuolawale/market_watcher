from statistics import mode
from django.db import models

# Create your models here.


class Coin(models.Model):
    name = models.CharField(max_length=20, verbose_name="Full Name of Coin")
    code = models.CharField(max_length=3, verbose_name="3 Digit code of Coin", unique=True)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)


    def __str__(self) -> str:
        return self.code






