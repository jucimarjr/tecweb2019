/*
Created: 02/03/2019
Modified: 25/03/2019
Model: PostgreSQL 10
Database: PostgreSQL 10
*/


-- Create tables section -------------------------------------------------

-- Table reg_motorista

CREATE TABLE "reg_motorista"(
 "mot_cpf" Character varying(11) NOT NULL,
 "mot_rg" Character varying(20) NOT NULL,
 "mot_nome" Character varying(100) NOT NULL,
 "mot_renach" Character varying(11) NOT NULL,
 "mot_telefone" Character varying(20) NOT NULL,
 "mot_status" Smallint NOT NULL,
 "mot_cep" Integer NOT NULL,
 "mot_rua" Character varying(50),
 "mot_bairro" Character varying(50)
)
WITH (
 autovacuum_enabled=true)
;

-- Add keys for table reg_motorista

ALTER TABLE "reg_motorista" ADD CONSTRAINT "PK_reg_motorista" PRIMARY KEY ("mot_cpf")
;

-- Table reg_taxi

CREATE TABLE "reg_taxi"(
 "taxi_renavam" Character varying(11) NOT NULL,
 "taxi_placa" Character varying(8) NOT NULL,
 "taxi_chassi" Character varying(17) NOT NULL,
 "taxi_modelo" Character varying(20) NOT NULL,
 "taxi_marca" Character varying(20) NOT NULL,
 "taxi_ano" Smallint NOT NULL,
 "taxi_status" Smallint NOT NULL
)
WITH (
 autovacuum_enabled=true)
;

-- Add keys for table reg_taxi

ALTER TABLE "reg_taxi" ADD CONSTRAINT "PK_reg_taxi" PRIMARY KEY ("taxi_placa")
;

-- Table reg_usuario

CREATE TABLE "reg_usuario"(
 "usu_cpf" Character varying(11) NOT NULL,
 "usu_nome" Character varying(100) NOT NULL,
 "usu_status" Smallint NOT NULL,
 "usu_senha" Character varying(50) NOT NULL
)
WITH (
 autovacuum_enabled=true)
;

-- Add keys for table reg_usuario

ALTER TABLE "reg_usuario" ADD CONSTRAINT "PK_reg_usuario" PRIMARY KEY ("usu_cpf")
;

-- Table reg_permissao

CREATE TABLE "reg_permissao"(
 "taxi_placa" Character varying(8) NOT NULL,
 "mot_cpf" Character varying(11) NOT NULL,
 "usu_cpf" Character varying(11) NOT NULL,
 "perm_data_inicio" Timestamp,
 "perm_data_fim" Timestamp,
 "perm_tipo_motorista" Character varying(15),
 "perm_status" Smallint
)
WITH (
 autovacuum_enabled=true)
;

-- Add keys for table reg_permissao

ALTER TABLE "reg_permissao" ADD CONSTRAINT "PK_reg_permissao" PRIMARY KEY ("taxi_placa","mot_cpf","usu_cpf")
;
-- Create foreign keys (relationships) section ------------------------------------------------- 

ALTER TABLE "reg_permissao" ADD CONSTRAINT "possui" FOREIGN KEY ("taxi_placa") REFERENCES "reg_taxi" ("taxi_placa") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "reg_permissao" ADD CONSTRAINT "tem" FOREIGN KEY ("mot_cpf") REFERENCES "reg_motorista" ("mot_cpf") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "reg_permissao" ADD CONSTRAINT "dão" FOREIGN KEY ("usu_cpf") REFERENCES "reg_usuario" ("usu_cpf") ON DELETE NO ACTION ON UPDATE NO ACTION
;




