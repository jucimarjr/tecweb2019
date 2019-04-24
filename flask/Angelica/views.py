from Angelica import app, bcrypt
from flask_jwt import jwt_required
from flask import request, jsonify
from Angelica.models import Usuario, Motorista, Taxi, Permissao
from Angelica.methods import mensagem_feedback
from flask_jwt import jwt_required
import os

@app.route('/')
def index():

    app_name = os.getenv("APP_NAME")

    if app_name:
        return "Hello World running in a Docker container behind Nginx!"

    return 'Hello World!'

'''
    Método de Autenticação
'''

@app.route('/autenticar', methods=['POST'])
def autenticar():

    cpf = request.form["cpf"] if "cpf" in request.form else None
    senha = request.form["senha"] if "senha" in request.form else None

    if(cpf and senha):

        usuario = Usuario().authenticate(cpf, senha)

        if(usuario):

            return jsonify(usuario)

        return mensagem_feedback(False, "Credenciais inválidas, favor tentar novamente!")

    return mensagem_feedback(False, "Credenciais não informadas, favor tentar novamente!")

def identidade(payload):

    cpf = payload["usuario"]["cpf"] if "usuario" in payload else None
    return Usuario().read(cpf)

'''
    CRUD - Usuário
'''

@app.route('/usuario/get', methods=['POST'])
@jwt_required()
def get_usuario():

    cpf = request.form["cpf"] if "cpf" in request.form else None

    if(cpf):

        usuario = Usuario().read(cpf)

        if(usuario != {}):
            return jsonify(usuario)
        
        return mensagem_feedback(False, "Usuário não encontrado na base de dados")

    return mensagem_feedback(False, "É necessário informar um CPF")
    

@app.route('/usuarios/get', methods=['GET'])
@jwt_required()
def get_usuarios():
    usuarios = Usuario().list()

    return jsonify(usuarios)

@app.route('/usuario/create', methods=['POST'])
#@jwt_required()
def create_usuario():
    
    cpf = request.form["cpf"] if "cpf" in request.form else None

    if(cpf and True): # Substituir True por função de verificar se já foi cadastrado.

        senha = request.form['senha'] if request.form['senha'] else '123456'
        senha_hash = bcrypt.generate_password_hash(senha).decode("utf-8")

        usuario = {
            "cpf": cpf,
            "nome": request.form["nome"] if "nome" in request.form else "Não informado",
            "senha": senha_hash,
            "status": request.form["status"] if "status" in request.form else 1,
        }
        
        usuario = Usuario(usuario)

        return mensagem_feedback(True, "Usuário cadastrado com sucesso!")

    elif(cpf):
        return mensagem_feedback(False, "CPF já cadastrado na base de dados!")

    return mensagem_feedback(False, "Não foi possível cadastrar o Usuário!")
    

@app.route('/usuario/update', methods=['POST'])
@jwt_required()
def update_usuario():

    cpf = request.form["cpf"] if "cpf" in request.form else None

    if(cpf):

        senha = request.form["senha"] if request.form["senha"] else None
        if(senha):
            senha_hash = bcrypt.generate_password_hash(senha).decode("utf-8")

        usuario = {
            "cpf": cpf,
            "nome": request.form["nome"] if "nome" in request.form else None,
            "senha": senha_hash,
            "status": request.form["status"] if "status" in request.form else None,
        }

        usuario = Usuario().update(usuario)
        
        return mensagem_feedback(True, "Usuário atualizado com sucesso!")

    return mensagem_feedback(False, "É necessário informar um CPF")
    
@app.route('/usuario/delete', methods=['POST'])
@jwt_required()
def delete_usuario():

    cpf = request.form["cpf"] if "cpf" in request.form else None

    if(cpf):

        usuario = Usuario().delete(cpf)
        
        return mensagem_feedback(True, "Usuário desativado com sucesso!")

    return mensagem_feedback(False, "É necessário informar um CPF")

'''
    CRUD - Motorista
'''

@app.route('/motorista/get', methods=['POST'])
@jwt_required()
def get_motorista():

    cpf = request.form["cpf"] if "cpf" in request.form else None

    if(cpf):

        motorista = Motorista().read(cpf)

        if(motorista != {}):
            return jsonify(motorista)
        
        return mensagem_feedback(False, "Motorista não encontrado na base de dados")

    return mensagem_feedback(False, "É necessário informar um CPF")

@app.route('/motoristas/get', methods=['GET'])
@jwt_required()
def get_motoristas():
    motoristas = Motorista().list()

    return jsonify(motoristas)

