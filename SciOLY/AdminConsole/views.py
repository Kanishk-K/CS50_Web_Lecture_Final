from django.shortcuts import render,redirect
from MainPage.models import Member, ProfileRequest
from django.contrib.auth.models import User
from django.db.models import Q
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls import static
import os


# Create your views here.
def index(request):
    #Check if the user is an admin or not.
    if request.user.is_staff:
        person = Member.objects.get(user=request.user)
        context = {
            "FirstName":person.user.first_name,
            "LastName":person.user.last_name,
            "ImageLink":person.profileimage.url,
        }
        return render(request, 'AdminConsole/index.html',context)
    else:
        return redirect('MainPage')
def Applications(request):
    if request.user.is_staff:
        if request.method == "POST":
            username = request.POST.get("username")
            Person = Member.objects.get(user=User.objects.get(username=username))
            if request.POST.get("intent") == "Activate":
                Person.AccountStatus = "Activated"
                Person.save()
            else:
                Person.AccountStatus = "Rejected"
                Person.save()
            return JsonResponse({"request":"Success"})
        else:
            context = {
                "Applicants":Member.objects.filter(Q(AccountStatus="Rejected")|Q(AccountStatus="Inactivated")),
            }
            return render(request, 'AdminConsole/Applications.html',context)
    else:
        return redirect('MainPage')
def ProfileChangeRequest(request):
    if request.user.is_staff:
        if request.method == "POST":
            username = request.POST.get("username")
            Person = Member.objects.get(user=User.objects.get(username=username))
            PersonRequest = ProfileRequest.objects.get(user=User.objects.get(username=username))
            if request.POST.get("intent") == "Activate":
                if Person.profileimage.name != "/Person.png":
                    print("Deleting")
                    os.remove(os.path.join(settings.MEDIA_ROOT,Person.profileimage.name.replace("/","")))
                    Person.profileimage = PersonRequest.profileimage
                    Person.text = PersonRequest.text
                    Person.save()
                    PersonRequest.delete()
                else:
                    Person.profileimage = PersonRequest.profileimage
                    Person.text = PersonRequest.text
                    Person.save()
                    PersonRequest.delete()
            else:
                PersonRequest.delete()
                print("Deny Button Clicked")
            return JsonResponse({"request":"Success"})
        else:
            context = {
                "ProfileRequests":ProfileRequest.objects.all(),
            }
            return render(request, 'AdminConsole/ProfileRequest.html',context)
    else:
        return redirect('MainPage')