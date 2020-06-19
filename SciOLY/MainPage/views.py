from django.shortcuts import render
from django.shortcuts import HttpResponse
from .models import *
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.
def index(request):
    context = {
        "Teams":Team.objects.all(),
        "Logged":request.user.is_authenticated,
        "Admin":request.user.is_staff,
        "Capitans":Member.objects.filter(Is_Capitan=True),
        "Alert":Alert.objects.all().first()
    }
    if request.user.is_authenticated:
        return render(request, "MainPage/index.html",context)
    else:
        return render(request, "MainPage/index.html",context)

@require_http_methods(["POST"])
def UserInfo(request):
    #If the user selected a team, render all members in that team.
    if request.POST.get("Type") == "Team":
        T = Team.objects.filter(name=request.POST.get("Team")).first()
        AllUsernames = []
        for Person in T.members.all():
            AllUsernames.append(Person.user.username)
        return JsonResponse(AllUsernames,safe=False)
    else:
        #The user selected a member, render information about the member.
        AllMembers = Member.objects.all()
        for Person in AllMembers:
            if Person.user.username == request.POST.get("Member"):
                Events = ""
                Awards = ""
                for Event in Person.events.all():
                    Events = Events + f"{Event},"
                for Award in Person.awards.all():
                    Awards = Awards + f"{Award},"
                return JsonResponse({"MemberImg":Person.profileimage.url,"MemberDesc":Person.text,"Events":Events,"Awards":Awards})