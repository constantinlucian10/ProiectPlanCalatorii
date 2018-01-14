import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ListaCalatorii from './ListaCalatorii';
import Vremea from './Vremea';

class ListaPlanuri extends Component {
  constructor(props) {
        const initState = {
            apiResponse: null,
            ajaxExecutat:false
        };
        super(props);
       this.state = initState;
       this.ajaxUrl = 'https://proiect-plan-calatorii-constantinlucian10.c9users.io:8081';
      
  }
  componentDidMount() {
    axios.post(this.ajaxUrl+'/plan-calatorie/',
    {authToken:window.localStorage.getItem('login_token')?window.localStorage.getItem('login_token'):false
      
    })
      .then(response => {
         this.setState({'apiResponse':response.data});
         this.setState({'ajaxExecutat':true});
      })
      .catch(error => {
        this.setState({'apiResponse':{eroare:true,mesaj:'A avut loc o eroare de conectiune'}});
        this.setState({'ajaxExecutat':true});
      });
  }
  render() {
    let mesaj = null;
    if (this.props.location.state && this.props.location.state.createResponse) {
      mesaj  = <div className="alert alert-success col-lg-12" role="alert">{this.props.location.state.createResponse}</div>
    }
    return (
      
      <div className="container">
      <div className="row">
      <h2 className="col-lg-12">Jurnal Calatorii</h2>
      {mesaj}
      {this.state.apiResponse && this.state.apiResponse.eroare &&
      <div className="alert alert-warning col-lg-12" role="alert">{this.state.apiResponse.mesaj}</div>
      }
      <Link className="float-lg-right btn btn-primary" to="/plan-calatorie/adauga">Adauga Plan Calatorie</Link>
      {this.state.apiResponse && this.state.apiResponse.rezultat &&
      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-4">
          <h3>Calatoriile mele</h3>
            <ListaCalatorii calatorii={this.state.apiResponse.rezultat.proprii} proprii={true}/>
          </div>
          <div className="col-lg-4">
          <h3>Calatoriile celorlalti</h3>
            <ListaCalatorii calatorii={this.state.apiResponse.rezultat.utilizatorii} proprii={false}/>
          </div>
          <div className="col-lg-4">
          <h3>Vremea</h3>
            <Vremea/>
          </div>
        </div>
      </div>
      }
      </div>
      </div>
    );
  }
}

export default ListaPlanuri;
