from typing import Set
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Setting
from .serializers import SettingSerializer



class SettingsView(APIView):
    """
    """
    def post(self, request, format=None):
        """
        This sets the settings
        """
        data = request.data
        serializer = SettingSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors)
        validated_data = serializer.validated_data
        setting, created = Setting.objects.update_or_create(**validated_data)
        return Response(SettingSerializer(setting).data)