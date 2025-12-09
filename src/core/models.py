from django.db import models
'''
class New_table(models.Model):
    name = models.CharField(max_length=128)
    nationality = models.CharField(max_length=128)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Employee(models.Model):
    name = models.CharField(max_length=128)
    nationality = models.CharField(max_length=128)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
'''
class Users(models.Model):
    username = models.TextField(max_length=30, null=False)
    password = models.TextField(max_length=40, null=False)
    created = models.DateTimeField(auto_now_add=True)
