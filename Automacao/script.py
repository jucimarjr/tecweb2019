import os
import requests
import json
from random import randint
from lxml import html
import sys

'''
    CONSTANTES DO PROGRAMA
'''

NOME_ARQUIVO_SQL = 'data.sql'
QTD_PESSOAS_A_GERAR = 10
QTD_VEICULOS_A_GERAR = 10
URL_REQUISICAO = "https://www.4devs.com.br/ferramentas_online.php"
MIN_IDADE, MAX_IDADE = 18, 90
INSERT_ADMIN_USER = "INSERT INTO saa_usuario VALUES ('{}', '{}', '{}', '{}');\n".format('11111111111','Administrador','umasenhadificil','TRUE')
GERAR_PESSOAS = True
GERAR_VEICULOS = True
'''
    INICIALIZAÇÃO DO PROGRAMA
'''

diretorio_atual = os.path.dirname(os.path.realpath(__file__))
diretorio_arquivo_sql = diretorio_atual.replace('Automacao','SQL/')
arquivo = open((diretorio_arquivo_sql + NOME_ARQUIVO_SQL), "w")
arquivo.write(INSERT_ADMIN_USER)

'''
    PROCESSAMENTO DO PROGRAMA - MOTORISTA
'''

if(GERAR_PESSOAS):
    for i in range(QTD_PESSOAS_A_GERAR):
	
        orientacao_sexual = "M" if (randint(0, 1)) else "F"

        data = {
            "acao": "gerar_pessoa",
            "sexo": orientacao_sexual,
            "pontuacao": "N",
            "idade": randint(MIN_IDADE, MAX_IDADE)
        }

        requisicao = requests.post(URL_REQUISICAO, data=data)

        corpo_requisicao = json.loads(requisicao.content)

        endereco = "{}, {}, {} - {}/{}, CEP {}".format(
            corpo_requisicao['endereco'],
            corpo_requisicao['numero'],
            corpo_requisicao['bairro'],
            corpo_requisicao['cidade'],
            corpo_requisicao['estado'],
            corpo_requisicao['cep'],
        )


        requisicao_cnh = requests.post(URL_REQUISICAO, data={"acao":"gerar_cnh"})
        cnh = requisicao_cnh.text[:]

        motorista = {
            "cpf": corpo_requisicao['cpf'],
            "nome": corpo_requisicao['nome'],
            "endereco": endereco,
            "telefone": corpo_requisicao['celular'],
            "cnh": cnh,
            "rg": corpo_requisicao['rg'],
            "status": 'TRUE',
            "usu_criado_por": "11111111111",
        }

        SQL_INSERCAO = "INSERT INTO reg_motorista VALUES ('{}', '{}', '{}', '{}', '{}', '{}', {}, '{}'); \n".format(
            motorista['cpf'],
            motorista['nome'],
            motorista['endereco'],
            motorista['telefone'],
            motorista['cnh'],
            motorista['rg'],
            motorista['status'],
            motorista['usu_criado_por'],
        )

        arquivo.write(SQL_INSERCAO)

        feedback_message = "({}/{}) Motoristas gerados".format((i+1), QTD_PESSOAS_A_GERAR)
        print(feedback_message, end="\r")

    print("{} Motoristas gerados com sucesso".format(QTD_PESSOAS_A_GERAR))

'''
    PROCESSAMENTO DO PROGRAMA - TAXI
'''

if(GERAR_VEICULOS):

    for i in range(QTD_VEICULOS_A_GERAR):

        data = {
            "acao": "gerar_veiculo",
            "pontuacao": "N"
        }

        requisicao = requests.post(URL_REQUISICAO, data=data)
        conteudo = html.fromstring(requisicao.content)

        veiculo = {
            "placa": conteudo.xpath('//input[@id="placa_veiculo"]/@value')[0],
            "renavam": conteudo.xpath('//input[@id="renavam"]/@value')[0],
            "chassi": "ABCDEFGHIJKLMNOPQ",
            "modelo": conteudo.xpath('//input[@id="modelo"]/@value')[0],
            "marca": conteudo.xpath('//input[@id="marca"]/@value')[0],
            "ano": int(conteudo.xpath('//input[@id="ano"]/@value')[0]),
            "status": "TRUE",
            "usu_criado_por": "11111111111"
        }

        SQL_INSERCAO = "INSERT INTO reg_taxi VALUES ('{}', '{}', '{}', '{}', '{}', {}, '{}', '{}'); \n".format(
            veiculo['placa'],
            veiculo['renavam'],
            veiculo['chassi'],
            veiculo['modelo'],
            veiculo['marca'],
            veiculo['ano'],
            veiculo['status'],
            veiculo['usu_criado_por'],
        )

        arquivo.write(SQL_INSERCAO)

        feedback_message = "({}/{}) Veículos gerados".format((i+1), QTD_VEICULOS_A_GERAR)
        print(feedback_message, end="\r")

    print("{} Veículos gerados com sucesso".format(QTD_VEICULOS_A_GERAR))