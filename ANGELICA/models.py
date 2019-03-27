from app import db

class User(db.Model):
    __tablename__ = 'reg_usuario'

    usu_cpf = db.Column(db.String(11), unique=True, nullable=False, primary_key=True)#PK
    usu_nome = db.Column(db.String(80), nullable=False)
    usu_status = db.Column(db.Integer)
    usu_senha = db.Column(db.Text, nullable=False)