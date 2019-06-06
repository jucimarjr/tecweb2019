import React from "react";
import {
  withRouter
} from 'react-router-dom'

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
import Header from "components/Taxi/Headers/Header.jsx";




class AddTaxi extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        message : '',
        toDashboard: false

    }; 
}

  add = () => {
    const data = { renavam: this.renavam, 
                  chassi: this.chassi,
                  marca: this.marca,
                  placa: this.placa,
                  modelo: this.modelo,
                  ano: this.ano,
                  status: this.status
                };
    const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    };

    fetch('/taxi/register', requestInfo)
            .then(response => {
                if(response.ok) {
                    return response.json()
                }
                throw new Error("...");
            })
            .then(resposta => {
                if (resposta) {
                  this.setState({message: resposta.message
                  })
                  this.props.history.push({
                            pathname: '/taxi/list-taxi',
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
        {/* Page content */}
        <Header />
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="bg-secondary shadow">
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">Cadastrar Táxi</h6>
                    {
                    this.state.message !== ''? (
                        <Alert color="danger" className="text-center"> {this.state.message} </Alert>
                    ) : ''
                    }
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="4" lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-renavam"
                            >
                              Renavam
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="renavam"
                              type="text"
                              onChange={e => this.renavam = e.target.value}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="chassi"
                            >
                              Chassi
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="chassi"
                              type="text"
                              onChange={e => this.chassi = e.target.value}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-marca"
                            >
                              Marca
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="marca"
                              type="text"
                              onChange={e => this.marca = e.target.value}
                            />
                          </FormGroup>
                    
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-placa"
                            >
                              Placa
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="placa"
                              type="text"
                              onChange={e => this.placa = e.target.value}
                            />
                          </FormGroup>
                          </Col>
                          <Col md="4" lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-modelo"
                            >
                              Modelo
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="modelo"
                              type="text"
                              onChange={e => this.modelo = e.target.value}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-ano"
                            >
                              Ano
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="ano"
                              type="integer"
                              onChange={e => this.ano = e.target.value}
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-ano"
                            >
                              Status
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="status"
                              type="integer"
                              onChange={e => this.status = e.target.value}
                            />
                          </FormGroup>
                       </Col>
                      </Row>
                    </div>
                    <Button className="mt-4 center" color="primary" type="button" onClick={this.add} >
                      Enviar
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(AddTaxi);
