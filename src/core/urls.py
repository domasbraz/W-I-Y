from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register, name="register"),
    path("index/", views.index, name="home"),
    path("login/", views.sign_in, name="login"),
    path("logout", views.sign_out, name="logout"),
    path("", views.default, name="default"),
    path("elements/", views.elements, name="elements"),
]