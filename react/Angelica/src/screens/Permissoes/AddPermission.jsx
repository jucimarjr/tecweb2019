import React from "react";
import {
  withRouter
} from 'react-router-dom'
import { throttle, debounce } from "throttle-debounce";
import Autosuggest from 'react-autosuggest';



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


class AddPermission extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        message : '',
        q: '',
        value: '',
        suggestions: []
    };
    this.add =  this.add.bind(this)

  }

  


  componentDidMount() {
    fetch('/taxis')
      .then(res => res.json())
      .then((data) => {
        this.taxisObjetos = data
        this.setState({
          taxis: data.data,
        })
        console.log(data);
      }
      )
      .catch(console.log)
  }

  

  add = () => {
    const data = { 
                  taxi: this.taxi, 
                  motorista: this.motorista,
                  usuario: "30759131091",
                  data_inicio: "2018-05-02T00:00:00",
                  data_fim: "2019-03-13T00:00:00",
                  tipo: this.tipo,
                  status: "1"
                };

    const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    };

    fetch('/perm/register', requestInfo)
            .then(response => {
                if(response.ok) {
                    return response.json()
                }
                throw new Error("...");
            })
            .then(resposta => {
                if (resposta) {
                  console.log(resposta)
                  this.setState({message: resposta.message})
                  this.props.history.push({
                    pathname: '/permissoes/list-permissions',
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
    const _searches = this.state._searches || [];
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    const { value, suggestions } = this.state;


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
                      <h3 className="mb-0">Cadastrar Autorizações</h3>
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
                              htmlFor="input-placa">
                              Placa
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-nome"
                              placeholder="Selecione a Placa"
                              type="text"
                              onChange={ e => this.taxi = e.target.value }
                            />
                         
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-placa">
                              Data  Início
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-nome"
                              placeholder="Data do início da autorização"
                              type="text"
                              onChange={e => this.data_inicio = e.target.value}
                            />
                          </FormGroup>

                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-cpf"
                            >
                              Motorista
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-cpf"
                              type="text"
                              placeholder="Insira o motorista"
                              onChange={e => this.motorista = e.target.value}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-placa">
                              Data Final
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-nome"
                              placeholder="Data de término da autorização"
                              type="text"
                              onChange={e => this.data_fim = e.target.value}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-placa">
                              Tipo de Motorista
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-nome"
                              placeholder="Selecione o tipo de motorista"
                              type="text"
                              onChange={e => this.tipo = e.target.value}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                      </Row>
                    </div>
                  </Form>
                  <Row>
                  <Col className="text-right" xs="7">
                      <Button
                        color="danger"
                        href="/permissoes/list-permission"
                        onClick={e => e.preventDefault()}
                        size="lg"
                      >
                        Cancelar
                      </Button>
                      <Button
                        color="primary"
                        onClick={this.add}
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

export  default withRouter(AddPermission);
