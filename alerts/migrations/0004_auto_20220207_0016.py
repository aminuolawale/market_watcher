# Generated by Django 3.2.12 on 2022-02-07 00:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("alerts", "0003_remove_alert_max_executions"),
    ]

    operations = [
        migrations.AddField(
            model_name="alert",
            name="is_active",
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name="alertreactivator",
            name="is_active",
            field=models.BooleanField(default=False),
        ),
    ]
