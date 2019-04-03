import os
from flask import Flask
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt
from flask_jwt import JWT

ENV_PATH = os.path.join(os.getcwd(), '.env')

load_dotenv(ENV_PATH)

app = Flask(__name__)
bcrypt = Bcrypt(app)

config = {
    'ENV': os.getenv('ENV') if os.getenv('ENV') else 'development',
    'DEBUG': os.getenv('DEBUG') if os.getenv('DEBUG') else True,
    'SECRET_KEY': os.getenv('SECRET_KEY') if os.getenv('SECRET_KEY') else 'SECRET_KEY',
    'SQLALCHEMY_URL': os.getenv('postgres://tecweb:qaz123wsx@localhost/tecwebDB') if os.getenv('postgres://tecweb:qaz123wsx@localhost/tecwebDB') else 'postgres://tecweb:qaz123wsx@localhost/tecwebDB'
}

app.config['ENV'] = config['ENV']
app.config['DEBUG'] = config['DEBUG']
app.config['SECRET_KEY'] = config['SECRET_KEY']
app.config['SQLALCHEMY_URL'] = config['SQLALCHEMY_URL']

from Angelica.views import autenticar, identidade

jwt = JWT(app, autenticar, identidade)

from Angelica.database import db_session
import Angelica.views

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()
