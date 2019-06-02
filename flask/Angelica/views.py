from Angelica import app, bcrypt
from flask_jwt import jwt_required
from flask import request, jsonify

from Angelica.database import db_session

from Angelica.models import (
    Usuario,
    Motorista,
    Taxi,
    Permissao
)

from Angelica.schemas import (
    AuthSchema,
    GetUserSchema,
    UserSchema,
    RegisterUserSchema,
    GetDriverSchema,
    DriverSchema,
    UpdateDriverSchema,
    TaxiSchema,
    TaxiInfoSchema,
    TaxiBoardSchema
)

from Angelica.responses import (
    resp_already_exists,
    resp_refused_credentials,
    resp_exception,
    resp_data_invalid,
    resp_not_exist,
    resp_data_error,
    resp_ok
)

from Angelica.messages import (
    MSG_NO_DATA,
    MSG_INVALID_DATA,
    MSG_RESOURCE_FIND,
    MSG_USER_AUTH,
    MSG_RESOURCE_UPDATE,
    MSG_RESOURCE_DELETE
)
from Angelica.messages import (
    MSG_RESOURCE_CREATED,
    MSG_DOES_NOT_EXIST
)

from Angelica.methods import mensagem_feedback
from flask_jwt import jwt_required

from sqlalchemy.exc import (
    IntegrityError,
    DataError
)

from sqlalchemy.orm.exc import NoResultFound

import os


@app.route('/')
def index():

    app_name = os.getenv("APP_NAME")

    if app_name:
        return "Hello World running in a Docker container behind Nginx!"

    return 'Hello World!'


def identidade(payload):

    cpf = payload["usuario"]["cpf"] if "usuario" in payload else None
    return Usuario().read(cpf)


@app.route('/auth', methods=['POST'])
def auth():
    """
    Método de autenticação
    Recebe um objeto do tipo JSON com chaves cpf e senha
    Exemplo:
    --------
    {
      'cpf': '88844455522',
      'senha': 'acb1234'
    }
    """

    req_data = request.get_json()
    data, errors = None, None

    if req_data is None:
        return resp_data_invalid('auth', [], msg=MSG_NO_DATA)

    schema = AuthSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('auth', errors)
    else:
        try:
            usuario = Usuario().auth(cpf=data['cpf'], senha=data['senha'])

        except Exception as e:
            return resp_exception('auth', description=e)

    if usuario:
        return resp_ok('auth', MSG_USER_AUTH.format(data['cpf']),  data=usuario,)
    else:
        return resp_refused_credentials('auth', [])


@app.route('/admin/create', methods=['POST'])
# @jwt_required()
def create_admin():

    req_data = request.get_json()
    cpf = req_data['cpf']

    if(cpf):
        usuario = Usuario().read(cpf)
        if(not usuario):
            senha = req_data['senha']
            if(senha):
                senha_hash = bcrypt.generate_password_hash(
                    senha).decode("utf-8")
                nome = req_data['nome']
                if(nome):
                    usuario = {
                        "cpf": cpf,
                        "nome": nome,
                        "senha": senha_hash,
                        "status": 1,
                    }
                    usuario = Usuario(usuario)
                    return mensagem_feedback(True, "Usuário cadastrado com sucesso!")
                else:
                    return mensagem_feedback(False, "Nome não pode estar em branco!")
            else:
                return mensagem_feedback(False, "Senha não pode estar em branco!")
        else:
            return mensagem_feedback(False, "CPF já cadastrado na base de dados!")
    return mensagem_feedback(False, "Não foi possível cadastrar o Usuário!")


@app.route('/user', methods=['POST'])
# @jwt_required()
def get_user():
    """
    Método retorna um usuário existente
    Recebe um objeto do tipo JSON com chaves cpf
    Exemplo:
    --------
    {
      'cpf': '88844455522'
    }
    """

    req_data = request.get_json()
    data, errors, result = None, None, None

    if req_data is None:
        return resp_data_invalid('usuario', [], msg=MSG_NO_DATA)

    schema = GetUserSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('usuario', errors)

    try:
        model = Usuario().query.get(data)

    except Exception as e:
        return resp_exception('user', description=e)

    if not model:
        return resp_not_exist('user', data['cpf'])

    schema = UserSchema()
    result = schema.dump(model)

    return resp_ok('user', MSG_RESOURCE_FIND.format('Usuário'),  data=result.data,)


