import React from "react";

// reactstrap components
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Col,
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
  UncontrolledTooltip
} from "reactstrap";
// core components

import Header from "components/Login/Headers/UserHeader.jsx";
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

class ListUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      pageOfItems: []
  
    }
    this.onChangePage = this.onChangePage.bind(this);

  }

  componentDidMount() {
    fetch('/users')
    .then(res => res.json())
    .then((data) => {
      this.setState({ users: data.data,
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
    const users  = this.state.pageOfItems.map((item, key) =>
                 <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                            {item.cpf}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{item.nome}</td>
                      <td>
                      
                          {
                            item.status ? ( 
                              <Badge color="primary" pill>
                                Ativo
                              </Badge>

                            ) : (
                              <Badge color="danger" pill>
                                Inativo
                            </Badge>
                          )}  
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
      <Header/>
        {/* <Header /> */}
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent border-0">
                  <Col xs="8">
                    <h3 className="mb-0">Buscar Usuários</h3>
                  </Col>
                  <Col className="text-right" xs="12">
                    <Button
                        color="primary"
                        href="add-user"
                        // onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Cadastrar
                      </Button>
                  </Col>
                </CardHeader>
                <Table
                  className="align-items-center table-flush"
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                    <th scope="col">CPF</th>
                    <th scope="col">NOME</th>
                    <th scope="col">STATUS</th>
                    <th scope="col" className="text-right">AÇÃO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users}
                  </tbody>
                </Table>
                <CardFooter>
                 <Pagination items={this.state.users} 
                              onChangePage={this.onChangePage} 
                              customStyle={customElements.style} 
                              customLabels={customLabels} />
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default ListUsers;