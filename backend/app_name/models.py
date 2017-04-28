from __future__ import unicode_literals

from django.db import models


class ModelNameManager(models.Manager):
    """
    Your model manager description
    """
    def get_first_field_name(self):
        """
        Return first field name if exist
        """
        field_name_list = self.all()
        try:
            field_name = field_name_list[0].field_name
        except ValueError:
            field_name = "data not found, check your database"
        return field_name

class ModelName(models.Model):
    """
    Your model description
    """
    field_name = models.CharField(max_length=100)

    objects = ModelNameManager()

    def __unicode__(self):
        return u"%s" % self.field_name
