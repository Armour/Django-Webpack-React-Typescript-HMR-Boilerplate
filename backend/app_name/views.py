from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token

from .models import ModelName


@ensure_csrf_cookie
def api_request(request):
    """
    GET request
    Args:
        request: request
    Returns:
        response
    """
    field_name = ModelName.objects.get_first_field_name()
    request_type = request.META["REQUEST_METHOD"]
    request.META["CSRF_COOKIE_USED"] = True
    csrf_token = get_token(request)
    print(csrf_token)
    context = {
        'data': field_name,
        'requestType': request_type,
    }
    return JsonResponse(context)
