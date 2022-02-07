from operator import gt
from django.core.mail import send_mail
from celery import shared_task
import json
from django.contrib.auth import get_user_model
from django.conf import settings
import os

User = get_user_model()


@shared_task
def send_verification_email(email: str) -> None:
    user = User.objects.get(email=email)
    verification_token = user.verification_token
    verification_link = f"{settings.HOSTNAME}/auth/verify/{verification_token.key}/"
    print(verification_link)
    subject = "Market Watcher"
    body = f"Thank you for signing up with market watcher use this link {verification_link} to complete your registration"
    sender = "hello@marketwatcher.com"
    result = send_mail(subject, body, sender, [user.email])
    verification_token.sent = True
    verification_token.save()
    print(result)
