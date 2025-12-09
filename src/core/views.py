from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages

def index(request):
    if request.user.is_authenticated:
        return render(request, "index.html")
    return redirect("login")

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password1 = request.POST["password1"]
        password2 = request.POST["password2"]

        if password1 != password2:
            messages.error(request, "Passwords do not match")
            return render(request, "register.html")
        
        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already in use")
            return render(request, "register.html")
        
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already in use")
            return render(request, "register.html")
        
        User.objects.create_user(username=username, email=email, password=password1)

        return redirect("home")
    
    return render(request, "register.html")

def sign_in(request):
    if request.method == "POST":
        user = authenticate(
            request,
            username=request.POST["username"],
            password=request.POST["password"]
        )

        if user:
            login(request, user)
            return redirect("home")
        return render(request, "login.html", {"error": "Invalid Credentials!"})
    return render(request, "login.html")

def sign_out(request):
    logout(request)
    return redirect("login")

def default(request):
    return redirect("home")

def elements(request):
    return render(request, "elements.html")

