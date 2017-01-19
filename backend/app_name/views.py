from django.shortcuts import render
from django.views.generic import TemplateView


class HomePageView(TemplateView):
    def get(self, request, **kwargs):
        context = {'title': 'IndexPage'}
        return render(request, 'indexPage.html', context=context)


class OtherPageView(TemplateView):
    def get(self, request, **kwargs):
        context = {'title': 'OtherPage'}
        return render(request, 'otherPage.html', context=context)
