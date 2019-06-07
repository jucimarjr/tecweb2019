import React from "react";
import {
  withRouter
} from 'react-router-dom'



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
  Alert,
  Col,
  FormGroup,
  UncontrolledTooltip,
  InputGroupText,
  InputGroupAddon,
  InputGroup,
  Input,
  UncontrolledAlert




} from "reactstrap";
// core components
import Header from "components/Login/Headers/UserHeader.jsx";
import Pagination from "components/Admin/Pagination/Pagination.jsx"
  

class ListTaxi extends React.Component {
  constructor(props) {
    super(props)
    this.placa = ''
    this.taxisObjetos = ''
    this.state = {
      taxis: [],
      pageOfItems: [],
      message: '',
      visible: false,
      message: ''


    }
    this.onChangePage = this.onChangePage.bind(this)
    this.onclick = this.onclick.bind(this)
    this.onDismiss = this.onDismiss(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.editTaxi = this.editTaxi.bind(this)
    
      
  }

  componentDidMount() {
      fetch('/taxis')
      .then(res => res.json())
      .then((data) => {
        this.taxisObjetos = data
        this.setState({ taxis: data.data,
                         pageOfItems: []

        })
        
        if (this.props.location.state.message !== '' ) {
          this.setState({message: this.props.location.state.message,                        
                         visible:  true
                        })
          
        }
        console.log(this.props.location.state.message)
        


      }
    ) 
      .catch(console.log)
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }
  
  onclick = () => {
    if (this.placa !== '') {
        const data = this.state.taxis.filter(taxi => {
        return taxi.placa.toLowerCase().indexOf(this.placa.toLowerCase()) !== -1;
      })

      if (data.length !== 0 ){
        this.setState({ taxis: data})
      }

    }else{
      this.setState({taxis: this.taxisObjetos.data})
    }
  
  }

  onDismiss() {
    this.setState({ visible: false ,
                    message: ''
    });
  }

  editTaxi(e)  {
    
    const data = this.state.taxis.filter(taxi => {
      return taxi.placa.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1; 
    })
    this.props.history.push({
      pathname: '/taxi/edit-taxi',
      state: { taxiEdit: data[0]}

    })

  }

  deleteTaxi(e) {
      const data = { placa: e.target.value };
      const requestInfo = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: new Headers({
              'Content-Type': 'application/json'
          }),
      };
  
      fetch('/taxi/delete', requestInfo)
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
                              pathname: '/taxi/list-taxi',
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
      const renderTaxis  = this.state.pageOfItems.map( item  =>
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
                      <td>{item.ano}</td>
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
                            <DropdownItem onClick={this.editTaxi} value={item.placa} >
                              Editar
                            </DropdownItem>
                            <DropdownItem
                              onClick={this.deleteTaxi} value={item.placa}
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
     
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
            {
                    this.state.message !== ''? (
                      <UncontrolledAlert    color="success" fade={false}>
                      <span className="alert-inner--icon">
                        <i className="ni ni-like-2" />
                      </span>{" "}
                      <span className="alert-inner--text">
                        <strong>Success!</strong> {this.state.message}
                      </span>
                      </UncontrolledAlert>
                    ) : ''
                    
            }
              <Card className="shadow">
             
                <CardHeader className="border-0">
                <Row>
               
                  <Col md="3">
                    <FormGroup>
                      <h3 className="mb-0">Buscar Táxi</h3>
                    </FormGroup>
                  </Col>
                  <Col md="5">
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                      <Input placeholder="Placa" type="text"  onChange={e => this.placa = e.target.value}  />
                      <Button className="btn-icon btn-3" color="primary" type="button" onClick={this.onclick}>
                          Procurar
                        </Button>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <Button className="btn-icon btn-2" 
                          color="primary" 
                          type="button" 
                          className="float-right"
                          href="/taxi/addtaxi"
                    >
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
                      <th scope="col">MARCA</th>
                      <th scope="col">MODELO</th>
                      <th scope="col">Ano</th>
                      <th scope="col">STATUS</th>
                      <th scope="col" className="text-right">AÇÃO</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                      {renderTaxis}
                  </tbody>
                </Table>
                <CardFooter>
                 <Pagination items={this.state.taxis} 
                              onChangePage={this.onChangePage} 
                             />
                </CardFooter>
              </Card>
             

            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(ListTaxi);
