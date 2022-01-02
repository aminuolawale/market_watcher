import os
import json
import requests
import smtplib, ssl
from settings_app.models import Setting
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
from celery import shared_task
from twilio.rest import Client

CRYPTO_API_KEY = os.environ.get("CRYPTO_API_KEY") 

@shared_task
def check_and_send_alerts(*args,**kwargs):
    coins_data = get_coins_data()
    settings = Setting.objects.all()
    for setting in settings:
        upper_threshold = setting.upper_threshold
        lower_threshold = setting.lower_threshold
        if coins_data.get(setting.coin_name) > upper_threshold:
            print("SENDING ALERT FOR UPPER")
            send_alert(coins_data)
        elif coins_data.get(setting.coin_name) < lower_threshold:
            print("SENDING ALERT FOR LOWER")
            send_alert(coins_data)
        else:
            print("NO ALERT TO SEND")



API_BASE_URL="https://pro-api.coinmarketcap.com/v1"

def get_coins_data():
    COINS = "BTC,ETH"
    endpoint = "cryptocurrency/quotes/latest"
    url = f"{API_BASE_URL}/{endpoint}?CMC_PRO_API_KEY={CRYPTO_API_KEY}&symbol={COINS}&convert=USD"
    print(url)
    headers = {
        "Accepts": "application/json", 
        "X-CMC-PRO_API_KEY": CRYPTO_API_KEY
    }
    try:
        response = requests.get(url, headers=headers)
        data = json.loads(response.text)
    except (ConnectionError, Timeout, TooManyRedirects) as e:
        print(e)
    data = data.get("data")
    result = {}
    for coin in COINS.split(","):
        raw_coin_data = data.get(coin)
        price = raw_coin_data.get("quote").get("USD").get("price")
        result[coin] = price
    return result

def send_alert(data):
    send_email(data)


def send_email(data):
    port = 465  # For SSL
    smtp_server = "smtp.gmail.com"
    sender_email = "aminuolawalekan@gmail.com"  # Enter your address
    receiver_email = "aminuolawalekan@gmail.com"  # Enter receiver address
    password = os.environ.get("EMAIL_PASSWORD")
    message = ""
    for coin, value in data.items():
        message += f"\n{coin} is at {value}"

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)



