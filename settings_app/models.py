from django.db import models
from datetime import datetime
# Create your models here.

COINS = [("BTC", "Bitcoin"), ("ETH", "Ethereum")]

class Setting(models.Model):
    coin_name = models.CharField(max_length=3, unique=True, choices=COINS)
    upper_threshold = models.FloatField()
    lower_threshold = models.FloatField()
    date_disabled = models.DateTimeField(default=datetime.now)
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.coin_name
