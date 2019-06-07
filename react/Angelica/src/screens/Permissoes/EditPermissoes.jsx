import React from "react";
import {
  withRouter
} from 'react-router-dom'


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components

import Header from "components/Login/Headers/UserHeader.jsx";


class EditPermissoes extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
        message : '',
        toDashboard: false,
        userEdit: this.props.location.state.userEdit
        };
  }


  edit = () => {

    if (this.cpf == undefined || this.cpf == '' ) {
      this.cpf =  this.state.userEdit.cpf
    }

    if (this.nome == undefined || this.nome == '' ) {
      this.nome =  this.state.userEdit.nome
    }

    if (this.senha == undefined || this.senha == '' ) {
      this.senha =  this.state.userEdit.senha
    }

    if (this.status == undefined || this.status == '' ) {
      this.status =  this.state.userEdit.status
    }

    const data = { cpf: this.cpf,
                   nome: this.nome, 
                   senha: this.senha,
                   status: this.status
                };
    const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    };

    fetch('/user/update', requestInfo)
            .then(response => {
                if(response.ok) {
                    return response.json()
                }
                throw new Error("...");
            })
            .then(resposta => {
                if (resposta.status == "200" ) {
                  console.log(resposta)
                  this.setState({message: resposta.message
                  })
                  this.props.history.push({
                            pathname: '/user/list-user',
                            state: { message: resposta.message}
                  })
                }else {
                    this.setState({message: resposta.message})
                }
            })
            .catch(e => {
                this.setState({ message: e.message });
            });

  }
 
  
  
  render() {
    return (
      <>
        {/* <UserHeader /> */}
        <Header/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="order-xl-1 center" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Editar Usuário</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-nome"
                            >
                              Nome
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-nome"
                              defaultValue={this.state.userEdit.nome}
                              onChange={e => this.nome = e.target.value}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-cpf"
                            >
                              CPF
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-cpf"
                              defaultValue={this.state.userEdit.cpf}
                              onChange={e => this.cpf = e.target.value}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-cpf"
                              >
                                Senha
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-senha"
                                defaultValue={this.state.userEdit.senha}
                                onChange={e => this.senha = e.target.value}
                                type="text"
                              />
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-conf-senha"
                              >
                                Confirme sua senha
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-cpf"
                                type="text"
                              />
                            </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-status"
                            >
                              Status
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-status"
                              type="integer"
                              defaultValue={this.state.userEdit.status}
                              onChange={e => this.status = e.target.value}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                  <Row>
                  <Col className="text-right" xs="7">
                      <Button
                        color="danger"
                        href="/user/list-user"
                        onClick={e => e.preventDefault()}
                        size="lg"
                      >
                        Cancelar
                      </Button>
                      <Button
                        color="primary"
                        onClick={this.edit}
                        size="lg"
                      >
                        Confirmar
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(EditPermissoes);
