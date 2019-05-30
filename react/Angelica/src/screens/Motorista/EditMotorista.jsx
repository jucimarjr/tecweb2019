import React from "react";

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


class Profile extends React.Component {
  render() {
    return (
      <>
        {/* <UserHeader /> */}
        {/* Page content */}
        <Container className="mt-3" fluid>
          <Row className="mt-5">
            <Col className="order-xl-1 center" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Editar Motorista</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="4">
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
                              placeholder="123.456.789-10"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-rg"
                            >
                              RG
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-rg"
                              placeholder="1234567-8"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-renach"
                            >
                              Renach
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-renach"
                              placeholder="AM123456789"
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
                              htmlFor="input-nome"
                            >
                              Nome
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-nome"
                              placeholder="José da Silva"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-tel"
                            >
                              Telefone
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-tel"
                              placeholder="(92) 91234-5678"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <div class="form-group">
                              <label className="form-control-label" for="exampleFormControlSelect1">Status</label>
                              <select class="form-control" id="exampleFormControlSelect1">
                                <option>Escolha...</option>
                                <option>Ativo</option>
                                <option>Inativo</option>
                              </select>
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-cep"
                            >
                              CEP
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-cep"
                              placeholder="69123-456"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-bairro"
                            >
                              Bairro
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-bairro"
                              placeholder="Aleixo"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-rua"
                            >
                              Rua
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-rua"
                              placeholder="Rua Tiradentes"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                  <Col className="text-right" xs="6">
                    <Button
                      color="primary"
                      href="#"
                      onClick={e => e.preventDefault()}
                      size="lg"
                    >
                      Confirmar
                      </Button>
                  </Col>
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
