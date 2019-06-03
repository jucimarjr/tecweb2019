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
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";
// core components

import axios from 'axios';

import Header from "components/Login/Headers/UserHeader.jsx";


class ListMotorista extends React.Component {

  constructor() {
    super();

    
    this.state = {
      motoristas: [],
    }
  }

  componentDidMount() {

    const requestInfo = {
      method: 'GET',
      crossDomain:true,
      // mode: 'no-cors',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', 'accept':'application/json' }
    };
    axios.get(`http://191.252.184.28/drivers`,{ headers: requestInfo})
    .then(res => {
      console.log(res)
      // const persons = res.data;
      // this.setState({ persons }
    });
    // fetch('http://191.252.184.28/drivers').then(results =>  console.log(results)).catch( r => console.log)
    // fetch('https://randomuser.me/api/?results=10', requestInfo).then(results =>  console.log(results))//.then(data => {
      // let motoristas = data.results.map((drive) => {
      //   return (
      //     <tr>
      //       <th scope="row">
      //         <span className="mb-0 text-sm">
      //           drive.cpf
      //         </span>
      //       </th>
      //       <td>
      //         <span className="mb-0 text-sm">
      //           drive.rg
      //         </span></td>
      //       <td>
      //         <span className="mb-0 text-sm">
      //           drive.nome
      //         </span>
      //       </td>
      //       <td>
      //         <span className="mb-0 text-sm">
      //           drive.renach
      //         </span>
      //       </td>
      //       <td>
      //         <span className="mb-0 text-sm">
      //           drive.telefone
      //         </span>
      //       </td>
      //       <td>
      //         <span className="mb-0 text-sm">
      //           drive.cep
      //         </span>
      //       </td>
      //       <td>
      //         <span className="mb-0 text-sm">
      //           drive.rua
      //         </span>
      //       </td>
      //       <td>
      //         <span className="mb-0 text-sm">
      //           drive.bairro
      //         </span>
      //       </td>
      //       <td className="text-right">
      //         <Button
      //           color="primary"
      //           href="edit-motorista"
      //           // onClick={e => e.preventDefault()}
      //           size="sm"
      //         >
      //           Editar
      //                 </Button>
      //       </td>
      //     </tr>
      //   )
      // })
    //   this.setState({motoristas: data});
    //   console.log("Motoristas", this.state.motoristas);
    // })
  }


  render() {
    return (
      <>
        {/* <Header /> */}
        <Header />
        {/* Page content */}
        <Container className="mt-3" fluid>
          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="shadow">
                <CardHeader className="bg-transparent border-0">
                  <Col xs="8">
                    <h3 className="mb-0">Buscar Motoristas</h3>
                  </Col>
                  <Col className="text-right" xs="12">
                    <Button
                      color="primary"
                      href="add-motorista"
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
                      <th scope="col">RG</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Renach</th>
                      <th scope="col">Telefone</th>
                      <th scope="col">Status</th>
                      <th scope="col">CEP</th>
                      <th scope="col">Rua</th>
                      <th scope="col">Bairro</th>
                      <th scope="col">Editar</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.motoristas}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default ListMotorista;