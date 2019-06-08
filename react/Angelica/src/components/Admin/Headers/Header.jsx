import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

class Header extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    taxis: []
};
  this.componentDidMount =  this.componentDidMount.bind(this)

}

  componentDidMount() {
      fetch('/taxis')
      .then(res => res.json())
      .then((data) => {
        
          this.setState({ taxis: data.data})
        }
      ).catch(console.log)
      fetch('/drivers')
      .then(res => res.json())
      .then((data) => {
        
          this.setState({ drivers: data.data.length})
        }
      ).catch(console.log)
     
      fetch('/users')
      .then(res => res.json())
      .then((data) => {
          this.setState({ users: data.data.length})
        }
      ).catch(console.log)
  }

  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Táxis
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.taxis.length}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </Col>
                      </Row>
                      
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Usuários
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {this.state.users}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                      
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Motoristas
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          {this.state.drivers}

                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                     
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
