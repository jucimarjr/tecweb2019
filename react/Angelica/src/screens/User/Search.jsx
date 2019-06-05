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
  
} from "reactstrap";
import Header from "components/Taxi/Headers/Header.jsx";
import SearchResult from "screens/User/SearchResult.jsx";

class Forms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        message : '',
        status: ''

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
                if (resposta) {
                  this.setState({message: resposta.message
                  })
                  this.props.history.push({
                            pathname: '/user/search-result',
                            state: { message: resposta.message}

                  })
                  
                }else {
                    this.setState({message: resposta.message})
                }
            })
            .catch(e => {
                this.setState({ message: e.message });
            });


  }
  

  render() {
    
      const renderSearch = <Container>
      {
        this.state.status == '200' ? (
          
          console.log("ok")
        ) :

        this.state.status !== '' && this.state.status !== '200' ? (
          console.log("erro")
        ) : ''
      }
      <SearchResult />
       
        </Container>
      
    

    return (
      <>
      
      <form className="mt-4 mb-3 d-md-none">
          <div className="input-group-rounded input-group-merge input-group">
          <InputGroup className="input-group-alternative">
          <Input placeholder="Placa" type="text"  onChange={e => this.taxi = e.target.value}  />
          <Button className="btn-icon btn-3" color="primary" type="button" onClick={this.search}>
              Procurar
            </Button>
          </InputGroup>
            
          </div>
        </form>
        
    </>

    );

    
  }
}

export default Forms;
