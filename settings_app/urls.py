from django.urls import path
from .api import SettingsView
urlpatterns = [
    
    path("", SettingsView.as_view())
]