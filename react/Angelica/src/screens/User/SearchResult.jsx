import React from "react";

// reactstrap components
import {
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  Container,
  CardBody,
  CardImg,
  CardTitle,
  CardText
} from "reactstrap";

class SearchResult extends React.Component {
  render() {
    return (
      <>
        <Container className="mt-4 mb-3 " fluid>
          <Row>
            <Col className="order-xl-2 mb-xl-0" xl="1">
              <Card className="">
                <Row className="justify-content-center">
                  <Col className="col-lg-2 col-sm-6">
                    <label className="h1 text-uppercase mt-3 ml-4">Táxi</label>
                  </Col>
                  <Col className="col-lg-2 col-sm-6" >
                    <Button
                      className="float-right mt-3 mr-4"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      {/*status user*/}
                      Ativo
                        </Button>
                  </Col>
                </Row>

                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">ABC-123</span>
                          <span className="description">Placa</span>
                        </div>
                        <div>
                          <span className="heading">11111</span>
                          <span className="description">Renavam</span>
                        </div>
                        <div>
                          <span className="heading">Wolks</span>
                          <span className="description">Marca</span>
                        </div>
                        
                      </div>
                    </div>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                          <span className="heading">ABCSDFS-123</span>
                          <span className="description">Chassi</span>
                        </div>
                        <div>
                          <span className="heading">Gol</span>
                          <span className="description">Modelo</span>
                        </div>
                        <div>
                          <span className="heading">2010</span>
                          <span className="description">Ano</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      João Batista
                    <span className="font-weight-light">, 019.176.942-44</span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Motorista Proprietário
                  </div>
                    <h3>
                      Marcos Lima
                    <span className="font-weight-light">, 019.176.942-44</span>
                    </h3>
                    <div className="description h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Motorista Auxiliar
                  </div>


                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default SearchResult;
