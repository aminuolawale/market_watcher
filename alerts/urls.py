from django.urls import path
from .api import AlertView


urlpatterns = [path("", AlertView.as_view())]
