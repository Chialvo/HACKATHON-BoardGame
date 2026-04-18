from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'salas', SalaViewSet, 'sala')

urlpatterns = [
    path('', include(router.urls)),
    path('salas/<int:pk>/comenzar/', comenzar_sala),
    path('salas/<int:pk>/termine/', guardar_respuesta),
]