import React from "react";

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

class Profile extends React.Component {

  constructor(props) {
    super(props)
    console.log(this.props.cpf);

    this.state = {
      message: '',
      status: ''
    };
  }

  edit = () => {
    const data = {
      cpf: this.cpf,
      nome: this.nome,
      rg: this.rg,
      renach: this.renach,
      bairro: this.bairro,
      rua: this.rua,
      cep: this.cep,
      telefone: this.telefone,
      status: parseInt(this.status)
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
          console.log(resposta);
          this.setState({ message: resposta.message });
          this.setState({ status: resposta.status });
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

export default Profile;
