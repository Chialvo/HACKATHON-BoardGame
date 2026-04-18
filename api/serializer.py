# serializers.py
from rest_framework import serializers
from .models import *

class SalaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sala
        fields = '__all__'