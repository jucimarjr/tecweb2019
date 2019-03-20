# Exemplo de criação de conteiners Ngnix + uWSGI + Flask
> um pequeno exemplo para cração de dois containers utilizando docker compose

## Arquitetura do projeto

```bash
.
|____start.sh
|____nginx.conf
|____requirements.txt
|____README.md
|____Dockerfile
|____hello.py
|____uwsgi.ini

```  
## Dockerfile

```bash
FROM python:3.7

COPY . /srv/flask_app
WORKDIR /srv/flask_app

RUN apt-get clean \
    && apt-get -y update
RUN apt-get -y install nginx \
    && apt-get -y install python3-dev \
    && apt-get -y install build-essential

RUN pip install -r requirements.txt --src /usr/local/src

COPY nginx.conf /etc/nginx
RUN chmod +x ./start.sh
CMD ["./start.sh"]
 ```  
## Execução

```bash
$ docker build . -t flask_image
$ docker run --name flask_container -p 80:80 flask_image
```  
## Teste  

```bash
$ curl http://localhost/
Hello World!
```  
