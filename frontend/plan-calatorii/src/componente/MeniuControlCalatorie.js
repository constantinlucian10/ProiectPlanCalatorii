import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';

class ItemCalatorie extends React.Component {
 constructor(props) {
        super(props);
        //instantiem variabilele care contin valorile din formular
        this.state = {
           apiResponse:{},
           ajaxExecutat:false
        };
       this.ajaxUrl = 'https://proiect-plan-calatorii-constantinlucian10.c9users.io:8081';
       this.stergeCalatorie = this.stergeCalatorie.bind(this)
  } 
  stergeCalatorie(e) {
  this.setState({'trimis':true});
     axios.delete(this.ajaxUrl+'/plan-calatorie/'+this.props.calatorie.id+'/sterge',{params: {authToken:window.localStorage.getItem('login_token')?window.localStorage.getItem('login_token'):false}})
      .then(response => {
          console.log(response)
         this.setState({'apiResponse':response.data});
         this.setState({'ajaxExecutat':true});
      })
      .catch(error => {
        this.setState({'apiResponse':{eroare:true,mesaj:'A avut loc o eroare de conectiune'}});
        this.setState({'ajaxExecutat':true});
      });

    
  }
  render() {
      let calatorie = this.props.calatorie;
      let proprii = this.props.proprii;
      let link = '/plan-calatorie/'+calatorie.id+'/modifica';
      if (this.state.apiResponse.sters) {
          return (
          <Redirect to={{
              pathname: '/plan-calatorie',
              state: { createResponse: this.state.apiResponse.mesaj }
            }} /> 
            );
      } else {
          return (
              
             <div>
             {this.state.apiResponse.eroare &&
              <div className="alert alert-danger" role="alert">{this.state.apiResponse.mesaj}</div>
              }
              <li className="list-group-item">
                 <div className="row">
                  <div className="col-lg-4">
                    {calatorie.utilizatori.nume}
                  </div>
                  <div className="col-lg-8">
                  <h4>{calatorie.tara}, {calatorie.orase}, {calatorie.an}, {calatorie.durata}</h4>
                  <p>{calatorie.review}</p>
                  {proprii && 
                  <div>
                  <Link className="float-xs-left" to={{ pathname: link, state: {calatorie} }}>
                    <button type="button" className="btn btn-ok">modifica</button>
                  </Link>
                  <button type="button" className="btn btn-danger" onClick={this.stergeCalatorie}>sterge</button>
                  </div>
                  }
                  </div>
                  </div>
                 </li>
                 
                  
            </div>
          )
      } 
      
  }
       
  }
export default ItemCalatorie;