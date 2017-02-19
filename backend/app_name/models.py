from __future__ import unicode_literals

from django.db import models

class ModelName(models.Model):
    """
    Your model description
    """
    field_name = models.CharField(max_length=100)
