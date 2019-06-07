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

import Search from "screens/Placa/Search.jsx";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      driver: {}

    };
  }

  render() {


    {
      console.log(this.props)
    }
    return (
      <>
        <Container className="mt-4 mb-3 " fluid>
          <Search />
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
                    {
                      this.props.location.taxi.dados.reg_taxi_taxi_status == 0 ? 'Ativo' : 'Inativo'
                    }
                    </Button>
                  </Col>
                </Row>

                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">
                            {
                              this.props.location.taxi.dados.reg_taxi_taxi_placa
                            }
                          </span>
                          <span className="description">Placa</span>
                        </div>
                        <div>
                          <span className="heading">
                            {
                              this.props.location.taxi.dados.reg_taxi_taxi_renavam
                            }
                          </span>
                          <span className="description">Renavam</span>
                        </div>
                        <div>
                          <span className="heading">
                          {
                              this.props.location.taxi.dados.reg_taxi_taxi_marca
                          }
                          </span>
                          <span className="description">Marca</span>
                        </div>
                        
                      </div>
                    </div>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                          <span className="heading">
                          {
                              this.props.location.taxi.dados.reg_taxi_taxi_chassi
                          }
                          </span>
                          <span className="description">Chassi</span>
                        </div>
                        <div>
                          <span className="heading">
                          {
                              this.props.location.taxi.dados.reg_taxi_taxi_modelo
                          }
                          </span>
                          <span className="description">Modelo</span>
                        </div>
                      </div>
                      
                    </div>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                          <span className="heading">
                          {
                              this.props.location.taxi.dados.reg_taxi_taxi_ano
                          }
                          </span>
                          <span className="description">Ano</span>
                      </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      {
                        this.props.location.taxi.dados.reg_motorista_mot_nome
                      }
                    <span className="font-weight-light">, 
                      {
                        this.props.location.taxi.dados.reg_motorista_mot_cpf
                      }
                    </span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                        Motorista Principal
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
