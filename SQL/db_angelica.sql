DROP DATABASE IF EXISTS db_angelica; -- Não utilizar esse comando em producao

CREATE DATABASE db_angelica;

\c db_angelica; -- Comando utilizado para selecionar o banco de dados p/ criacao de tabelas

CREATE TABLE saa_usuario (
    usu_cpf VARCHAR(11) NOT NULL,
    usu_nome VARCHAR(100) NOT NULL,
    usu_senha VARCHAR(100) NOT NULL, -- Alterar o tamanho de acordo com o tipo de criptografia utilizada
    usu_status BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (usu_cpf)
);

CREATE TABLE reg_motorista (
    mot_cpf VARCHAR(11) NOT NULL,
    mot_nome VARCHAR(100) NOT NULL,
    mot_endereco TEXT,
    mot_telefone VARCHAR(11),
    mot_cnh VARCHAR(11) NOT NULL,
    mot_rg VARCHAR(15) NOT NULL,
    mot_status BOOLEAN DEFAULT TRUE,
    usu_criado_por VARCHAR(11) NOT NULL,
    PRIMARY KEY (mot_cpf),
    FOREIGN KEY (usu_criado_por) REFERENCES saa_usuario (usu_cpf)
);

CREATE TABLE reg_taxi (
    taxi_placa VARCHAR(7) NOT NULL,
    taxi_renavam VARCHAR(11) NOT NULL,
    taxi_chassi VARCHAR(17) NOT NULL,
    taxi_modelo VARCHAR(50) NOT NULL,
    taxi_marca VARCHAR(50) NOT NULL,
    taxi_ano INTEGER NOT NULL,
    taxi_status BOOLEAN DEFAULT TRUE,
    usu_criado_por VARCHAR(11) NOT NULL,
    PRIMARY KEY (taxi_placa),
    FOREIGN KEY (usu_criado_por) REFERENCES saa_usuario (usu_cpf)
);

CREATE TABLE reg_permissao (
    perm_mot_cpf VARCHAR(11) NOT NULL,
    perm_taxi_placa VARCHAR(7) NOT NULL,
    perm_data_inicio TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    perm_data_fim TIMESTAMP WITH TIME ZONE,
    perm_tipo SMALLINT NOT NULL, -- { "0": "Dono", "1": "Reserva" }
    perm_status BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (perm_mot_cpf, perm_taxi_placa)
);