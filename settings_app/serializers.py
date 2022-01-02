from rest_framework import serializers
from django.core.exceptions import ValidationError


class SettingSerializer(serializers.Serializer):
    coin_name = serializers.CharField(max_length=3)
    upper_threshold = serializers.FloatField()
    lower_threshold = serializers.FloatField()
    date_disabled = serializers.DateTimeField(read_only=True)
    date_created = serializers.DateTimeField(read_only=True)
    last_updated = serializers.DateTimeField(read_only=True)


    def validate(self, data) -> bool:
        
        upper_threshold = data.get("upper_threshold")
        lower_threshold = data.get("lower_threshold")
        if upper_threshold <= lower_threshold:
            raise ValidationError("Upper threshold must be greater than lower threshold")
        return super().validate(data)