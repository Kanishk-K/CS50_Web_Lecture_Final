from django.db import models
from django.contrib.auth.models import User

AccStatus = (
    ('Rejected','Rejected'),
    ('Inactivated', 'Inactivated'),
    ('Activated','Activated'),
    ('Alumni','Alumni'),
)

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
    profileimage = models.ImageField(default='/Person.png')
    text = models.TextField(default="I am a member of the Eastview Science Olympiad Team. It's a really fun time to be a part of the team, the events are great and never are boring. Maybe you should join sometime.")
    events = models.ManyToManyField(Event,blank=True)
    awards = models.ManyToManyField(Award,blank=True)
    Is_Capitan = models.BooleanField(default=False)
    AccountStatus = models.CharField(max_length=11,choices=AccStatus,default="Inactivated")

    def __str__(self):
        return f"{self.user}"

class Team(models.Model):
    name = models.CharField(max_length=64)
    members = models.ManyToManyField(Member)
    
    def __str__(self):
        return f"{self.name}"
