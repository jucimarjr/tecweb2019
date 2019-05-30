import React from "react";

// reactstrap components
import {
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container
} from "reactstrap";

import SearchResult from "screens/User/SearchResult.jsx";

class Forms extends React.Component {
  render() {
    return (
      <>
      <Container>
        <form className="mt-4 mb-3 d-md-none">
          <div className="input-group-rounded input-group-merge input-group">
            <input aria-label="Search" placeholder="Digite a placa" type="search" className="form-control-rounded form-control-prepended form-control"/>
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span className="fa fa-search"></span>
              </span>
            </div>
          </div>
        </form>
        </Container>
        <SearchResult />
      </>
    );
  }
}

export default Forms;
