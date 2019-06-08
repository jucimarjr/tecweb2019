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
  Container,
  Button,
  Card,
  CardBody
  
} from "reactstrap";
import Header from "components/User/NavBar/UserNavBar.jsx";
import SearchResult from "screens/Placa/SearchResult.jsx";

class Forms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        message : '',
        status: '',
        result: '',
        driver: {}

    };
}

  search = () => {
    const data = { 
                  taxi: this.taxi,
                  
                };
    const requestInfo = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    };

    fetch('/perm/info', requestInfo)
            .then(response => {
                if(response.ok) {
                    return response.json()
                }
                throw new Error("...");
            })
            .then(resposta => {
                if (resposta.status == 200) {
                  //console.log(resposta.data)
                  this.setState({message: resposta.message
                  })
                  this.setState({driver: resposta.data[0]})
                  this.props.history.push({
                            pathname: '/placa/search-result',
                            taxi: { message: resposta.message, dados: resposta.data[0]}

                  })
                  
                }else {
                    this.setState({message: resposta.message})
                }

              
            })
            .catch(e => {
                this.setState({ message: e.message });
            });


  }

  onclick = () => {
    console.log(this.taxi)

  }
  onChangePage(result) {
    // update state with new page of items
    this.setState({ result: result });
  }
  

  render() {
    
    //const renderSearch = <SearchResult taxi= {this.state.driver} />
    
    return (
      <>
      <Container >
      <div className="">
        <form className="mt-4 mb-3">
            <div className="input-group-rounded input-group-merge input-group">
            <InputGroup className="input-group-alternative">
            <Input placeholder="Digite a placa" type="text"  onChange={e => this.taxi = e.target.value}  />
            <Button className="btn-icon btn-3" color="primary" type="button" onClick={this.search}>
                Procurar
              </Button>
            </InputGroup>
              
            </div>
        </form>
        </div>
        </Container>
        
      </>
    );
  }
}

export default Forms;
