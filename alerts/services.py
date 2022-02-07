import json
import os
import requests
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects


class CryptoAPI:
    def __init__(self) -> None:
        self.base_url = "https://pro-api.coinmarketcap.com/v1"
        self.currency_base = "USD"
        self.api_key = os.environ.get("CRYPTO_API_KEY")
        self.default_query_params = dict(
            CMC_PRO_API_KEY=self.api_key, convert=self.currency_base
        )
        self.default_headers = {
            "Accepts": "application/json",
            "X-CMC-PRO_API_KEY": self.api_key,
        }

    def get_coin_price(self, coin_code):
        url = self.build_url(
            "cryptocurrency",
            "quotes",
            "latest",
            symbol=coin_code,
            **self.default_query_params,
        )
        data = self.rest_get(url, self.default_headers)
        return data.get(coin_code).get("quote").get(self.currency_base).get("price")

    def build_url(self, *resources, **query_params):
        url = self.base_url
        for resource in resources:
            url += f"/{resource}"
        url += "?"
        for param, value in query_params.items():
            url += f"{param}={value}&"
        return url

    def rest_post(self, url, data, headers):
        try:
            response = requests.post(url, json=data, headers=headers)
            data = json.loads(response.text)
        except (ConnectionError, Timeout, TooManyRedirects) as e:
            print(e)
        return data.get("data")

    def rest_get(self, url, headers):
        try:
            response = requests.get(url, headers=headers)
            data = json.loads(response.text)
        except (ConnectionError, Timeout, TooManyRedirects) as e:
            print(e)
        return data.get("data")
