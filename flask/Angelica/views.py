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
    TaxiBoardSchema,
    PermFindSchema,
    PermSchema,
    PermInfoSchema
)

from Angelica.responses import (
    resp_already_exists,
    resp_refused_credentials,
    resp_exception,
    resp_data_invalid,
    resp_not_exist,
    resp_data_error,
    resp_invalid_request_error,
    resp_ok
)

from Angelica.messages import (
    MSG_NO_DATA,
    MSG_INVALID_DATA,
    MSG_RESOURCE_FIND,
    MSG_USER_AUTH,
    MSG_RESOURCE_UPDATE,
    MSG_RESOURCE_DELETE,
    MSG_RESOURCE_CREATED,
    MSG_DOES_NOT_EXIST
)

from Angelica.methods import mensagem_feedback
from flask_jwt import jwt_required

from sqlalchemy.exc import (
    IntegrityError,
    DataError,
    InvalidRequestError
)

from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.orm import aliased

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

    except InvalidRequestError:
        return resp_invalid_request_error('driver')

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
        "placa": "IKH2000",
        "renavam": "32819427000",
        "chassi": "4LXSNPW2014JY4000",
        "marca": "Volks",
        "modelo": "Gol",
        "ano": 2015,
        "status": 1
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
    """
    Método para atualizar um taxi existente no sistema
    Recebe um objeto do tipo JSON com chaves placa,
    renavam, chassi, marca, modelo, ano e status.
    Exemplo:
    --------
    {
        "placa": "IKH2000",
        "renavam": "32819427000",
        "chassi": "4LXSNPW2014JY4000",
        "marca": "Volks",
        "modelo": "Gol",
        "ano": 2015,
        "status": 1
    }
    """

    req_data = request.get_json()
    data, errors, result = None, None, None

    if req_data is None:
        return resp_data_invalid('taxi', [], msg=MSG_NO_DATA)

    schema = TaxiSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('driver', errors)

    try:
        model = Taxi().query.get(data['placa'])

    except IntegrityError:
        return resp_already_exists('driver', data['placa'])

    except Exception as e:
        return resp_exception('taxi', description=e)

    if model:
        try:
            model.placa = data['placa']
            model.renavam = data['renavam']
            model.chassi = data['chassi']
            model.marca = data['marca']
            model.modelo = data['modelo']
            model.ano = data['ano']
            model.status = data['status']
            db_session.commit()

        except IntegrityError:
            return resp_already_exists('taxi', data['placa'])

        except DataError:
            return resp_data_error('taxi')

        except Exception as e:
            return resp_exception('taxi', description=e)
    else:
        return resp_not_exist('taxi', data['placa'])

    schema = TaxiSchema()
    result = schema.dump(model)

    return resp_ok('taxi', MSG_RESOURCE_UPDATE.format('Taxi'),  data=result.data,)


@app.route('/taxi/delete', methods=['POST'])
# @jwt_required()
def delete_taxi():
    """
    Método para desativar um taxi no sistema
    Recebe um objeto do tipo JSON com a chave placa
    Exemplo:
    --------
    {
      "placa": "IKH2000"
    }
    """

    req_data = request.get_json()
    data, errors, result = None, None, None

    if req_data is None:
        return resp_data_invalid('driver', [], msg=MSG_NO_DATA)

    schema = TaxiBoardSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('taxi', errors)

    try:
        model = Taxi().query.get(data)

    except Exception as e:
        return resp_exception('driver', description=e)

    if model:
        model.status = 0
        db_session.commit()
    else:
        return resp_not_exist('taxi', data['placa'])

    schema = TaxiSchema()
    result = schema.dump(model)

    return resp_ok('taxi', MSG_RESOURCE_DELETE.format('Taxi'),  data=result.data,)


@app.route('/perm', methods=['POST'])
# @jwt_required()
def get_permit():
    """
    Método retorna um taxi registrado no sistema
    Recebe um objeto do tipo JSON com chave taxi,
    motorista, usuario
    Exemplo:
    --------
    {
        'taxi': 'IKH2241',
        'motorista': '09889009890',
        'usuario': '12332112321'
    }
    """

    req_data = request.get_json()
    data, errors, result = None, None, None

    if req_data is None:
        return resp_data_invalid('permit', [], msg=MSG_NO_DATA)

    schema = PermFindSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('permit', errors)

    try:
        model = Permissao().query.get(data)

    except InvalidRequestError:
        return resp_invalid_request_error('permit')

    except Exception as e:
        return resp_exception('permit', description=e)

    if not model:
        return resp_not_exist('permit', data)

    schema = PermSchema()
    result = schema.dump(model)

    return resp_ok('permit', MSG_RESOURCE_FIND.format('Permit'),  data=result.data,)


@app.route('/permissions', methods=['GET'])
# @jwt_required()
def get_permissions():

    try:
        model = Permissao().query.all()

    except Exception as e:
        return resp_exception('permissions', description=e)

    schema = PermSchema(many=True)
    result = schema.dump(model)

    return resp_ok('permissions', MSG_RESOURCE_FIND.format('Permissões'),  data=result.data,)


