from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import UserRegisterForm
from MainPage.models import *
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login as login_command
from MainPage.models import Member

# Create your views here.

def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            NewUser = User.objects.filter(username=username).first()
            NewMember = Member(user=NewUser)
            NewMember.save()
            messages.success(request, f"{username} you have successfully applied to Science Olympiad")
            return redirect('MainPage')
    else:
        form = UserRegisterForm()
    return render(request, 'users/register.html',{'form':form,"intent":"apply"})
def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            username = form.get_user()
            Person = User.objects.get(username=username)
            AuthenticateStatus = Member.objects.get(user=Person)
            if AuthenticateStatus.AccountStatus == "Activated":
                login_command(request,username)
                messages.success(request,f"Login was successful, {username} authenticated.")
                return redirect('MainPage')
            else:
                messages.warning(request,f"Login for {username} was unsuccessful")
                return render(request,'users/register.html',{"form":form,"intent":"login"})
    else:
        form = AuthenticationForm()
    return render(request,'users/register.html',{"form":form,"intent":"login"})