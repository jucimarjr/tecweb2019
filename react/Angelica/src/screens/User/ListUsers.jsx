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
                    <th scope="col">Nome</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="text-right">Editar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <span className="mb-0 text-sm">
                          132.458.155-02
                        </span>
                      </th>
                      <td>
                        <span className="mb-0 text-sm">
                          Márcio Karl Moh
                        </span>
                      </td>
                      <td>
                        <span className="mb-0 text-sm">
                          Ativo
                        </span>
                      </td>
                      <td className="text-right">
                      <Button
                        color="primary"
                        href="edit-user"
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