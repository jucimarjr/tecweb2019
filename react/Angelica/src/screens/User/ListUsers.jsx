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
  FormGroup,
  InputGroup,
  Input,
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
    this.onChangePage = this.onChangePage.bind(this)
    this.onclick = this.onclick.bind(this)
    this.onDismiss = this.onDismiss(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.edituser = this.edituser.bind(this)
    

  }

  componentDidMount() {
    fetch('/users')
    .then(res => res.json())
    .then((data) => {
      this.usersObjetos = data
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


  onclick = () => {
    if (this.cpf !== '') {
        const data = this.state.users.filter(user => {
              return user.cpf.toLowerCase().indexOf(this.cpf.toLowerCase()) !== -1;})
        if (data.length !== 0 ){
            this.setState({ users: data})
        }
    }else{
      this.setState({users: this.usersObjetos.data})
    }
  
  }

  onDismiss() {
    this.setState({ visible: false ,
                    message: ''
    });
  }

  edituser(e)  {
    
    const data = this.state.users.filter(user => {
      return user.cpf.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1; 
    })
    this.props.history.push({
      pathname: '/user/edit-user',
      state: { userEdit: data[0]}

    })

  }

  deleteuser(e) {
      const data = { placa: e.target.value };
      const requestInfo = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: new Headers({
              'Content-Type': 'application/json'
          }),
      };
  
      fetch('/user/delete', requestInfo)
              .then(response => {
                  if(response.ok) {
                      return response.json()
                  }
                  throw new Error("...");
              })
              .then(resposta => {
                console.log(resposta)
                  if (resposta) {
                    this.setState({message: resposta.message
                    })
                    this.props.history.push({
                              pathname: '/user/list-user',
                              state: { message: resposta.message}
                    })
                  }else {
                      this.setState({message: resposta.message})
                  }
              })
              .catch(e => {
              });
  
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
                              onClick={this.edituser}
                            >
                              Editar
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Desativar
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
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent border-0">
                  <Row>
                  <Col md="3">
                  <FormGroup>
                    <h3 className="mb-0">Buscar Usuários</h3>
                    </FormGroup>
                  </Col>
                  <Col md="5">
                   
                  <FormGroup>
                      <InputGroup className="input-group-alternative">
                      <Input placeholder="CPF" type="text" onChange={e => this.cpf = e.target.value}  />
                      <Button className="btn-icon btn-3" color="primary" type="button" onClick={this.onclick}>
                          Procurar
                      </Button>
                      </InputGroup>
                    </FormGroup>
                    
                  </Col>
                  <Col  md="4">
                  <Button className="btn-icon btn-2" 
                          color="primary" 
                          type="button" 
                          className="float-right"
                          href="/user/add-user"
                    >
                          <span className="btn-inner--icon">
                            <i className="ni ni-fat-add" />
                          </span>
                    </Button>
                  </Col>
                </Row>
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