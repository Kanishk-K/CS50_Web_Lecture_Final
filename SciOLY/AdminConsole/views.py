from django.shortcuts import render,redirect
from MainPage.models import Member, ProfileRequest, Team, Alert, Event, Award
from django.contrib.auth.models import User
from django.db.models import Q
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls import static
import os
from django.views.decorators.http import require_http_methods
from django.contrib import messages


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
                #If the admin activates a user, set the user's status as activated
                Person.AccountStatus = "Activated"
                Person.save()
            else:
                #If the user was not activated it must mean they were rejected so update accordingly.
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
                #If the profile change was accepted.
                if Person.profileimage.name != "/Person.png":
                    #If the person is not using the default image, delete it from the database.
                    print("Deleting")
                    os.remove(os.path.join(settings.MEDIA_ROOT,Person.profileimage.name.replace("/","")))
                    Person.profileimage = PersonRequest.profileimage
                    Person.text = PersonRequest.text
                    Person.save()
                    PersonRequest.delete()
                else:
                    #If the person is using the default then just change the location of the url.
                    Person.profileimage = PersonRequest.profileimage
                    Person.text = PersonRequest.text
                    Person.save()
                    PersonRequest.delete()
            else:
                #If the profile change was not accepted remove the request.
                PersonRequest.delete()
                print("Deny Button Clicked")
            return JsonResponse({"request":"Success"})
        else:
            #Get request, render all profile requests.
            context = {
                "ProfileRequests":ProfileRequest.objects.all(),
            }
            return render(request, 'AdminConsole/ProfileRequest.html',context)
    else:
        return redirect('MainPage')

def TeamDisplay(request):
    if request.user.is_staff:
        if request.method == "POST":
            #If the admin submits a request for a new team
            Teamname = request.POST.get("textfield")
            if Team.objects.filter(name=Teamname).count() == 0:
                #If the team doesn't already exist create it.
                NewTeam = Team(name=Teamname)
                NewTeam.save()
            else:
                #If the team does exist, render an error to the user.
                messages.warning(request,f"Sorry, a team by the name {Teamname} already exists")
            context = {
                "Teams":Team.objects.all(),
                "Members": Member.objects.filter(AccountStatus="Activated"),
            }
            return render(request, 'AdminConsole/TeamManage.html',context)
        else:
            #Request is a get, display webpage.
            context = {
                "Teams":Team.objects.all(),
                "Members": Member.objects.filter(AccountStatus="Activated"),
            }
            return render(request, 'AdminConsole/TeamManage.html',context)
    else:
        return redirect('MainPage')

@require_http_methods(["POST"])
def TeamAdd(request):
    intent = request.POST.get("intent")
    TeamObject = Team.objects.get(name=request.POST.get("Teamname"))
    if intent == "Remove":
        #Remove a member from the team.
        MemberObject = Member.objects.get(user=User.objects.get(username=request.POST.get("Username")))
        TeamObject.members.remove(MemberObject)
    elif intent == "Add":
        #Add a member to the team.
        MemberObject = Member.objects.get(user=User.objects.get(username=request.POST.get("Username")))
        TeamObject.members.add(MemberObject)
    else:
        #Delete the team.
        TeamObject.delete()
    return JsonResponse({"request":"Success"})

def Graduate(request):
    if request.user.is_staff:
        if request.method == "POST":
            #If the admin graduated a student then set the member as graduated.
            Person = Member.objects.get(user=User.objects.get(username=request.POST.get("username")))
            Person.AccountStatus = "Alumni"
            Person.save()
            return JsonResponse({"request":"Success"})
        else:
            context = {
                "Members":Member.objects.filter(AccountStatus="Activated")
            }
            return render(request,'AdminConsole/Graduate.html',context)
    else:
        return redirect('MainPage')

def AlertAdd(request):
    if request.user.is_staff:
        if request.method == "POST":
            if Alert.objects.all().count() == 0:
                #If no alert exists in the database then create one.
                newAlert = Alert()
            else:
                #Otherwise take the first alert in the database.
                newAlert = Alert.objects.all().first()
            if request.POST.get("checkbox",False)=="on":
                #If the alert was activated.
                newAlert.active = True
            else:
                newAlert.active = False
            if len(request.POST.get("textfield")) == 0:
                #If the textfield was empty then set the alert accordingly.
                newAlert.text = ""
            else:
                newAlert.text = request.POST.get("textfield")
            newAlert.save()
            messages.success(request,f"Alert was successfully updated.")

            context = {
                "Alert":newAlert
            }
            return render(request,'AdminConsole/Alert.html',context)
        else:
            if Alert.objects.all().count() == 0:
                newAlert = Alert()
            else:
                newAlert = Alert.objects.all().first()
            context = {
                "Alert":newAlert
            }
            return render(request,'AdminConsole/Alert.html',context)
    else:
        return redirect('MainPage')

def StudentManager(request):
    if request.user.is_staff:
        if request.method == "POST":
            if request.POST.get("Intent") == "NewEvent":
                #If the admin created a new event.
                newEvent = Event(name=request.POST.get("EventName"))
                newEvent.save()
                return JsonResponse({"request":"Success"})
            elif request.POST.get("Intent") == "NewAward":
                #If the admin created a new award.
                newAward = Award(name=request.POST.get("AwardName"))
                newAward.save()
                return JsonResponse({"request":"Success"})
            elif request.POST.get("Intent") == "DeleteEvent":
                #If the admin removed an event from a user.
                Person = Member.objects.get(user=User.objects.get(username=request.POST.get("Username")))
                Person.events.remove(Event.objects.get(name=request.POST.get("EventName")))
                return JsonResponse({"request":"Success"})
            elif request.POST.get("Intent") == "DeleteAward":
                #If the admin removed an award from a user.
                Person = Member.objects.get(user=User.objects.get(username=request.POST.get("Username")))
                Person.awards.remove(Award.objects.get(name=request.POST.get("AwardName")))
                return JsonResponse({"request":"Success"})
            elif request.POST.get("Intent") == "AddEvent":
                #If the admin added an event to the user.
                Person = Member.objects.get(user=User.objects.get(username=request.POST.get("Username")))
                Person.events.add(Event.objects.get(name=request.POST.get("EventName")))
                return JsonResponse({"request":"Success"})
            elif request.POST.get("Intent") == "AddAward":
                #If the admin added an award to the user.
                Person = Member.objects.get(user=User.objects.get(username=request.POST.get("Username")))
                Person.awards.add(Award.objects.get(name=request.POST.get("AwardName")))
                return JsonResponse({"request":"Success"})
        else:
            context = {
                "Members":Member.objects.filter(AccountStatus="Activated"),
                "Events":Event.objects.all(),
                "Awards":Award.objects.all(),
            }
            return render(request,'AdminConsole/StudentManager.html',context)
    else:
        return redirect('MainPage')