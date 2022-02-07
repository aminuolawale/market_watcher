from distutils import errors
from operator import imod
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from .tasks import send_verification_email
from .models import VerificationToken
import json

User = get_user_model()


class Signup(APIView):
    permission_classes = []

    def post(self, request) -> Response:
        request_body = request.data
        serializer = UserSerializer(data=request_body)
        if serializer.is_valid():
            instance = serializer.save()
            send_verification_email.delay(instance.email)
            return Response(
                {
                    "status": "success",
                    "user": UserSerializer(instance).data,
                    "errors": [],
                }
            )
        return Response({"status": "failure", "errors": serializer.errors})


class VerifyUser(APIView):
    permission_classes = []

    def get(self, request, *args, **kwargs) -> Response:
        token = kwargs.get("token")
        try:
            verification_token = VerificationToken.objects.get(key=token)
        except VerificationToken.DoesNotExist:
            return Response(
                {"status": "failure", errors: ["Invalid verification token"]}
            )
        user = verification_token.user
        user.is_verified = True
        user.save()
        verification_token.delete()
        return Response({"status": "success", "errors": []})
