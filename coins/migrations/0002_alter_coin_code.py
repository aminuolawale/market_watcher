# Generated by Django 3.2.12 on 2022-02-06 23:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("coins", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="coin",
            name="code",
            field=models.CharField(
                max_length=3, unique=True, verbose_name="3 Digit code of Coin"
            ),
        ),
    ]
