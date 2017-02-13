"""
    Customized template view
"""
from django.views.generic import TemplateView


class ExtraContextTemplateView(TemplateView):
    """
    A template view that used to render a page with extra context
    """
    extra_context = None

    def get_context_data(self, **kwargs):
        context = super(ExtraContextTemplateView, self).get_context_data(**kwargs)
        if self.extra_context:
            context.update(self.extra_context)
        return context
