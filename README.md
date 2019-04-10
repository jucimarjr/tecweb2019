# Base de dados
> Modelagem e scripts para criação do banco de homologação.

## Modelagem
Foi utilizado o programa [Toad Data Modeler](http://www.toadworld.com/products/toad-data-modeler) para criar modelagem.
A partir dele foi gerado o arquivo "taxi_modelagem.txp". 

![Modelagem do Banco](/Modelagem/taxi_modelagem.bmp)

O programa permite a criação de um arquivo ".sql" a partir do modelo resultante, onde foi gerado o arquivo "create_table.sql".

## Banco PostgreSQL
Instalado o [PostgreSQL](https://www.postgresql.org/download/), ao inicializar o pgAdmin4 foi startado o servidor através do seguinte link:
```bash
# http://127.0.0.1:54023/browser/
```  
Para criar o banco, foi utilizado o arquivo .sql gerado pelo programa.

## Alimentando
Para alimentar o banco com valores aleatórios dentro do formato solicitado, foi utiliado o programa [Spawner Data Generator](https://sourceforge.net/projects/spawner/files/spawner/spawner-0.2.4/).
A partir deste, foram gerado quatro arquivos sql contendo:
* 20 registros na tabela reg_usuario;
* 1000 registros na tabela reg_motorista;
* 5000 registros na tabela reg_taxis;
* 10.000 registros na tabela reg_permissao.

## Scripts
Para consultar, deletar, criar, atualizar e inserir dados na tabela foram utilizados os arquivos na pasta ['PostgreSQL'](https://github.com/jucimarjr/tecweb2019/tree/database-1/PostgreSQL).

## Tutoriais de instalação
> [Toad Data Modeler](https://docs.google.com/presentation/d/1AftzuOf6OyY5GEoVzc7FN5HfHqPxcuxvNae7naCpE9Q/edit#slide=id.p)

> [PostgreSQL](https://docs.google.com/presentation/d/1E3VaxYO0eKJvomFVsq7f-9Ew7qPNto1mlkPua7LDckI/edit?usp=sharing)

> [Spawner Data Generator](https://docs.google.com/presentation/d/1Lkgant0khzNb9vnKff1msWQ2937txd3Y1JBgku01Ckg/edit?usp=sharing)
