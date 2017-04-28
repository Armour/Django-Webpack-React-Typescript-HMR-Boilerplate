from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'', views.api_request, name='api_request'),
]
