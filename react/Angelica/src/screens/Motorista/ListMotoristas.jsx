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

import Header from "components/Login/Headers/UserHeader.jsx";

class Tables extends React.Component {
  render() {
    return (
      <>
        {/* <Header /> */}
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
                      href="adicionar"
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
                    <tr>
                      <th scope="row">
                        <span className="mb-0 text-sm">
                          123.456.789-10
                        </span>
                      </th>
                      <td>
                        <span className="mb-0 text-sm">
                          1234567-8
                        </span></td>
                      <td>
                        <span className="mb-0 text-sm">
                          João da Silva
                        </span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm">
                          AM123456789
                        </span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm">
                          (92) 91234-5678
                        </span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm">
                          Ativo
                        </span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm">
                          69123-456
                        </span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm">
                          Rua Tiradentes
                        </span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm">
                          Aleixo
                        </span>
                      </td>
                      <td className="text-right">
                        <Button
                          color="primary"
                          href="editar"
                          // onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          Editar
                      </Button>
                      </td>
                    </tr>
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

export default Tables;