@app.route('/users', methods=['GET'])
# @jwt_required()
def get_users():

    try:
        model = Usuario().query.all()

    except Exception as e:
        return resp_exception('user', description=e)

    schema = UserSchema(many=True)
    result = schema.dump(model)

    return resp_ok('users', MSG_RESOURCE_FIND.format('Usuários'),  data=result.data,)


@app.route('/user/register', methods=['POST'])
# @jwt_required()
def register_user():
    """
    Método para registrar um usuário
    Recebe um objeto do tipo JSON com chaves cpf, nome, senha e status
    Exemplo:
    --------
    {
      'cpf': '88844455522',
      'nome': 'Richardson Souza'
      'senha': 'acb1234',
      'status': 1
    }
    """

    req_data = request.get_json()
    data, errors, result = None, None, None

    if req_data is None:
        return resp_data_invalid('user', [], msg=MSG_NO_DATA)

    schema = RegisterUserSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('user', errors)

    try:
        data['senha'] = bcrypt.generate_password_hash(
            req_data['senha']).decode("utf-8")
        model = Usuario(data)

    except IntegrityError:
        return resp_already_exists('user', data['cpf'])
    
    except DataError:
        return resp_data_error('user')

    except Exception as e:
        return resp_exception('user', description=e)

    schema = UserSchema()
    result = schema.dump(model)

    return resp_ok(
        'user', MSG_RESOURCE_CREATED.format('Usuário'),  data=result.data,
    )


@app.route('/user/update', methods=['POST'])
# @jwt_required()
def update_user():
    """
    Método para atualizar um usuário registrado
    Recebe um objeto do tipo JSON com chaves cpf, nome, senha e status
    Exemplo:
    --------
    {
      'cpf': '88844455522',
      'nome': 'Richardson Souza'
      'senha': 'acb1234',
      'status': 1
    }
    """

    req_data = request.get_json()
    data, errors, result = None, None, None

    if req_data is None:
        return resp_data_invalid('user', [], msg=MSG_NO_DATA)

    schema = RegisterUserSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('user', errors)

    try:
        model = Usuario().query.get(data['cpf'])

    except IntegrityError:
        return resp_already_exists('user', data['cpf'])

    except Exception as e:
        return resp_exception('user', description=e)

    if model:
        try:
            data['senha'] = bcrypt.generate_password_hash(
                req_data['senha']).decode("utf-8")
            model.nome = data['nome']
            model.senha = data['senha']
            model.status = data['status']
            db_session.commit()

        except Exception as e:
            return resp_exception('user', description=e)
    else:
        return resp_not_exist('user', data['cpf'])

    schema = UserSchema()
    result = schema.dump(model)

    return resp_ok(
        'user', MSG_RESOURCE_UPDATE.format('Usuário'),  data=result.data,
    )


@app.route('/user/delete', methods=['POST'])
# @jwt_required()
def delete_user():
    """
    Método para desativar o usuário no sistema
    Recebe um objeto do tipo JSON com a chave cpf
    Exemplo:
    --------
    {
      'cpf': '88844455522'
    }
    """

    req_data = request.get_json()
    data, errors, result = None, None, None

    if req_data is None:
        return resp_data_invalid('usuario', [], msg=MSG_NO_DATA)

    schema = GetUserSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('usuario', errors)

    try:
        model = Usuario().query.get(data)

    except Exception as e:
        return resp_exception('user', description=e)

    if model:
        model.status = 0
        db_session.commit()
    else:
        return resp_not_exist('user', data['cpf'])

    schema = UserSchema()
    result = schema.dump(model)

    return resp_ok('user', MSG_RESOURCE_DELETE.format('Usuário'),  data=result.data,)


@app.route('/driver', methods=['POST'])
# @jwt_required()
def get_driver():
    """
    Método retorna um motorista registrado no sistema
    Recebe um objeto do tipo JSON com chaves cpf
    Exemplo:
    --------
    {
      'cpf': '88844455522'
    }
    """

    req_data = request.get_json()
    data, errors, result = None, None, None

    if req_data is None:
        return resp_data_invalid('motorista', [], msg=MSG_NO_DATA)

    schema = GetDriverSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('motorista', errors)

    try:
        model = Motorista().query.get(data)

    except Exception as e:
        return resp_exception('driver', description=e)

    if not model:
        return resp_not_exist('driver', data['cpf'])

    schema = DriverSchema()
    result = schema.dump(model)

    return resp_ok('driver', MSG_RESOURCE_FIND.format('Motorista'),  data=result.data,)


