from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.name}"
class Award(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.name}"
class Member(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    events = models.ManyToManyField(Event)
    awards = models.ManyToManyField(Award)

    def __str__(self):
        return f"{self.user}"

class Team(models.Model):
    name = models.CharField(max_length=64)
    members = models.ManyToManyField(Member)
    
    def __str__(self):
        return f"{self.name}"
