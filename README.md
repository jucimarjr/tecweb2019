### Banco de Dados


Nesta branch é possível acessar a modelagem atual do banco de dados junto com o script de inicialização do banco de dados (Criação de tabelas) e um programa em Python para facilitar a geração de dados para as Tabelas Motorista e Taxi.

  - O arquivo de criação de tabelas encontra-se na pasta "SQL"
  - O programa em Python para geração de Motoristas e Taxis encontra-se na pasta "Automacao"

### Modelagem atual

![Modelagem do Banco](/Modelagem/ER_Angelica.png)


### Como usar

Primeiro é necessário clonar o projeto. Utilize o seguinte código:

```sh
$ git clone https://github.com/MMateuSouza/tecweb2019
```

Acesse a pasta baixada:

```sh
$ cd tecweb2019
```

Recomenda-se a criação de um ambiente virtual p/ o Python para instalação de dependências do gerador de Motoristas + Taxis (Não será abordado aqui).

Para instalar as dependências é necessário executar o seguinte comando:

```sh
$ cd Automacao/
$ pip install -r requirements.txt
```

### Algumas definições

No programa criado, possuem algumas constantes que podem ser definidas

| Constante | Definição |
| ------ | ------ |
| NOME_ARQUIVO_SQL | Nome do arquivo que será gerado na pasta "./SQL/<NOME_ARQUIVO_SQL>" |
| QTD_PESSOAS_A_GERAR | Quantidade de pessoas que o programa irá gerar |
| QTD_VEICULOS_A_GERAR | Quantidade de veículos que o programa irá |
| URL_REQUISICAO | URL 4Devs que gera pessoas/motoristas [https://www.4devs.com.br/ferramentas_online.php]  |
| MIN_IDADE | Idade mínima para o motorista |
| MAX_IDADE | Idade máxima para o motorista |
| INSERT_ADMIN_USER | Query para inserção do administrador do sistema |
| GERAR_PESSOAS | Boolean para garantir que será gerado pessoas |
| GERAR_VEICULOS | Boolean para garantir que será gerado pessoas |

### Execução

```sh
$ python script.py
```

Talvez demore um pouco dependendo da conexão.
Ao finalizar todas as querys a serem executadas estarão no diretório "./SQL/"

### Execução da query no Banco de Dados

```sh
$ cd <DIRETORIO_ONDE_FOI_CLONADO>/SQL/
$ psql -U postgres -h localhost -d postgres < db_angelica.sql
$ psql -U postgres -h localhost -d postgres < <NOME_ARQUIVO_SQL> 
```

Caso haja dúvidas, sugestões e melhorias entrar em contato (mmds.snf16@uea.edu.br).
