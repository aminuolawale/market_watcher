from rest_framework import generics
from rest_framework.response import Response
from .models import Coin
from .serializers import CoinSerializer





class CoinList(generics.ListAPIView):
    queryset = Coin.objects.all()
    serializer_class = CoinSerializer


    def list(self, request) -> Response:
        queryset = self.get_queryset()
        serializer = CoinSerializer(queryset, many=True)
        return Response(serializer.data)