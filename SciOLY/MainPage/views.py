from django.shortcuts import render
from django.shortcuts import HttpResponse
from .models import *
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.
def index(request):
    context = {
        "Teams":Team.objects.all(),
        "Logged":False,
        "Capitans":Member.objects.filter(Is_Capitan=True)
    }
    if request.user.is_authenticated:
        print(f"User {request.user.username} has logged in")
        context["Logged"] = True
        return render(request, "MainPage/index.html",context)
    else:
        print("No login detected")
        return render(request, "MainPage/index.html",context)

@require_http_methods(["POST"])
def UserInfo(request):
    if request.POST.get("Type") == "Team":
        print("Team Sent")
        T = Team.objects.filter(name=request.POST.get("Team")).first()
        AllUsernames = []
        for Person in T.members.all():
            AllUsernames.append(Person.user.username)
        return JsonResponse(AllUsernames,safe=False)
    else:
        print("User Sent")
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