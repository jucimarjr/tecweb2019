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
import Header from "components/Taxi/Headers/Header.jsx";


class AddTaxi extends React.Component {
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
                      Cadastrar Táxi
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Renavam
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-renavem"
                              type="text"
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-chassi"
                            >
                              Chassi
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-chassi"
                              type="text"
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
                              id="input-marca"
                              type="text"
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
                              id="input-placa"
                              type="text"
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-modelo"
                            >
                              Modelo
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-modelo"
                              type="text"
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
                              id="input-ano"
                              type="integer"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-ano"
                            >
                              Proprietario
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-ano"
                              type="integer"
                              placeholder="Digite o CPF"
                            />
                          </FormGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-ano"
                            >
                              Motorista Auxiliar
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-ano"
                              type="integer"
                              placeholder="Digite o CPF"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <Button className="mt-4 center" color="primary" type="button">
                      Cadastrar
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

export default AddTaxi;