@app.route('/drivers', methods=['GET'])
# @jwt_required()
def get_drivers():
    try:
        model = Motorista().query.all()

    except Exception as e:
        return resp_exception('drivers', description=e)

    schema = DriverSchema(many=True)
    result = schema.dump(model)

    return resp_ok('drivers', MSG_RESOURCE_FIND.format('Motoristas'),  data=result.data,)


@app.route('/driver/register', methods=['POST'])
# @jwt_required()
def register_driver():
    """
    Método para registrar um motorista no sistema
    Recebe um objeto do tipo JSON com chaves cpf, nome, 
    rg, renach, bairro, rua, cep, telefone e status.
    Exemplo:
    --------
    {
        "cpf": "27555738996",
        "nome": "Amir Berry",
        "rg": "17808343",
        "renach": "73403036740",
        "bairro": "Wisconsin",
        "rua": "Kennewick",
        "cep": "69025571",
        "telefone": "11993281"
        "status": 1,
    }
    """

    req_data = request.get_json()
    data, errors, result = None, None, None

    if req_data is None:
        return resp_data_invalid('driver', [], msg=MSG_NO_DATA)

    schema = DriverSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('driver', errors)

    try:
        model = Motorista(data)

    except IntegrityError:
        return resp_already_exists('driver', data['cpf'])
    
    except DataError:
        return resp_data_error('driver')

    except Exception as e:
        return resp_exception('driver', description=e)

    schema = DriverSchema()
    result = schema.dump(model)

    return resp_ok('driver', MSG_RESOURCE_CREATED.format('Motorista'),  data=result.data,)


@app.route('/driver/update', methods=['POST'])
# @jwt_required()
def update_driver():
    """
    Método para atualizar um motorista existente no sistema
    Recebe um objeto do tipo JSON com chaves cpf, nome, 
    bairro, rua, cep, telefone e status.
    Apenas as chaves
    Exemplo:
    --------
    {
        "cpf": "27555738996",
        "nome": "Amir Berry",
        "bairro": "Wisconsin",
        "rua": "Kennewick",
        "cep": "69025571",
        "telefone": "11993281"
        "status": 1,
    }
    """

    req_data = request.get_json()
    data, errors, result = None, None, None

    if req_data is None:
        return resp_data_invalid('driver', [], msg=MSG_NO_DATA)

    schema = UpdateDriverSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('driver', errors)

    try:
        model = Motorista().query.get(data['cpf'])

    except IntegrityError:
        return resp_already_exists('driver', data['cpf'])

    except Exception as e:
        return resp_exception('driver', description=e)

    if model:
        try:
            model.nome = data['nome']
            model.telefone = data['telefone']
            model.cep = data['cep']
            model.rua = data['rua']
            model.bairro = data['bairro']
            model.status = data['status']
            db_session.commit()
        
        except IntegrityError:
            return resp_already_exists('driver', data['cpf'])
    
        except DataError:
            return resp_data_error('driver')

        except Exception as e:
            return resp_exception('driver', description=e)
    else:
        return resp_not_exist('driver', data['cpf'])

    schema = DriverSchema()
    result = schema.dump(model)

    return resp_ok('driver', MSG_RESOURCE_UPDATE.format('Motorista'),  data=result.data,)


@app.route('/driver/delete', methods=['POST'])
# @jwt_required()
def delete_driver():
    """
    Método para desativar um motorista no sistema
    Recebe um objeto do tipo JSON com a chave cpf
    Exemplo:
    --------
    {
      'cpf': '88844455522'
    }
    """

    req_data = request.get_json()
    data, errors, result = None, None, None

    if req_data is None:
        return resp_data_invalid('driver', [], msg=MSG_NO_DATA)

    schema = GetDriverSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('motorista', errors)

    try:
        model = Motorista().query.get(data)

    except Exception as e:
        return resp_exception('driver', description=e)

    if model:
        model.status = 0
        db_session.commit()
    else:
        return resp_not_exist('driver', data['cpf'])

    schema = DriverSchema()
    result = schema.dump(model)

    return resp_ok('driver', MSG_RESOURCE_DELETE.format('Motorista'),  data=result.data,)


