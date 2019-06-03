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
        <Header/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="order-xl-1 center" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Cadastrar Usuário</h3>
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
                              placeholder="José da Silva"
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
                              placeholder="123.456.789-10"
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
                                placeholder="161651651"
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
                                placeholder="161651651"
                                type="text"
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
                        href="/admin/list-user"
                        onClick={e => e.preventDefault()}
                        size="lg"
                      >
                        Cancelar
                      </Button>
                      <Button
                        color="primary"
                        href="/admin/list-user"
                        onClick={e => e.preventDefault()}
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

export default Profile;
