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

class ListPermissoes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      permissions: [],
      pageOfItems: []
  
    }
    this.onChangePage = this.onChangePage.bind(this)
    this.onclick = this.onclick.bind(this)
    this.onDismiss = this.onDismiss(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.editpermission = this.editpermission.bind(this)
    //this.deletePermission = this.deletePermission.bind(this)

  }

  componentDidMount() {
    fetch('/permissions')
    .then(res => res.json())
    .then((data) => {
      this.permissionsObjetos = data
      this.setState({ permissions: data.data,
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
    if (this.taxi !== '') {
        const data = this.state.permissions.filter(permission => {
              return permission.taxi.toLowerCase().indexOf(this.taxi.toLowerCase()) !== -1;})
        if (data.length !== 0 ){
            this.setState({ permissions: data})
        }
    }else{
      this.setState({permissions: this.permissionsObjetos.data})
    }
  
  }

  onDismiss() {
    this.setState({ visible: false ,
                    message: ''
    });
  }

  editpermission(e)  {
    
    const data = this.state.permissions.filter(permission => {
      return permission.taxi.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1; 
    })
    this.props.history.push({
      pathname: '/permission/edit-permission',
      state: { permissionEdit: data[0]}

    })

  }

  
  deletepermission(e) {
    console.log(e.target.value)
      const data = { taxi: e.target.value };
      const requestInfo = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: new Headers({
              'Content-Type': 'application/json'
          }),
      };
  
      fetch('/permission/delete', requestInfo)
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
                              pathname: '/permission/list-permission',
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
    const permissions  = this.state.pageOfItems.map((item, key) =>
                 <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">
                            {item.taxi}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{item.motorista}</td>
                      <td>
                      <td>{item.data_inicio}</td>
                      </td>
                      <td>{item.data_fim}</td>
                      <td>{item.tipo}</td>
                      <td> {
                            item.status ? ( 
                              <Badge color="primary" pill>
                                Ativo
                              </Badge>

                            ) : (
                              <Badge color="danger" pill>
                                Inativo
                            </Badge>
                          )}</td>

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
                              onClick={this.editpermission}
                            >
                              Editar
                            </DropdownItem>
                            <DropdownItem
                              onClick={this.deletepermission} value={item.taxi}
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
                    <h3 className="mb-0">Buscar Autorizações</h3>
                    </FormGroup>
                  </Col>
                  <Col md="5">
                   
                  <FormGroup>
                      <InputGroup className="input-group-alternative">
                      <Input placeholder="Placa" type="text" onChange={e => this.taxi = e.target.value}  />
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
                          href="/permissoes/add-permission"
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
                    <th scope="col">PLACA</th>
                    <th scope="col">MOTORISTA</th>
                    <th scope="col">DATA INÍCIO</th>
                    <th scope="col">DATAN FIM</th>
                    <th scope="col">TIPO</th>
                    <th scope="col">STATUS</th>
                    <th scope="col" className="text-right">AÇÃO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions}
                  </tbody>
                </Table>
                <CardFooter>
                 <Pagination items={this.state.permissions} 
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

export default ListPermissoes;