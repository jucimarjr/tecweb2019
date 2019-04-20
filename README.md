# tecweb2019


CRIANDO O BANCO DE DADOS LOCALMENTE E SE PREPARANDO PARA FAZER OS CRUD's + API:

Passo 1.
Rode esse comando no terminal [$ python3 -c 'import os; print(os.urandom(16))']
Vai ser gerado uma chave, por enquanto salve ela em algum editor de texto. (SECRET_KEY)

Passo 2.
Depois entre nesse link https://gist.github.com/nex3/c395b2f8fd4b02068be37c961301caa7
Se estiver em mac ou linux, abra o arquivo descrito no link acima mac(.bash_profile), se linux (.bashrc)
Com um editor de texto modifique este arquivo, setando a SECRET_KEY com o valor gerado no passo 1.

Passo 3.
E também sete esta outra variável DATA_BASE nesse estilo do link http://flask-sqlalchemy.pocoo.org/2.3/config/
Padrão = dialect+driver://username:password@host:port/database
Ao final salve o arquivo e de source .bash_profile (para dar refresh no arquivo)

Passo 4.
Entre no PGAdmin para criar as tabelas com os scripts que estão no git

Passo 5.
Se ainda estiver sem front use o POSTMAN para testar as API's feitas durante a criação dos CRUD

Passo 6. 
Rodar este comando "pip install -r requirements.txt" no terminal, acessando a pasta do crud (flask )



Projeto Angélica
  
- Visão geral do Projeto ( Equipe Anne )
  - Escopo 
  - Equipe
  
- Requisitos ( Equipe Anne )
  - Requisitos funcionais, não-funcionais e regras de negócio
  - Casos de Uso - Diagrama, Atores e descrição
  - UI/UX
  
- Arquitetura de Software ( Equipe Neto )
  - Restrições e objetivos
  - Topologia de rede
  - Representação gráfica
  - Estrutura de pacotes
  - Banco de dados ( modelo e dicionário de dados )
  - Segurança


- Codificação ( Equipe Eduardo )
  - Boas práticas ( manual de codificação )
  - Estrutura de pastas
  
- Configuracão e Ambiente ( Equipe Rodrigos )
  - Estrutura de branches
  - Repositórios
  - Boas práticas
  
 - Tecnologias ( TUtorial com instação ) - Equipe Anne
  - Docker
  - Nginx 
  - Flask
  - React 
  - Kit Creative Tim
  - Integrando todas as tecnologias do projeto
  - Instalando as tecnologias no computador de um novo desenvolvedor
