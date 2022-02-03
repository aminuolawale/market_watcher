from rest_framework import serializers


class AlertSerializer(serializers.Serializer):
    coin = serializers.CharField()