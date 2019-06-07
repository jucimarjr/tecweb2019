import React from "react";
import {
  withRouter
} from  'react-router-dom'

// reactstrap components
import {
  Button,
  Alert,
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
import { Redirect } from 'react-router-dom'

class EditMotorista extends React.Component {

  constructor(props) {
    super(props)
    console.log(this.props.cpf);

    this.state = {
      message: '',
      status: '',
      motoristaEdit: this.props.location.state.motoristaEdit};
      this.edit = this.edit.bind(this)
  }

  edit = () => {

    if (this.cpf == undefined || this.cpf == '' ) {
      this.cpf =  this.state.motoristaEdit.cpf
    }

    if (this.nome == undefined || this.nome == '' ) {
      this.nome =  this.state.motoristaEdit.nome
    }

    if (this.rg == undefined || this.rg == '' ) {
      this.rg =  this.state.motoristaEdit.rg
    }

    if (this.renach == undefined || this.renach == '' ) {
      this.renach =  this.state.motoristaEdit.renach
    }

    if (this.bairro == undefined || this.bairro == '' ) {
      this.bairro =  this.state.motoristaEdit.bairro
    }

    if (this.rua == undefined || this.rua == '' ) {
      this.rua =  this.state.motoristaEdit.rua
    }

    if (this.cep == undefined || this.cep == '' ) {
      this.cep =  this.state.motoristaEdit.cep
    }

    if (this.telefone == undefined || this.telefone == '' ) {
      this.telefone =  this.state.motoristaEdit.telefone
    }

    if (this.status == undefined || this.status == '' ) {
      this.status =  this.state.motoristaEdit.status
    }



    const data = {
      cpf: this.cpf,
      nome: this.nome,
      rg: this.rg,
      renach: this.renach,
      bairro: this.bairro,
      rua: this.rua,
      cep: this.cep,
      telefone: this.telefone,
      status: this.status
    };

    const requestInfo = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };

    fetch('/driver/update', requestInfo)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("...");
      })
      .then(resposta => {
        if (resposta) {
          if (resposta) {
            console.log(resposta)
            this.setState({message: resposta.message
            })
            this.props.history.push({
                      pathname: '/motorista/list-motorista',
                      state: { message: resposta.message}
            })
          }else {
              this.setState({message: resposta.message})
          }
        }
      })
      .catch(e => {
        this.setState({ message: e.message });
      });
  };

  render() {
    return (
      <>
        {/* Page content */}
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Cadastrar Motorista
                    </h6>
                    {
                      this.state.status == '200' ? (
                        <Alert color="success" className="text-center" href="/motorista/list-motorista"> {this.state.message} </Alert>,
                        <Redirect to="/motorista/list-motorista"></Redirect>
                      ) :

                      this.state.status !== '' && this.state.status !== '200' ? (
                        <Alert color="danger" className="text-center"> {this.state.message} </Alert>
                      ) : ''
                    }
                    <div className="pl-lg-4">
                      <Row>
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
                              id="cpf"
                              type="integer"
                              defaultValue={this.state.motoristaEdit.cpf}
                              onChange={ e => {this.cpf = e.target.value}}
                            />
                           
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="nome"
                            >
                              Nome
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="nome"
                              type="text"
                              defaultValue={this.state.motoristaEdit.nome}
                              onChange={e => {this.nome = e.target.value;}}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-rg"
                            >
                              RG
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="rg"
                              type="integer"
                              defaultValue={this.state.motoristaEdit.rg}
                              onChange={e => {this.rg = e.target.value;}}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-renach"
                            >
                              Renach
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="renach"
                              type="text"
                              defaultValue={this.state.motoristaEdit.renach}
                              onChange={e => {this.renach = e.target.value;}}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-bairro"
                            >
                              Bairro
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="bairro"
                              type="text"
                              defaultValue={this.state.motoristaEdit.bairro}
                              onChange={e => {this.bairro = e.target.value;}}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-rua"
                            >
                              Rua
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="rua"
                              type="text"
                              defaultValue={this.state.motoristaEdit.rua}
                              onChange={e => {this.rua = e.target.value;}}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-cep"
                            >
                              CEP
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="cep"
                              type="integer"
                              defaultValue={this.state.motoristaEdit.cep}
                              onChange={e => {this.cep = e.target.value;}}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-telefone"
                            >
                              Telefone
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="telefone"
                              type="integer"
                              defaultValue={this.state.motoristaEdit.telefone}
                              onChange={e => {this.telefone = e.target.value;}}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-status"
                            >
                              Status
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="status"
                              type="integer"
                              defaultValue={this.state.motoristaEdit.status}
                              onChange={e => {this.status = e.target.value;}}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <Button className="mt-4 center" color="primary" type="button" href="" onClick={this.edit} >
                      Enviar
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(EditMotorista);
