from django.shortcuts import render
from django.shortcuts import HttpResponse
from .models import *
from django.http import JsonResponse

# Create your views here.
def index(request):
    return render(request, "MainPage/index.html")

def UserInfo(request):
    return JsonResponse(request,{})