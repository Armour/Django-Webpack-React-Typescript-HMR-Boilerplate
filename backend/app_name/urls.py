from django.conf.urls import url
from django.http import HttpResponse

urlpatterns = [
    # API url goes here
    url(r'', lambda request: HttpResponse('Hello World!'), name='hello_world'),
]
