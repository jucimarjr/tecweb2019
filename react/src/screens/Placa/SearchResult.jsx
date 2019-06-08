import React from "react";
// reactstrap components
import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Progress,
  Table,
  UncontrolledTooltip,
  Container,
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
    return (
      <>
      <Container maxWidth="sm" className="mt-4 mb-3 " fluid>
      <Search />
        <Table className="align-items-center mt-3" responsive>
          <tbody className="ml-2">
            <tr>
              <th scope="row">
                <Media className="align-items-center">
                  <Media>
                    <span className="mb-0 text-sm">
                      Renavam
                    </span>
                  </Media>
                </Media>
              </th>
              <td>
                {
                  this.props.location.taxi.dados.reg_taxi_taxi_renavam
                }
              </td>
            </tr>
            <tr>
              <th scope="row">
                <Media className="align-items-center">
                  <Media>
                    <span className="mb-0 text-sm">
                      Placa
                    </span>
                  </Media>
                </Media>
              </th>
              <td>
                  {
                    this.props.location.taxi.dados.reg_taxi_taxi_placa
                  }
              </td>
            </tr>
            <tr>
              <th scope="row">
                <Media className="align-items-center">
                  <Media>
                    <span className="mb-0 text-sm">
                      Modelo
                    </span>
                  </Media>
                </Media>
              </th>
              <td>
              {
                  this.props.location.taxi.dados.reg_taxi_taxi_modelo
                }
              </td>
            </tr>
            <tr>
              <th scope="row">
                <Media className="align-items-center">
                  <Media>
                    <span className="mb-0 text-sm">
                      Marca
                    </span>
                  </Media>
                </Media>
              </th>
              <td>
                {
                  this.props.location.taxi.dados.reg_taxi_taxi_marca
                }

              </td>
            </tr>
            <tr>
              <th scope="row">
                <Media className="align-items-center">
                  <Media>
                    <span className="mb-0 text-sm">
                      Chassi
                    </span>
                  </Media>
                </Media>
              </th>
              <td>
              {
                  this.props.location.taxi.dados.reg_taxi_taxi_chassi
                }
              </td>
            </tr>
            <tr>
              <th scope="row">
                <Media className="align-items-center">
                  <Media>
                    <span className="mb-0 text-sm">
                      Ano
                    </span>
                  </Media>
                </Media>
              </th>
              <td>
              {
                  this.props.location.taxi.dados.reg_taxi_taxi_ano
                }
              </td>
            </tr>
            <tr>
              <th scope="row">
                <Media className="align-items-center">
                  <Media>
                    <span className="mb-0 text-sm">
                      Motorista Proprietário
                    </span>
                  </Media>
                </Media>
              </th>
              <td>
              {
                  this.props.location.taxi.dados.reg_motorista_mot_nome
                }
                </td>
            </tr>
            <tr>
              <th scope="row">
                <Media className="align-items-center">
                  <Media>
                    <span className="mb-0 text-sm">
                      Motorista Auxiliar
                    </span>
                  </Media>
                </Media>
              </th>
              <td>
              {
                  this.props.location.taxi.dados.reg_motorista_mot_nome
                }
                </td>
            </tr>
            <tr>
              <th scope="row">
                <Media className="align-items-center">
                  <Media>
                    <span className="mb-0 text-sm">
                      Status
                    </span>
                  </Media>
                </Media>
              </th>
              <td>
              {
                  this.props.location.taxi.dados.reg_taxi_taxi_status == 0 ? 'Ativo' : 'Inativo'
                }
                </td>
            </tr>
          </tbody>
        </Table>
        </Container>
      </>
    );
  }
}

export default SearchResult