@app.route('/perm/register', methods=['POST'])
# @jwt_required()
def register_perm():
    """
    Método para registrar uma permissão no sistema
    Recebe um objeto do tipo JSON com chaves taxi,
    motorista, usuario, data_inicio, data_fim, tipo, status
    Exemplo:
    --------
    {
        "taxi": "IKH2241",
        "motorista": "67786605673",
        "usuario": "30759131091",
        "data_inicio": "2018-11-14",
        "data_fim": "2019-03-06",
        "tipo": "motorista",
        "status": 1
    }
    """

    req_data = request.get_json()
    data, errors, result = None, None, None

    if req_data is None:
        return resp_data_invalid('perm', [], msg=MSG_NO_DATA)

    schema = PermSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('perm', errors)

    try:
        model = Permissao(data)

    except IntegrityError:
        return resp_already_exists('perm', data)

    except DataError:
        return resp_data_error('perm')

    except Exception as e:
        return resp_exception('perm', description=e)

    schema = PermSchema()
    result = schema.dump(model)

    return resp_ok('per', MSG_RESOURCE_CREATED.format('Permissão'),  data=result.data,)


@app.route('/perm/update', methods=['POST'])
# @jwt_required()
def update_perm():
    """
    Método para atualizar uma permissão existente no sistema
    Recebe um objeto do tipo JSON com chaves taxi,
    motorista, usuario, data_inicio, data_fim, tipo, status
    Exemplo:
    --------
    {
        "taxi": "IKH2241",
        "motorista": "67786605673",
        "usuario": "30759131091",
        "data_inicio": "2018-11-14",
        "data_fim": "2019-03-06",
        "tipo": "motorista",
        "status": 1
    }
    """

    req_data = request.get_json()
    data, errors, result = None, None, None

    if req_data is None:
        return resp_data_invalid('perm', [], msg=MSG_NO_DATA)

    schema = PermSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('perm', errors)

    try:
        key = {
            "taxi": data['taxi'],
            "motorista": data['motorista'],
            "usuario": data['usuario']
        }

        model = Permissao().query.get(key)

    except IntegrityError:
        return resp_already_exists('perm', data)

    except Exception as e:
        return resp_exception('perm')

    if model:
        try:
            model.taxi = data['taxi']
            model.motorista = data['motorista']
            model.usuario = data['usuario']
            model.data_inicio = data['data_inicio']
            model.data_fim = data['data_fim']
            model.tipo = data['tipo']
            model.status = data['status']
            db_session.commit()

        except IntegrityError:
            return resp_already_exists('perm', data)

        except DataError:
            return resp_data_error('perm')

        except Exception as e:
            return resp_exception('perm', description=e)
    else:
        return resp_not_exist('perm', data)

    schema = PermSchema()
    result = schema.dump(model)

    return resp_ok('perm', MSG_RESOURCE_UPDATE.format('Permissão'),  data=result.data,)


@app.route('/perm/delete', methods=['POST'])
# @jwt_required()
def delete_perm():
    """
    Método para desativar uma permissão no sistema
    Recebe um objeto do tipo JSON com a chave placa
    motorista, usuario
    Exemplo:
    --------
    {
        "taxi": "IKH2241",
        "motorista": "67786605673",
        "usuario": "30759131091"
    }
    """

    req_data = request.get_json()
    data, errors, result = None, None, None

    if req_data is None:
        return resp_data_invalid('perm', [], msg=MSG_NO_DATA)

    schema = PermFindSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('perm', errors)

    try:
        model = Permissao().query.get(data)

    except Exception as e:
        return resp_exception('perm', description=e)

    if model:
        model.status = 0
        db_session.commit()
    else:
        return resp_not_exist('perm', data)

    schema = PermSchema()
    result = schema.dump(model)

    return resp_ok('perm', MSG_RESOURCE_DELETE.format('Permissão'),  data=result.data,)


@app.route('/perm/info', methods=['POST'])
def perm_info():
    """
    Método retorna um taxi registrado no sistema
    Recebe um objeto do tipo JSON com chave taxi,
    motorista, usuario
    Exemplo:
    --------
    {
        'taxi': 'IKH2241',
        'motorista': '09889009890',
        'usuario': '12332112321'
    }
    """

    req_data = request.get_json()
    data, errors, result, model = None, None, None, None

    if req_data is None:
        return resp_data_invalid('permit', [], msg=MSG_NO_DATA)

    schema = PermFindSchema()
    data, errors = schema.load(req_data)

    if errors:
        return resp_data_invalid('permit', errors)

    try:
        model = db_session.query(Permissao, Taxi, Motorista).\
            join(Taxi, Permissao.taxi == Taxi.placa).\
            join(Motorista, Permissao.motorista == Motorista.cpf).\
            filter(Permissao.taxi == data['taxi'])

    except InvalidRequestError:
        return resp_invalid_request_error('permit')

    except Exception as e:
        return resp_exception('permit', description=e)

    if not model:
        return resp_not_exist('permit', data)

    model = db_session.execute(model).fetchall()

    schema = PermInfoSchema(many=True)
    result = schema.dump(model)

    return resp_ok('permit', MSG_RESOURCE_FIND.format('Permit'),  data=result.data,)
