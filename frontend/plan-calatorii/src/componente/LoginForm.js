import React, { Component } from 'react';
import { Redirect } from 'react-router'
import axios from 'axios';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        //instantiem variabilele care contin valorile din formular
        this.state = {
            email: '',
            parola: '',
            trimis: false,
            erori:'',
            apiResponse:{},
            ajaxExecutat:false
        };
       this.ajaxUrl = 'https://proiect-plan-calatorii-constantinlucian10.c9users.io:8081';
       this.schimbaEmail = this.schimbaEmail.bind(this);
       this.schimbaParola = this.schimbaParola.bind(this);
       this.trimiteFormular = this.trimiteFormular.bind(this)
  }
  //salvam valorea campurilor
  schimbaEmail(e) {
    this.setState({'email':e.target.value});
    this.setState({'trimis':false});
  }
  schimbaParola(e) {
    this.setState({'parola':e.target.value});
    this.setState({'trimis':false});
  }
  trimiteFormular(e) {
  e.preventDefault();
  this.setState({'trimis':true});
  if ( this.state.email && this.state.parola) {
     axios.post(this.ajaxUrl+'/login', this.state)
      .then(response => {
         this.setState({'apiResponse':response.data});
         this.setState({'ajaxExecutat':true});
         if(response.data.token) {
           window.localStorage.setItem('login_token',response.data.token);
         }
      })
      .catch(error => {
        this.setState({'apiResponse':{eroare:true,mesaj:'A avut loc o eroare de conectiune'}});
        this.setState({'ajaxExecutat':true});
      });
  }
    
  }
  render() {
     let ajaxResponse = null;
    if (this.state.ajaxExecutat) {
      if (this.state.apiResponse.eroare) {
        ajaxResponse = <div className="alert alert-danger" role="alert">{this.state.apiResponse.mesaj}</div>;
      } else {
        ajaxResponse = <Redirect to={{
              pathname: '/',
              state: { registerResponse: this.state.apiResponse.mesaj }
            }} /> ;
      }
    }
    return (
      <form className={this.state.trimis?'was-validated':''}>
        <h2 className="text-center">Login</h2>
        {this.props.prevState && this.props.prevState.registerResponse && 
          <div className="alert alert-success" role="alert">{this.props.prevState.registerResponse}</div>
        }
        {ajaxResponse}
        <div className="form-group">
          <label htmlFor="email">Adresa de email</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" required placeholder="Adauga email"  value={this.state.email} onChange={this.schimbaEmail}/>
          {this.state.trimis && !this.state.email &&
               <div className="invalid-feedback">O adresa de email este necesara</div>
          }
        </div>
        <div className="form-group">
          <label htmlFor="parola">Parola</label>
          <input type="password" className="form-control" id="parola" placeholder="Parola" required value={this.state.parola} onChange={this.schimbaParola}/>
          {this.state.trimis && !this.state.parola &&
               <div className="invalid-feedback">O parola este necesara</div>
          }
        </div>

        <button type="submit" className="btn btn-primary" onClick={this.trimiteFormular}>Login</button>
      </form>
    );
  }
}

export default LoginForm;
