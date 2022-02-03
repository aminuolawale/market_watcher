from contextlib import AbstractAsyncContextManager
from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager
from secrets import token_hex

class VerificationToken(models.Model):
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
    key  = models.TextField()
    sent = models.BooleanField(default=False)

class User(AbstractUser):
    username = None
    email = models.EmailField("Email Address", unique=True)
    middle_name = models.CharField(max_length=30, default="")
    is_verified = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self) -> str:
        return self.email

    @property
    def verification_token(self):
        return VerificationToken.objects.filter(user=self).first()

    def generate_verification_token(self):
        print("generating verification token")
        return VerificationToken.objects.create(user=self, key=token_hex(32))






