from django.db import models

class Sala(models.Model):
    nombre = models.CharField(max_length=200)
    rondas = models.IntegerField()
    player1 = models.CharField(max_length=200)
    player2 = models.CharField(max_length=100, null=True, blank=True)
    score1 = models.IntegerField(null=True, blank=True)
    score2 = models.IntegerField(null=True, blank=True)
    letra = models.CharField(max_length=1, null=True, blank=True)
    mensaje = models.TextField(max_length=1, null=True, blank=True)




