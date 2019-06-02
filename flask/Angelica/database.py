from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from Angelica import app

engine = create_engine(
    app.config['SQLALCHEMY_URL'], 
    convert_unicode=True,
    echo=True
)

db_session = scoped_session(
    sessionmaker(
        autocommit=False,    
        autoflush=False,
        bind=engine)
)

Base = declarative_base()
Base.query = db_session.query_property()

def init_db():

    import Angelica.models

    Base.metadata.create_all(bind=engine)
