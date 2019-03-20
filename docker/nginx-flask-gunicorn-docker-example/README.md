# Exemplo de criação de conteiners Ngnix + Flask
> um pequeno exemplo para cração de dois containers utilizando docker compose

## Arquitetura do projeto

```bash
.
|____api
| |____app.py
| |____requirements.txt
| |____Dockerfile
|____docker-compose.yml
|____README.md
|____conf.d
| |____api.conf
|____nginx
| |____Dockerfile

```  
## Docker-compose

```bash
api:
  restart: always
  build: ./api
  command: /usr/local/bin/gunicorn -w 2 -b :5000 app:app

nginx:
  restart: always
  build: ./nginx
  ports:
    - "8080:80"
  volumes:
    - ./conf.d:/etc/nginx/conf.d
  links:
    - api:api
 ```  
## Execução

```bash
$ docker-compose build
$ docker-compose up -d
```  
## Teste  

```bash
$ curl http://localhost:8080/
Olá Mundo!
```  
