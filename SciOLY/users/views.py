from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import UserRegisterForm
from MainPage.models import *
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login as login_command
from django.contrib.auth import logout as logout_command
from MainPage.models import Member, ProfileRequest
from django.contrib.auth.decorators import login_required
from django.forms import ModelForm
from django.core.files.storage import FileSystemStorage

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
                messages.warning(request,f"{username}'s account has been marked as {AuthenticateStatus.AccountStatus}.")
                return render(request,'users/register.html',{"form":form,"intent":"login"})
    else:
        form = AuthenticationForm()
    return render(request,'users/register.html',{"form":form,"intent":"login"})
def logout(request):
    if request.method == "POST":
        print("Logout called")
        logout_command(request)
        return redirect("MainPage")
def profile(request):
    if request.method == "POST":
        if ProfileRequest.objects.filter(user=User.objects.get(username=request.user.username)).count() == 0:
            username = request.user.username
            Person = Member.objects.get(user=User.objects.get(username=username))
            text = request.POST.get("textfield")
            #If file was uploaded:
            if request.FILES.get('imageupload',False):
                uploaded_file = request.FILES['imageupload']
                fs = FileSystemStorage()
                new = fs.save(uploaded_file.name,uploaded_file)
                url = fs.url(new)
            else:
                url = Person.profileimage.url
            print(url.replace("/media/",""))
            print(text)
            NewChangeRequest = ProfileRequest(user=Person.user,profileimage=url.replace("/media/",""),text=text)
            NewChangeRequest.save()
            context = {
                "Username":username,
                "ProfilePic":Person.profileimage.url,
                "ProfileText":Person.text,
            }
            messages.success(request,f"{username} a request has been submitted successfully")
            return render(request,'users/profile.html',context)
        else:
            username = request.user.username
            Person = Member.objects.get(user=User.objects.get(username=username))
            context = {
                "Username":username,
                "ProfilePic":Person.profileimage.url,
                "ProfileText":Person.text,
            }
            messages.warning(request,f"Sorry a pending request is already present in the system.")
            return render(request,'users/profile.html',context)
    else:
        if request.user.is_authenticated:
            username = request.user.username
            Person = Member.objects.get(user=User.objects.get(username=username))
            context = {
                "Username":username,
                "ProfilePic":Person.profileimage.url,
                "ProfileText":Person.text,
            }
            return render(request,'users/profile.html',context)
        else:
            return redirect('login')