select * from reg_permissao;

select * from reg_taxi;

select * from reg_usuario;

select * from reg_motorista;

#pesquisar motoristas com permissão para dirigir
select mot.mot_cpf, mot.mot_nome, mot.mot_telefone 
from reg_permissao as perm, reg_motorista as mot
where perm_status = 1 
and NOW() between perm_data_inicio and COALESCE(perm_data_fim, NOW())
and mot.mot_cpf = perm.mot_cpf

#pesquisar motoristas com permissão para dirigir com tipo motorista
select mot.mot_cpf, mot.mot_nome, mot.mot_telefone 
from reg_permissao as perm, reg_motorista as mot
where perm_status = 1 
and perm.perm_tipo_motorista = 'motorista'
and NOW() between perm_data_inicio and COALESCE(perm_data_fim, NOW())
and mot.mot_cpf = perm.mot_cpf

#pesquisar motoristas com permissão para dirigir com tipo auxiliar
select mot.mot_cpf, mot.mot_nome, mot.mot_telefone 
from reg_permissao as perm, reg_motorista as mot
where perm_status = 1 
and perm.perm_tipo_motorista = 'auxiliar'
and NOW() between perm_data_inicio and COALESCE(perm_data_fim, NOW())
and mot.mot_cpf = perm.mot_cpf

#Deletar um registro, ou seja, mudar o status do registro da tabela permissão
update reg_permissao set perm_status = 0
where mot_cpf = '<CPF>'
and taxi_placa = '<PLACA>'
#and perm_tipo motorista = 'auxiliar'

#Deletar um registro da tabela motorista
update reg_motorista set mot_status = 0
where mot_cpf = '<CPF>'

#Deletar um registro da tabela taxi
update reg_taxi set taxi_status = 0
where taxi_placa = '<PLACA'

#Deletar um registro da tabela usuario
update reg_usuario set usu_status = 0
where usu_cpf = '<CPF>'

#Insert na tabela motorista
INSERT INTO reg_motorista VALUES ('<CPF>','<RG>','<NOME COMPLETO>','<CNH>','<TELEFONE>','<SATUS>',<CEP>,'<RUA>','<BAIRRO>');

#Insert na tabela taxi
INSERT INTO reg_taxi VALUES ('<RENAVAM>','<PLACA>','<CHASSI>','<MODELO>','<MARCA>','<ANO>',<STATUS>);

#Insert na tabela usuario
INSERT INTO reg_usuario VALUES ('<CPF>','<NOME COMPLETO>',<STATUS>,'<SENHA>');

#Insert na tabela permissao
INSERT INTO reg_permissao VALUES('<PLACA>','<MOT_CPF>','<USU_CPF>','<DATA_INI>','<DATA_FIM>','<TIPO_MOT>',<STATUS>);

#Update na tabela motorista
update reg_motorista set <MOT_CAMPO> = '<VALOR_RECEBIDO>'
where mot_cpf = '<CPF>'

#Update na tabela taxi
update reg_taxi ser <TAXI_CAMPO> = '<VALOR_RECEBIDO>'
where taxi_placa = '<PLACA>'

#Update na tabela usuario
update reg_usuario ser <USU_CAMPO> = '<VALOR_RECEBIDO>'
where usu_cpf = '<CPF>'

#Update na tabela permissao
update reg_permissao set <PERM_CAMPO> = '<VALOR_RECEBIDO>'
where mot_cpf = '<CPF>'
and taxi_placa = '<PLACA>'