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
        permissionEdit: this.props.location.state.permissionEdit
        };
  }


  edit = () => {

    if (this.taxi == undefined || this.taxi == '' ) {
      this.taxi =  this.state.permissionEdit.taxi
    }

    if (this.motorista == undefined || this.motorista == '' ) {
      this.motorista =  this.state.permissionEdit.motorista
    }

    if (this.usuario == undefined || this.usuario == '' ) {
      this.usuario =  this.state.permissionEdit.usuario
    }

    if (this.data_inicio == undefined || this.data_inicio == '' ) {
      this.data_inicio =  this.state.permissionEdit.data_inicio
    }

    if (this.data_fim == undefined || this.data_fim == '' ) {
      this.data_fim =  this.state.permissionEdit.data_fim
    }

    if (this.tipo == undefined || this.tipo == '' ) {
      this.tipo =  this.state.permissionEdit.tipo
    }

    if (this.status == undefined || this.status == '' ) {
      this.status =  this.state.permissionEdit.status
    }


    const data = { taxi: this.taxi,
                   motorista: this.motorista, 
                   usuario: this.usuario,
                   data_inicio: this.data_inicio,
                   data_fim: this.data_fim,
                   tipo: this.tipo,
                   status: this.status
                };
    const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    };

    fetch('/perm/update', requestInfo)
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
                            pathname: '/perm/list-permissoes',
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
                      <h3 className="mb-0">Editar Permissões</h3>
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
                              htmlFor="input-taxi"
                            >
                              Taxi
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-taxi"
                              defaultValue={this.state.permissionEdit.taxi}
                              onChange={e => this.taxi = e.target.value}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-motorista"
                            >
                              CPF do Motorista
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-motorista"
                              defaultValue={this.state.permissionEdit.motorista}
                              onChange={e => this.motorista = e.target.value}
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
                                htmlFor="input-motorista"
                              >
                                CPF do Usuario
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-usuario"
                                defaultValue={this.state.permissionEdit.usuario}
                                onChange={e => this.usuario = e.target.value}
                                type="text"
                              />
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                           <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-motorista"
                              >
                                Data Inicio
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-usuario"
                                defaultValue={this.state.permissionEdit.data_inicio}
                                onChange={e => this.data_inicio = e.target.value}
                                type="text"
                              />
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                           <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-motorista"
                              >
                                Data Fim
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-usuario"
                                defaultValue={this.state.permissionEdit.data_fim}
                                onChange={e => this.data_fim = e.target.value}
                                type="text"
                              />
                            </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-status"
                            >
                              Tipo
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-status"
                              type="integer"
                              defaultValue={this.state.permissionEdit.tipo}
                              onChange={e => this.tipo = e.target.value}
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
                              defaultValue={this.state.permissionEdit.status}
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
                        href="/permissoes/list-permissions"
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
