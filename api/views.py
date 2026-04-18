# views.py
from rest_framework import viewsets
import random
import json
import string
from rest_framework.response import Response
from .models import *
from .serializer import *
from rest_framework.decorators import action
from rest_framework.decorators import api_view
from rest_framework import status

class SalaViewSet(viewsets.ModelViewSet):
    queryset = Sala.objects.all()
    serializer_class = SalaSerializer


@api_view(['POST'])
def comenzar_sala(request, pk):
    try:
        sala = Sala.objects.get(pk=pk)
    except Sala.DoesNotExist:
        return Response({"error": "Sala no encontrada"}, status=404)

    letra = random.choice(string.ascii_uppercase)
    sala.letra = letra
    sala.save()

    return Response({
        "mensaje": "Sala iniciada",
        "letra": letra
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def guardar_respuesta(request, pk):
    data = request.data
    sala_id = data.get("sala_id")

    palabras = data.get("palabras")
    categorias = data.get("categorias")
    tiempo = data.get("tiempo")

    # 🔴 validar tipos básicos
    if tiempo is None:
        return Response({
            "error": "palabras, categorias y tiempos deben ser listas"
        }, status=400)

    try:
        sala = Sala.objects.get(pk=pk)
    except Sala.DoesNotExist:
        return Response({"error": "Sala no encontrada"}, status=404)

    # 🔴 CLAVE: verificar si ya existe mensaje
    if sala.mensaje:
        return Response({
            "error": "La sala ya tiene un mensaje guardado"
        }, status=status.HTTP_400_BAD_REQUEST)

    # guardar como string
    mensaje_str = json.dumps(data)

    sala.mensaje = mensaje_str
    sala.save()

    return Response({
        "mensaje": "Datos guardados correctamente",
        "guardado": mensaje_str
    }, status=status.HTTP_200_OK)