@app.route('/taxi', methods=['POST'])
# @jwt_required()
def get_taxi():
    """
    Método retorna um taxi registrado no sistema
    Recebe um objeto do tipo JSON com chave placa
    Exemplo:
    --------
    {
      'placa': 'IKH2241'
    }
    """

    req_data = request.get_json()
    data, errors, result = None, None, None

    if req_data is None:
        return resp_data_invalid('taxi', [], msg=MSG_NO_DATA)

    schema = TaxiBoardSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('taxi', errors)

    try:
        model = Taxi().query.get(data)

    except Exception as e:
        return resp_exception('taxi', description=e)

    if not model:
        return resp_not_exist('taxi', data['placa'])

    schema = TaxiSchema()
    result = schema.dump(model)

    return resp_ok('taxi', MSG_RESOURCE_FIND.format('Taxi'),  data=result.data,)

    '''
    req_data = request.get_json()
    data, errors, result = None, None, None

    if req_data is None:
        return resp_data_invalid('Taxi', [], msg=MSG_NO_DATA)

    schema = TaxiPlacaSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('Taxi', errors)

    try:
        model = Taxi().query.get(data)

    except Exception as e:
        return resp_exception('Taxi', description=e)

    if not model:
        return resp_not_exist('Taxi', data['placa'])

    schema = TaxiInfoSchema()
    result = schema.dump(model)

    return resp_ok('Taxi', MSG_RESOURCE_FIND.format('Taxi'),  data=result.data,)
    '''


@app.route('/taxis', methods=['GET'])
# @jwt_required()
def get_taxis():

    try:
        model = Taxi().query.all()

    except Exception as e:
        return resp_exception('taxi', description=e)

    schema = TaxiSchema(many=True)
    result = schema.dump(model)

    return resp_ok('taxi', MSG_RESOURCE_FIND.format('Taxis'),  data=result.data,)


    '''

    try:
        model = Taxi().query.all()

    except Exception as e:
        return resp_exception('Taxi', description=e)

    schema = TaxiInfoSchema(many=True)
    result = schema.dump(model)

    return resp_ok('Taxi', MSG_RESOURCE_FIND.format('Taxi'),  data=result.data,)
    '''


@app.route('/taxi/register', methods=['POST'])
# @jwt_required()
def register_taxi():
    """
    Método para registrar um taxi no sistema
    Recebe um objeto do tipo JSON com chaves placa,
    renavam, chassi, marca, modelo, ano e status.
    Exemplo:
    --------
    {
        "placa": "27555738996",
        "renavam": "Amir Berry",
        "chassi": "17808343",
        "marca": "Wisconsin",
        "modelo": "Kennewick",
        "ano": "69025571",
        "status": 1,
    }
    """

    req_data = request.get_json()
    data, errors, result = None, None, None

    if req_data is None:
        return resp_data_invalid('taxi', [], msg=MSG_NO_DATA)

    schema = TaxiSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('taxi', errors)

    try:
        model = Taxi(data)

    except IntegrityError:
        return resp_already_exists('taxi', data['placa'])
    
    except DataError:
        return resp_data_error('taxi')

    except Exception as e:
        return resp_exception('taxi', description=e)

    schema = TaxiSchema()
    result = schema.dump(model)

    return resp_ok('taxi', MSG_RESOURCE_CREATED.format('Taxi'),  data=result.data,)


@app.route('/taxi/update', methods=['POST'])
# @jwt_required()
def update_taxi():

    req_data = request.get_json()
    data, errors, result = None, None, None

    if req_data is None:
        return resp_data_invalid('Taxi', [], msg=MSG_NO_DATA)

    schema = TaxiInfoSchema()
    data, errors = schema.load(req_data)

    print(data)

    if errors:
        return resp_data_invalid('Taxi', errors)

    try:
        taxi = Taxi().query.get(data['placa'])
        #data, errors = schema.load(data, instance=Taxi().query.get(data['placa']), partial=True)
        #model = Taxi().update().where(placa==data['placa']).values(data)

    except Taxi.DoesNotExist:
        return resp_not_exist('Taxi', data['placa'])

    except Exception as e:
        return resp_exception('Taxi', description=e)

    print(taxi)

    update_query = taxi.update(data)
    update_query.execute()
    result = schema.dump(taxi)

    # Retorno 200
    return resp_ok(
        'Taxi', MSG_RESOURCE_CREATED.format('Taxi'),  data=data,
    )


