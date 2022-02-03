from statistics import mode
from django.db import models


ALERT_CRITERIA = [
    ("BELOW", "below"),
    ("ABOVE", "above"),
]

class Alert(models.Model):
    user = models.ForeignKey("users.User", related_name="alerts", on_delete=models.CASCADE)
    coin = models.ForeignKey("coins.Coin", on_delete=models.CASCADE)
    criteria = models.CharField(max_length=20, choices=ALERT_CRITERIA)
    value = models.FloatField()
    max_executions = models.IntegerField()
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"When {self.coin.code} is {self.criteria} self.value"



class AlertExecution(models.Model):
    alert = models.ForeignKey("alerts.Alert", related_name="executions", on_delete=models.CASCADE)
    data = models.TextField()
    time  = models.DateTimeField(auto_now_add=True)



class AlertReactivator(models.Model):
    alert = models.OneToOneField("alerts.Alert", related_name="reactivator", on_delete=models.CASCADE)