import datetime
from sqlalchemy import Table, Column, Integer, String, DateTime, PrimaryKeyConstraint, ForeignKey
from sqlalchemy.orm import relationship, mapper
from Angelica.database import Base, db_session
from Angelica import app, bcrypt
import jwt

#---------------------------------#
# Usuário
#---------------------------------#

class Usuario(Base):
    __tablename__ = "reg_usuario"
    __table_args__ = (
        PrimaryKeyConstraint('usu_cpf', name='PK_usu_cpf'),
    )

    cpf = Column("usu_cpf", String(11), nullable=False)
    nome = Column("usu_nome", String(100), nullable=False)
    senha = Column("usu_senha", String(100), nullable=False)
    status = Column("usu_status", Integer, nullable=False)

    def __init__(self, usuario=None):
        if(usuario):
            self.cpf = usuario['cpf']
            self.nome = usuario['nome']
            self.senha = usuario['senha']
            self.status = int(usuario['status'])

            db_session.add(self)
            db_session.commit()

    def __repr__(self):
        return "<Usuario %r>" % self.nome

    def authenticate(self, cpf, senha):
        self = self.query.get(cpf)
        
        if(self):

            auth = bcrypt.check_password_hash(self.senha, senha)
            
            if(auth):
    
                usuario = {
                    "cpf": self.cpf,
                    "nome": self.nome,
                    "status": self.status,                
                }

                token = jwt.encode(
                    {'iat': datetime.datetime.utcnow(), 'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1), 'nbf': datetime.datetime.utcnow(), 'usuario': usuario}, 
                    app.config['SECRET_KEY'], 
                    algorithm='HS256'
                )
                usuario['token'] = token.decode("utf-8")
                
                return usuario

            return False

        return False

    def read(self, cpf):        
        
        usuario = self.query.get(cpf)

        return {
            "cpf": usuario.cpf,
            "nome": usuario.nome,
            "status": usuario.status
        } if usuario else {}
        
    def update(self, usuario):
        
        self = self.query.get(usuario["cpf"])

        self.nome = usuario["nome"] if usuario["nome"] else self.nome
        self.senha = usuario["senha"] if usuario["senha"] else self.senha
        self.status = int(usuario["status"]) if usuario["status"] else self.status
    
        db_session.commit()
    
    def delete(self, cpf):
        
        self = self.query.get(cpf)
        self.status = 0
        db_session.commit()

    def list(self):
        usuarios = [
            {"cpf": usuario.cpf, "nome": usuario.nome, "status": usuario.status } for usuario in self.query.all()
        ]
        return usuarios

#---------------------------------#
# Motorista
#---------------------------------#

class Motorista(Base):
    __tablename__ = "reg_motorista"
    __table_args__ = (
        PrimaryKeyConstraint('mot_cpf', name='PK_reg_motorista'),
    )

    cpf = Column("mot_cpf", String(11), nullable=False)
    rg = Column("mot_rg", String(20), nullable=False)
    nome = Column("mot_nome", String(100), nullable=False)
    renach = Column("mot_renach", String(11), nullable=False)
    telefone = Column("mot_telefone", String(20), nullable=False)
    cep = Column("mot_cep", Integer, nullable=False)
    rua = Column("mot_rua", String(50), nullable=False)
    bairro = Column("mot_bairro", String(50), nullable=False)
    status = Column("mot_status", Integer, nullable=False)

    def __init__(self, motorista=None):
        if(motorista):
            self.cpf = motorista['cpf']
            self.rg = motorista['rg']
            self.nome = motorista['nome']
            self.renach = motorista['renach']
            self.telefone = motorista['telefone']
            self.cep = int(motorista['cep'])
            self.rua = motorista['rua']
            self.bairro = motorista['bairro']
            self.status = int(motorista['status'])

            db_session.add(self)
            db_session.commit()

    def __repr__(self):
        return "<Motorista %r>" % self.nome

    def read(self, cpf):        
        
        motorista = self.query.get(cpf)

        return {
            "cpf": motorista.cpf,
            "rg": motorista.rg,
            "nome": motorista.nome,
            "renach": motorista.renach,
            "telefone": motorista.telefone,
            "cep": motorista.cep,
            "rua": motorista.rua,            
            "bairro": motorista.bairro,
            "status": motorista.status
        } if motorista else {}
        
    def update(self, motorista):
        
        self = self.query.get(motorista["cpf"])

        self.rg = motorista['rg'] if motorista['rg'] else self.rg
        self.nome = motorista['nome'] if motorista['nome'] else self.nome
        self.renach = motorista['renach'] if motorista['renach'] else self.renach
        self.telefone = motorista['telefone'] if motorista['telefone'] else self.telefone
        self.cep = int(motorista['cep']) if motorista['cep'] else self.cep
        self.rua = motorista['rua'] if motorista['rua'] else self.rua
        self.bairro = motorista['bairro'] if motorista['bairro'] else self.bairro
        self.status = int(motorista['status']) if motorista['status'] else self.status
    
        db_session.commit()
    
    def delete(self, cpf):
        
        self = self.query.get(cpf)
        self.status = 0
        db_session.commit()

    def list(self):
        motoristas = [
            {
                "cpf": motorista.cpf,
                "rg": motorista.rg,
                "nome": motorista.nome,
                "renach": motorista.renach,
                "telefone": motorista.telefone,
                "cep": motorista.cep,
                "rua": motorista.rua,            
                "bairro": motorista.bairro,
                "status": motorista.status
            } for motorista in self.query.all()
        ]
        return motoristas

#---------------------------------#
# Taxi
#---------------------------------#

class Taxi(Base):
    __tablename__ = "reg_taxi"
    __table_args__ = (
        PrimaryKeyConstraint('taxi_placa', name='PK_reg_taxi'),
    )

    placa = Column("taxi_placa", String(8), nullable=False)
    renavam = Column("taxi_renavam", String(11), nullable=False)
    chassi = Column("taxi_chassi", String(17), nullable=False)
    marca = Column("taxi_marca", String(20), nullable=False)
    modelo = Column("taxi_modelo", String(20), nullable=False)
    ano = Column("taxi_ano", Integer, nullable=False)
    status = Column("taxi_status", Integer, nullable=False)

    def __init__(self, taxi=None):
        if(taxi):
            self.placa = taxi['placa']
            self.renavam = taxi['renavam']
            self.chassi = taxi['chassi']
            self.marca = taxi['marca']
            self.modelo = taxi['modelo']
            self.ano = int(taxi['ano'])
            self.status = int(taxi['status'])

            db_session.add(self)
            db_session.commit()

    def __repr__(self):
        return "<Taxi %r>" % self.placa

    def read(self, placa):        
        
        taxi = self.query.get(placa)

        return {
            "placa": taxi.placa,
            "renavam": taxi.renavam,
            "chassi": taxi.chassi,
            "marca": taxi.marca,
            "modelo": taxi.modelo,
            "ano": taxi.ano,
            "status": taxi.status
        } if taxi else {}
        
    def update(self, taxi):
        
        self = self.query.get(taxi["placa"])

        self.placa = taxi["placa"] if taxi["placa"] else self.placa
        self.renavam = taxi["renavam"] if taxi["renavam"] else self.renavam
        self.chassi = taxi["chassi"] if taxi["chassi"] else self.chassi
        self.marca = taxi["marca"] if taxi["marca"] else self.marca
        self.modelo = taxi["modelo"] if taxi["modelo"] else self.modelo
        self.ano = taxi["ano"] if taxi["ano"] else self.ano
        self.status = int(taxi["status"]) if taxi["status"] else self.status
    
        db_session.commit()
    
    def delete(self, placa):
        
        self = self.query.get(placa)
        self.status = 0
        db_session.commit()

    def list(self):
        taxis = [
            {
                "placa": taxi.placa,
                "renavam": taxi.renavam,
                "chassi": taxi.chassi,
                "marca": taxi.marca,
                "modelo": taxi.modelo,
                "ano": taxi.ano,
                "status": taxi.status
            } for taxi in self.query.all()
        ]
        return taxis
#---------------------------------#
# Permissão
#---------------------------------#

class Permissao(Base):
    __tablename__ = "reg_permissao"
    __table_args__ = (
        PrimaryKeyConstraint("taxi_placa", "mot_cpf", "usu_cpf", name="PK_reg_permissao"),
    )

    taxi = Column("taxi_placa", String(8), ForeignKey("reg_taxi.taxi_placa"), nullable=False)
    motorista = Column("mot_cpf", String(11), ForeignKey("reg_motorista.mot_cpf"), nullable=False)
    usuario = Column("usu_cpf", String(11), ForeignKey("reg_usuario.usu_cpf"), nullable=False)
    data_inicio = Column("perm_data_inicio", DateTime, nullable=False, default=datetime.datetime.utcnow)
    data_fim = Column("perm_data_fim", DateTime, default=None)
    tipo = Column("perm_tipo_motorista", String(15), nullable=False)
    status = Column("perm_status", Integer, nullable=False)

    def __init__(self, permissao=None):
        if(permissao):
            self.taxi = permissao['taxi']
            self.motorista = permissao['motorista']
            self.usuario = permissao['usuario']
            self.data_inicio = permissao['data_inicio']
            self.data_fim = permissao['data_fim']
            self.tipo = int(permissao['tipo'])
            self.status = int(permissao['status'])

            db_session.add(self)
            db_session.commit()

    def __repr__(self):
        return "<Permissão %r>" % self.taxi

    def read(self, taxi, motorista, usuario):        
        
        permissao = self.query.get({"taxi" : taxi,"motorista" : motorista,"usuario" : usuario})

        return {
            "taxi": permissao.taxi,
            "motorista": permissao.motorista,
            "usuario": permissao.usuario,
            "data_inicio": permissao.data_inicio,
            "data_fim": permissao.data_fim,
            "tipo": permissao.tipo,
            "status": permissao.status
        } if permissao else {}
        
    def update(self, permissao):
        
        self = self.query.get({"taxi" : permissao["taxi"],"motorista" : permissao["motorista"],"usuario" : permissao["usuario"]})

        self.taxi = permissao["taxi"] if permissao["taxi"] else self.taxi
        self.motorista = permissao["motorista"] if permissao["motorista"] else self.motorista
        self.usuario = permissao["usuario"] if permissao["usuario"] else self.usuario
        self.data_inicio = permissao["data_inicio"] if permissao["data_inicio"] else self.data_inicio
        self.data_fim = permissao["data_fim"] if permissao["data_fim"] else self.data_fim
        self.tipo = permissao["tipo"] if permissao["tipo"] else self.tipo
        self.status = int(permissao["status"]) if permissao["status"] else self.status
    
        db_session.commit()
    
    def delete(self, taxi, motorista, usuario):
        
        self = self.query.get({"taxi" : taxi,"motorista" : motorista,"usuario" : usuario})
        self.status = 0
        db_session.commit()

    def list(self):
        permissoes = [
            {
                "taxi": permissao.taxi,
                "motorista": permissao.motorista,
                "usuario": permissao.usuario,
                "data_inicio": permissao.data_inicio,
                "data_fim": permissao.data_fim,
                "tipo": permissao.tipo,
                "status": permissao.status
            } for permissao in self.query.all()
        ]
        return permissoes
    
    def info_taxi(self, placa):
        
        info = self.query.get({"taxi": placa})
        return info
