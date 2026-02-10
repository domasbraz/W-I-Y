from django.urls import path
from django.conf import settings
from . import views

urlpatterns = [
    path("", views.default, name="default"),
    path("index/", views.index, name="home"),
]

if settings.DEBUG:
    urlpatterns += [
        path("register/", views.register, name="register"),
        path("login/", views.sign_in, name="login"),
        path("logout", views.sign_out, name="logout"),
        path("elements/", views.elements, name="elements"),
    ]