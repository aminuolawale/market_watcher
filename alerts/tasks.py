import imp
from importlib import import_module
from django.core.mail import send_mail
from celery import shared_task
from coins.models import Coin
from .services import CryptoAPI
from .models import Alert


@shared_task
def check_and_send_alerts(*args, **kwargs):
    coin_codes = Coin.objects.filter(is_active=True).values("code")
    print("these are the coin codes", coin_codes)
    crypto_api = CryptoAPI()
    coin_prices = {}
    for coin_code in coin_codes:
        code = coin_code.get("code")
        coin_prices[code] = crypto_api.get_coin_price(code)
    print(coin_prices)
    for alert in Alert.objects.filter(is_active=True):
        current_coin_price = coin_prices.get(alert.coin.code)
        if evaluate_criteria(alert, current_coin_price):
            send_alert(alert, current_coin_price)
            alert.deactivate()
        else:
            print("No alert to send")


def evaluate_criteria(alert, price):
    return alert.value < price if alert.criteria == "ABOVE" else alert.value > price


def send_alert(alert, price):
    subject = "Crypto Alert"
    body = f"""
            The price of {alert.coin.name} is now {alert.criteria} {alert.value} at {price}
    
            """
    sender = "alert@marketwatcher.com"
    send_mail(subject, body, sender, [alert.user.email])
