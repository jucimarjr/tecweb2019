# Exemplo de criação de conteiner docker + postgres
> um pequeno exemplo para criação de container utilizando docker compose

## Arquitetura do projeto

```bash
|____data
| |____postgres
|____docker-compose.yml
|____README.md
|____sql_scripts
| |____reg_motorista.csv
| |____reg_taxi.csv
| |____reg_permissao.csv
| |____saa_usuario_copy.sql
| |____reg_taxi_copy.sql
| |____reg_motorista_copy.sql
| |____reg_permissao_copy.sql
| |____saa_usuario.csv
| |____table.sql
```  
## Docker-compose
```bash
version: "3"
services:
  tecweb:
    image: postgres:latest
    container_name: "postgres"
    environment:
      - POSTGRES_DB=tecweb
      - POSTGRES_USER=tecweb
      - TZ=GMT
    volumes:
      - "./data/postgres:/var/lib/postgresql/data"
    ports:
      - 5432:5432
```
## Iniciar o conteiner

```bash
$ docker-compose up tecweb
```  
## Execução dos scripts sql  

```bash
$ sudo cp sql_scripts/*.sql data/postgres/
$ sudo cp sql_scripts/*.csv data/postgres/
$ docker-compose exec tecweb psql -U tecweb -d tecweb -1 -f /var/lib/postgresql/data/table.sql
$ docker-compose exec tecweb psql -U tecweb -d tecweb -1 -f /var/lib/postgresql/data/reg_motorista_copy.sql
$ docker-compose exec tecweb psql -U tecweb -d tecweb -1 -f /var/lib/postgresql/data/reg_taxi_copy.sql
$ docker-compose exec tecweb psql -U tecweb -d tecweb -1 -f /var/lib/postgresql/data/reg_permissao_copy.sql
$ docker-compose exec tecweb psql -U tecweb -d tecweb -1 -f /var/lib/postgresql/data/saa_usuario_copy.sql
```  
## Comandos mágicos  
Para acessar o banco:
```bash
$ docker-compose exec tecweb psql -U tecweb -d tecweb
```  
Exibir definição de tabelas:

```bash
tecweb=# \d reg_motorista
            List of relations
 Schema |     Name      | Type  | Owner  
--------+---------------+-------+--------
 public | reg_motorista | table | tecweb
 public | reg_permissao | table | tecweb
 public | reg_taxi      | table | tecweb
 public | saa_usuario   | table | tecweb
(4 rows)
```  

```bash
tecweb=# \d
                      Table "public.reg_motorista"
    Column    |          Type          | Collation | Nullable
 | Default 
--------------+------------------------+-----------+---------
-+---------
 mot_cpf      | character varying(11)  |           | not null
 | 
 mot_rg       | character varying(20)  |           | not null
 | 
 mot_nome     | character varying(100) |           | not null
 | 
 mot_renach   | character varying      |           | not null
 | 
 mot_telefone | character varying(20)  |           | not null
 | 
 mot_status   | character varying(7)   |           | not null
 | 
 mot_cep      | character varying(8)   |           | not null
 | 
 mot_rua      | character varying(50)  |           |         
 | 
 mot_bairro   | character varying(50)  |           |         
 | 
Indexes:
    "reg_motorista_pkey" PRIMARY KEY, btree (mot_cpf)
Referenced by:
    TABLE "reg_permissao" CONSTRAINT "reg_permissao_mot_cpf_f
key" FOREIGN KEY (mot_cpf) REFERENCES reg_motorista(mot_cpf)
```  
Listar bancos:
```bash
tecweb=# \l
                              List of databases
   Name    | Owner  | Encoding |  Collate   |   Ctype    | Ac
cess privileges 
-----------+--------+----------+------------+------------+---
----------------
 postgres  | tecweb | UTF8     | en_US.utf8 | en_US.utf8 | 
 tecweb    | tecweb | UTF8     | en_US.utf8 | en_US.utf8 | 
 template0 | tecweb | UTF8     | en_US.utf8 | en_US.utf8 | =c
/tecweb        +
           |        |          |            |            | te
cweb=CTc/tecweb
 template1 | tecweb | UTF8     | en_US.utf8 | en_US.utf8 | =c
/tecweb        +
           |        |          |            |            | te
cweb=CTc/tecweb
(4 rows)
```
Listar relacionamentos:
```bash
tecweb=# \di
                      List of relations
 Schema |        Name        | Type  | Owner  |     Table    
 
--------+--------------------+-------+--------+--------------
-
 public | reg_motorista_pkey | index | tecweb | reg_motorista
 public | reg_permissao_pkey | index | tecweb | reg_permissao
 public | reg_taxi_pkey      | index | tecweb | reg_taxi
 public | saa_usuario_pkey   | index | tecweb | saa_usuario
(4 rows)
```
O mais importante sair da sessão:
```bash
tecweb=# \q
```
