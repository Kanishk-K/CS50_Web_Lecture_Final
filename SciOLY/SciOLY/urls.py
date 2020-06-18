"""SciOLY URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from MainPage import views as MainPage
from users import views as users_view
from AdminConsole import views as Admin_views
from django.urls import path
from django.conf.urls import url
from django.contrib.auth import views as auth_views

from django.conf import settings
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', MainPage.index, name="MainPage"),
    path('apply', users_view.register, name="apply"),
    path('login', users_view.login, name="login"),
    path('logout',users_view.logout, name="logout"),
    path('profile',users_view.profile,name="profile"),
    path('UserInfo',MainPage.UserInfo),
    path('AdminPage/',Admin_views.index,name="AdminPage"),
    path('AdminPage/Applications',Admin_views.Applications,name="Applications"),
    path('AdminPage/ProfileRequests',Admin_views.ProfileChangeRequest,name="ProfileRequests"),
    path('AdminPage/Teams',Admin_views.TeamDisplay,name="TeamManage"),
    path('AdminPage/Teams/Submit',Admin_views.TeamAdd,name="ManageTeam"),
    path('AdminPage/Graduate',Admin_views.Graduate,name="Graduate"),
    path('AdminPage/Alert',Admin_views.AlertAdd,name="Alert"),
]

if settings.DEBUG:
    urlpatterns += [
        url(r'^media/(?P<path>.*)$', serve , {
            'document_root':settings.MEDIA_ROOT,
        }),
    ]