@app.route('/motorista/create', methods=['POST'])
@jwt_required()
def create_motorista():

    cpf = request.form["cpf"] if "cpf" in request.form else None

    if(cpf and True): # Substituir True por função de verificar se já foi cadastrado.

        motorista = {
            "cpf": cpf,
            "rg": request.form["rg"] if "rg" in request.form else "Não informado",
            "nome": request.form["nome"] if "nome" in request.form else "Não informado",
            "renach": request.form["renach"] if "renach" in request.form else "Não informado",
            "telefone": request.form["telefone"] if "telefone" in request.form else "Não informado",
            "cep": request.form["cep"] if "cep" in request.form else "Não informado",
            "rua": request.form["rua"] if "rua" in request.form else "Não informada",
            "bairro": request.form["bairro"] if "bairro" in request.form else "Não informado",
            "status": request.form["status"] if "status" in request.form else 1,
        }
        
        motorista = Motorista(motorista)

        return mensagem_feedback(True, "Motorista cadastrado com sucesso!")

    elif(cpf):
        return mensagem_feedback(False, "CPF já cadastrado na base de dados!")

    return mensagem_feedback(False, "Não foi possível cadastrar o Motorista!")

@app.route('/motorista/update', methods=['POST'])
@jwt_required()
def update_motorista():

    cpf = request.form["cpf"] if "cpf" in request.form else None

    if(cpf):

        motorista = {
            "cpf": cpf,
            "rg": request.form["rg"] if "rg" in request.form else None,
            "nome": request.form["nome"] if "nome" in request.form else None,
            "renach": request.form["renach"] if "renach" in request.form else None,
            "telefone": request.form["telefone"] if "telefone" in request.form else None,
            "cep": request.form["cep"] if "cep" in request.form else None,
            "rua": request.form["rua"] if "rua" in request.form else None,
            "bairro": request.form["bairro"] if "bairro" in request.form else None,
            "status": request.form["status"] if "status" in request.form else None,
        }

        motorista = Motorista().update(motorista)
        
        return mensagem_feedback(True, "Motorista atualizado com sucesso!")

    return mensagem_feedback(False, "É necessário informar um CPF")

@app.route('/motorista/delete', methods=['POST'])
@jwt_required()
def delete_motorista():

    cpf = request.form["cpf"] if "cpf" in request.form else None

    if(cpf):

        motorista = Motorista().delete(cpf)
        
        return mensagem_feedback(True, "Motorista desativado com sucesso!")

    return mensagem_feedback(False, "É necessário informar um CPF")

'''
    CRUD - Taxi
'''

@app.route('/taxi/get', methods=['POST'])
@jwt_required()
def get_taxi():

    placa = request.form["placa"] if "placa" in request.form else None

    if(placa):

        taxi = Taxi().read(placa)

        if(taxi != {}):
            return jsonify(taxi)
        
        return mensagem_feedback(False, "Taxi não encontrado na base de dados")

    return mensagem_feedback(False, "É necessário informar uma placa")

@app.route('/taxis/get', methods=['GET'])
@jwt_required()
def get_taxis():
    taxis = Taxi().list()

    return jsonify(taxis)

@app.route('/taxi/create', methods=['POST'])
@jwt_required()
def create_taxi():

    placa = request.form["placa"] if "placa" in request.form else None

    if(placa and True): # Substituir True por função de verificar se já foi cadastrado.

        taxi = {
            "placa": placa,
            "renavam": request.form["renavam"] if "renavam" in request.form else "Não informado",
            "chassi": request.form["chassi"] if "chassi" in request.form else "Não informado",
            "marca": request.form["marca"] if "marca" in request.form else "Não informada",
            "modelo": request.form["modelo"] if "modelo" in request.form else "Não informado",
            "ano": request.form["ano"] if "ano" in request.form else "Não informado",
            "status": request.form["status"] if "status" in request.form else 1,
        }
        
        taxi = Taxi(taxi)

        return mensagem_feedback(True, "Taxi cadastrado com sucesso!")

    elif(cpf):
        return mensagem_feedback(False, "placa já cadastrada na base de dados!")

    return mensagem_feedback(False, "Não foi possível cadastrar o Taxi!")

@app.route('/taxi/update', methods=['POST'])
@jwt_required()
def update_taxi():

    placa = request.form["placa"] if "placa" in request.form else None

    if(placa):

        taxi = {
            "placa": placa,
            "renavam": request.form["renavam"] if "renavam" in request.form else None,
            "chassi": request.form["chassi"] if "chassi" in request.form else None,
            "marca": request.form["marca"] if "marca" in request.form else None,
            "modelo": request.form["modelo"] if "modelo" in request.form else None,
            "ano": request.form["ano"] if "ano" in request.form else None,
            "status": request.form["status"] if "status" in request.form else None,
        }
        
        taxi = Taxi().update(taxi)

        return mensagem_feedback(True, "Taxi atualizado com sucesso!")

    elif(cpf):
        return mensagem_feedback(False, "placa já cadastrada na base de dados!")

    return mensagem_feedback(False, "Não foi possível cadastrar o Taxi!")

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
        permissao = Permissao().read(taxi,motorista,usuario)

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

    if(taxi and usuario and motorista and True): # Substituir True por função de verificar se já foi cadastrado.

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

        permissao = Permissao().delete(taxi,motorista,usuario)
        
        return mensagem_feedback(True, "Permissão desativado com sucesso!")

    return mensagem_feedback(False, "Dados insuficientes para exclusão")

