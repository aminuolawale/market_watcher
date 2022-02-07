from django.urls import path, include
from .api import CoinList


urlpatterns = [path("", CoinList.as_view())]
