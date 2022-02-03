from distutils.log import error
from market_watcher.alerts.models import Alert
from rest_framework.views import APIView
from .serializers import AlertSerializer
from rest_framework.response import Response


class AlertView(APIView):
    def post(self, request, *args, **kwargs):
        request_body = request.data
        serializer = AlertSerializer(data=request_body)
        if serializer.is_valid():
            instance = serializer.save()
            return Response({"status":"success", "alert": AlertSerializer(instance).data, "errors":[]})
        return Response({"status":"failure", "errors":serializer.errors})
        