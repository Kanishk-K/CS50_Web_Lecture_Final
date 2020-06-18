from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Event)
admin.site.register(Award)
admin.site.register(Member)
admin.site.register(Team)
admin.site.register(ProfileRequest)
admin.site.register(Alert)