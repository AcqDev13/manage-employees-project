from django.db import models


class Crudemployee(models.Model):
    role = (
        ('F', 'Frontenddev'),
        ('B', 'Backenddev'),
    )
    role = models.CharField(max_length=30, blank=True, default='', choices=role)
    name = models.CharField(max_length=30, blank=True)
    age = models.IntegerField(blank=True, null=True)
    companyname = models.CharField(max_length=30, blank=True)
    birthdate = models.DateField(null=True,blank=True)

