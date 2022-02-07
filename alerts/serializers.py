import imp
from rest_framework import serializers
from .models import Alert
from coins.models import Coin


class AlertSerializer(serializers.Serializer):
    coin = serializers.SlugRelatedField(slug_field="code", queryset=Coin.objects.all())
    criteria = serializers.CharField()
    value = serializers.FloatField()

    def save(self, **kwargs):

        return Alert.objects.create(**self.validated_data, **kwargs)
