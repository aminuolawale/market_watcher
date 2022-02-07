from statistics import mode
from django.db import models


ALERT_CRITERIA = [
    ("BELOW", "below"),
    ("ABOVE", "above"),
]

ALERT_CRITERIA_REACTIVATOR_MAP = {"BELOW": "ABOVE", "ABOVE": "BELOW"}


class Alert(models.Model):
    user = models.ForeignKey(
        "users.User", related_name="alerts", on_delete=models.CASCADE
    )
    coin = models.ForeignKey("coins.Coin", on_delete=models.CASCADE)
    criteria = models.CharField(max_length=20, choices=ALERT_CRITERIA)
    value = models.FloatField()
    is_active = models.BooleanField(default=True)
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"When {self.coin.code} is {self.criteria} self.value"

    def deactivate(self):
        self.is_active = False
        self.save()


class AlertExecution(models.Model):
    alert = models.ForeignKey(
        "alerts.Alert", related_name="executions", on_delete=models.CASCADE
    )
    data = models.TextField()
    time = models.DateTimeField(auto_now_add=True)


class AlertReactivator(models.Model):
    alert = models.OneToOneField(
        "alerts.Alert", related_name="reactivator", on_delete=models.CASCADE
    )
    is_active = models.BooleanField(default=False)

    @property
    def criteria(self):
        return ALERT_CRITERIA_REACTIVATOR_MAP.get(self.alert.criteria)
