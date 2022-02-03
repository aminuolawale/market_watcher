from rest_framework import serializers





class CoinSerializer(serializers.Serializer):
    name = serializers.CharField()
    code = serializers.CharField()
    description = serializers.CharField()
    is_active = serializers.BooleanField()
    date_created = serializers.DateTimeField()
    last_updated = serializers.DateTimeField()