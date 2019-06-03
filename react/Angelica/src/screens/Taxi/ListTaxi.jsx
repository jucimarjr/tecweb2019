import React from "react";


// reactstrap components
import {
  Badge,
  Card,
  Button,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  FormGroup,
  UncontrolledTooltip,
  InputGroupText,
  InputGroupAddon,
  InputGroup,
  Input,




} from "reactstrap";
// core components
import Header from "components/Taxi/Headers/Header.jsx";
import Pagination from "components/Admin/Pagination/Pagination.jsx"
  
const customLabels = {

      first: '<<',
      last: '>>',
      previous: '<',
      next: '>'
  
};

const customStyle = {
  cursor: "Pointer"

};


class ListTaxi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taxis: [],
      pageOfItems: []
  
    }
    this.onChangePage = this.onChangePage.bind(this);

  }

  
  

  componentDidMount() {
    fetch('/taxis')
    .then(res => res.json())
    .then((data) => {
      this.setState({ taxis: data.data,
                      pageOfItems: []
       })
    }
    
    )
    .catch(console.log)

  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  




  render() {
      const taxis  = this.state.pageOfItems.map((item, key) =>
                 <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                            {item.placa}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{item.marca}</td>
                      <td>{item.modelo}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          Inativo
                        </Badge>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Adicionar
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Editar
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Excluir
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                </tr>
      )
    
    

    return (
      <>
     
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <h3 className="mb-0">Buscar Táxi</h3>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-search" /> 
                          </InputGroupText>
                        </InputGroupAddon>
                      <Input placeholder="Placa" type="text" />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <Button className="btn-icon btn-2" color="primary" type="button" className="float-right">
                          <span className="btn-inner--icon">
                            <i className="ni ni-fat-add" />
                          </span>
                    </Button>
                  </Col>
                </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">PLACA</th>
                      <th scope="col">PROPRIETÁRIO</th>
                      <th scope="col">AUXILIAR</th>
                      <th scope="col">STATUS</th>
                      <th scope="col" className="text-right">AÇÃO</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                      {taxis}
                  </tbody>
                </Table>
                <CardFooter>
                 <Pagination items={this.state.taxis} onChangePage={this.onChangePage} customStyle={customElements.style} customLabels={customLabels} />
                </CardFooter>
              </Card>
             

            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default ListTaxi;
