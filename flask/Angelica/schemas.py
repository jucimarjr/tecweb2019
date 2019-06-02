from marshmallow import Schema
from marshmallow.fields import Str, Int, Date
from Angelica.messages import MSG_FIELD_REQUIRED


class AuthSchema(Schema):
    cpf = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    senha = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})


class GetUserSchema(Schema):
    cpf = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})


class UserSchema(Schema):
    cpf = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    nome = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    status = Int(required=True, error_messages={
                 'required': MSG_FIELD_REQUIRED})


class RegisterUserSchema(Schema):
    cpf = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    nome = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    status = Int(required=True, error_messages={
                 'required': MSG_FIELD_REQUIRED})
    senha = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})


class GetDriverSchema(Schema):
    cpf = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})


class DriverSchema(Schema):
    cpf = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    rg = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    nome = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    renach = Str(required=True, error_messages={
                 'required': MSG_FIELD_REQUIRED})
    telefone = Str(required=True, error_messages={
                   'required': MSG_FIELD_REQUIRED})
    cep = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    rua = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    bairro = Str(required=True, error_messages={
                 'required': MSG_FIELD_REQUIRED})
    status = Int(required=True, error_messages={
                 'required': MSG_FIELD_REQUIRED})


class UpdateDriverSchema(Schema):
    cpf = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    nome = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    telefone = Str(required=True, error_messages={
                   'required': MSG_FIELD_REQUIRED})
    cep = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    rua = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    bairro = Str(required=True, error_messages={
                 'required': MSG_FIELD_REQUIRED})
    status = Int(required=True, error_messages={
                 'required': MSG_FIELD_REQUIRED})


class TaxiSchema(Schema):
    placa = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    renavam = Str(required=True, error_messages={
                  'required': MSG_FIELD_REQUIRED})
    chassi = Str(required=True, error_messages={
                 'required': MSG_FIELD_REQUIRED})
    marca = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    modelo = Str(required=True, error_messages={
                 'required': MSG_FIELD_REQUIRED})
    ano = Int(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    status = Int(required=True, error_messages={
                 'required': MSG_FIELD_REQUIRED})


class TaxiBoardSchema(Schema):
    placa = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})


class PermFindSchema(Schema):
    taxi = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})


class PermSchema(Schema):
    taxi = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    motorista = Str(required=True, error_messages={
                    'required': MSG_FIELD_REQUIRED})
    usuario = Str(required=True, error_messages={
                  'required': MSG_FIELD_REQUIRED})
    data_inicio = Date(required=True, error_messages={
                       'required': MSG_FIELD_REQUIRED})
    data_fim = Date(required=True, error_messages={
                    'required': MSG_FIELD_REQUIRED})
    tipo = Str(required=True, error_messages={'required': MSG_FIELD_REQUIRED})
    status = Int(required=True, error_messages={
                 'required': MSG_FIELD_REQUIRED})


class PermInfoSchema(Schema):
    reg_permissao_taxi_placa = Str(required=True, error_messages={
                                   'required': MSG_FIELD_REQUIRED})
    reg_permissao_mot_cpf = Str(required=True, error_messages={
        'required': MSG_FIELD_REQUIRED})
    reg_permissao_usu_cpf = Str(required=True, error_messages={
        'required': MSG_FIELD_REQUIRED})
    reg_permissao_perm_data_inicio = Date(required=True, error_messages={
        'required': MSG_FIELD_REQUIRED})
    reg_permissao_perm_data_fim = Date(required=True, error_messages={
        'required': MSG_FIELD_REQUIRED})
    reg_permissao_perm_tipo_motorista = Str(required=True, error_messages={
                                            'required': MSG_FIELD_REQUIRED})
    reg_permissao_perm_status = Int(required=True, error_messages={
        'required': MSG_FIELD_REQUIRED})
    reg_taxi_taxi_placa = Str(required=True, error_messages={
                              'required': MSG_FIELD_REQUIRED})
    reg_taxi_taxi_renavam = Str(required=True, error_messages={
        'required': MSG_FIELD_REQUIRED})
    reg_taxi_taxi_chassi = Str(required=True, error_messages={
        'required': MSG_FIELD_REQUIRED})
    reg_taxi_taxi_marca = Str(required=True, error_messages={
                              'required': MSG_FIELD_REQUIRED})
    reg_taxi_taxi_modelo = Str(required=True, error_messages={
        'required': MSG_FIELD_REQUIRED})
    reg_taxi_taxi_ano = Int(required=True, error_messages={
                            'required': MSG_FIELD_REQUIRED})
    reg_taxi_taxi_status = Int(required=True, error_messages={
        'required': MSG_FIELD_REQUIRED})
    reg_motorista_mot_cpf = Str(required=True, error_messages={
        'required': MSG_FIELD_REQUIRED})
    reg_motorista_mot_rg = Str(required=True, error_messages={
        'required': MSG_FIELD_REQUIRED})
    reg_motorista_mot_nome = Str(required=True, error_messages={
        'required': MSG_FIELD_REQUIRED})
    reg_motorista_mot_renach = Str(required=True, error_messages={
        'required': MSG_FIELD_REQUIRED})
    reg_motorista_mot_telefone = Str(required=True, error_messages={
        'required': MSG_FIELD_REQUIRED})
    reg_motorista_mot_cep = Str(required=True, error_messages={
        'required': MSG_FIELD_REQUIRED})
    reg_motorista_mot_rua = Str(required=True, error_messages={
        'required': MSG_FIELD_REQUIRED})
    reg_motorista_mot_bairro = Str(required=True, error_messages={
        'required': MSG_FIELD_REQUIRED})
    reg_motorista_mot_status = Int(required=True, error_messages={
        'required': MSG_FIELD_REQUIRED})
