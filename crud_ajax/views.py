from django.views.generic import ListView
from .models import Crudemployee
from django.views.generic import View
from django.http import JsonResponse


class CrudView(ListView):
    model = Crudemployee
    template_name = 'crud_ajax/crud.html'
    context_object_name = 'employees'


class CreateCrudemployee(View):
    def get(self, request):
        role1 = request.GET.get('role', None)
        name1 = request.GET.get('name', None)
        age1 = request.GET.get('age', None)
        companyname1 = request.GET.get('companyname', None)
        birthdate1 = request.GET.get('birthdate', None)
        obj = Crudemployee.objects.create(
            role=role1,
            name=name1,
            age=age1,
            companyname=companyname1,
            birthdate=birthdate1,
        )

        employee = {'id': obj.id, 'role': obj.role, 'name': obj.name, 'age': obj.age, 'companyname': obj.companyname,
                    'birthdate': obj.birthdate}

        data = {
            'employee': employee
        }
        return JsonResponse(data)


class UpdateCrudemployee(View):
    def get(self, request):
        id1 = request.GET.get('id', None)
        role1 = request.GET.get('role', None)
        name1 = request.GET.get('name', None)
        age1 = request.GET.get('age', None)
        companyname1 = request.GET.get('companyname', None)
        birthdate1 = request.GET.get('birthdate', None)

        obj = Crudemployee.objects.get(id=id1)
        obj.role = role1
        obj.name = name1
        obj.age = age1
        obj.companyname = companyname1
        obj.birthdate = birthdate1
        obj.save()

        employee = {'id': obj.id, 'role': obj.role, 'name': obj.name, 'age': obj.age,'companyname': obj.companyname,
                    'birthdate': obj.birthdate}

        data = {
            'employee': employee
        }

        return JsonResponse(data)


class DeleteCrudemployee(View):
    def get(self, request):

        id1 = request.GET.get('id', None)
        Crudemployee.objects.get(id=id1).delete()
        data = {
            'deleted': True
        }

        return JsonResponse(data)
