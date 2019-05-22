from marshmallow import Schema
from marshmallow.fields import Str
from Angelica.messages import MSG_FIELD_REQUIRED

class TaxiSchema(Schema):
    placa = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    renavam = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    chassi = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    marca = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    modelo = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    ano = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    status = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})