@app.route('/taxi/delete', methods=['POST'])
@jwt_required()
def delete_taxi():

    placa = request.form["placa"] if "placa" in request.form else None

    if(placa):

        motorista = Taxi().delete(placa)

        return mensagem_feedback(True, "Taxi desativado com sucesso!")

    return mensagem_feedback(False, "É necessário informar uma placa")


'''
    CRUD - Permissão
'''


@app.route('/permissao/get', methods=['POST'])
@jwt_required()
def get_permissao():

    motorista = request.form["motorista"] if "motorista" in request.form else None
    usuario = request.form["usuario"] if "usuario" in request.form else None
    taxi = request.form["taxi"] if "taxi" in request.form else None

    if(taxi and usuario and motorista):
        permissao = Permissao().read(taxi, motorista, usuario)

        if(permissao != {}):
            return jsonify(permissao)

        return mensagem_feedback(False, "Permissão não encontrada na base de dados")

    return mensagem_feedback(False, "Faltam informações necessárias")


@app.route('/permissoes/get', methods=['GET'])
@jwt_required()
def get_permissoes():
    permissoes = Permissao().list()

    return jsonify(permissoes)


@app.route('/permissao/create', methods=['POST'])
@jwt_required()
def create_permissao():

    motorista = request.form["motorista"] if "motorista" in request.form else None
    usuario = request.form["usuario"] if "usuario" in request.form else None
    taxi = request.form["taxi"] if "taxi" in request.form else None

    # Substituir True por função de verificar se já foi cadastrado.
    if(taxi and usuario and motorista and True):

        permissao = {
            "taxi": taxi,
            "motorista": motorista,
            "usuario": usuario,
            "inicio": request.form["nome"] if "nome" in request.form else "Não informado",
            "fim": request.form["nome"] if "nome" in request.form else "Não informado",
            "tipo": request.form["nome"] if "nome" in request.form else "Não informado",
            "status": request.form["status"] if "status" in request.form else 1,
        }

        permissao = Permissao(permissao)

        return mensagem_feedback(True, "Permissão cadastrada com sucesso!")

    elif(taxi and usuario and motorista and True):
        return mensagem_feedback(False, "Dados já cadastrados na base de dados!")

    return mensagem_feedback(False, "Não foi possível cadastrar a Permissão!")


@app.route('/permissao/update', methods=['POST'])
@jwt_required()
def update_permissao():

    motorista = request.form["motorista"] if "motorista" in request.form else None
    usuario = request.form["usuario"] if "usuario" in request.form else None
    taxi = request.form["taxi"] if "taxi" in request.form else None

    if(taxi and usuario and motorista):

        permissao = {
            "taxi": taxi,
            "motorista": motorista,
            "usuario": usuario,
            "data_inicio": request.form["data_inicio"] if "data_inicio" in request.form else "Não informado",
            "data_fim": request.form["data_fim"] if "data_fim" in request.form else "Não informado",
            "tipo": request.form["tipo"] if "tipo" in request.form else "Não informado",
            "status": request.form["status"] if "status" in request.form else 1,
        }

        permissao = Permissao().update(permissao)

        return mensagem_feedback(True, "Permissão atualizada com sucesso!")

    return mensagem_feedback(False, "Dados insuficientes para atualização")


@app.route('/permissao/delete', methods=['POST'])
@jwt_required()
def delete_permissao():

    motorista = request.form["motorista"] if "motorista" in request.form else None
    usuario = request.form["usuario"] if "usuario" in request.form else None
    taxi = request.form["taxi"] if "taxi" in request.form else None

    if(taxi and usuario and motorista):

        permissao = Permissao().delete(taxi, motorista, usuario)

        return mensagem_feedback(True, "Permissão desativado com sucesso!")

    return mensagem_feedback(False, "Dados insuficientes para exclusão")


@app.route('/info/taxi', methods=['POST'])
def info_taxi():
    pass
