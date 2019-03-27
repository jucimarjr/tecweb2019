import os

def get_env_variable(name):
    try:
        return os.environ[name]
    except KeyError:
        message = "Expected environment variable '{}' not set.".format(name)
        raise Exception(message)

class Config(object):
    DEBUG = True
    SECRET_KEY = get_env_variable('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = get_env_variable('DATA_BASE')