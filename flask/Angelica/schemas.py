from marshmallow import Schema
from marshmallow.fields import Str, Int
from Angelica.messages import MSG_FIELD_REQUIRED

class AuthSchema(Schema):
    cpf = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    senha = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})

class GetUserSchema(Schema):
    cpf = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})

class UserSchema(Schema):
    cpf = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    nome = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    status = Int(required=True, error_messages={'required': MSG_FIELD_REQUIRED})

class RegisterUserSchema(Schema):
    cpf = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    nome = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    status = Int(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    senha = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})

class TaxiSchema(Schema):
    placa = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    renavam = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    chassi = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    marca = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    modelo = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    ano = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    status = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})

class TaxiInfoSchema(Schema):
    placa = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    marca = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    ano = Int(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    renavam = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    chassi = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})    
    modelo = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    status = Int(required=True, error_messages={'required': MSG_FIELD_REQUIRED})

class TaxiPlacaSchema(Schema):
    placa = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
