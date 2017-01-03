from django.shortcuts import render
from django.views.generic import TemplateView
from project_name.settings import FRONTEND_ROOT


# Create your views here.
class HomePageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, FRONTEND_ROOT + 'template/index.html', context=None)
