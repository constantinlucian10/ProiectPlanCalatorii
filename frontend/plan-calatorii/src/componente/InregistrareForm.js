import React, { Component } from 'react';
import { Redirect } from 'react-router'
import axios from 'axios';

const stareInitiala =  {
            nume:'',
            email: '',
            parola: '',
            confirmare:'',
            trimis: false,
            apiResponse: {},
            ajaxExecutat:false
        };
class InregistrareForm extends Component {
  constructor(props) {
        super(props);
        //instantiem variabilele care contin valorile din formular
        this.state =stareInitiala;
       this.ajaxUrl = 'https://proiect-plan-calatorii-constantinlucian10.c9users.io:8081';
       this.schimbaEmail = this.schimbaEmail.bind(this);
       this.schimbaNume = this.schimbaNume.bind(this);
       this.schimbaParola = this.schimbaParola.bind(this);
       this.schimbaConfirmare = this.schimbaConfirmare.bind(this);
       this.trimiteFormular = this.trimiteFormular.bind(this)
  }
  //salvam valorea campurilor
  schimbaNume(e) {
    this.setState({'nume':e.target.value});
    this.setState({'trimis':false});
  }
  schimbaEmail(e) {
    this.setState({'email':e.target.value});
    this.setState({'trimis':false});
  }
  schimbaParola(e) {
    this.setState({'parola':e.target.value});
    this.setState({'trimis':false});
  }
  schimbaConfirmare(e) {
    this.setState({'confirmare':e.target.value});
    this.setState({'trimis':false});
  }
  trimiteFormular(e) {
    e.preventDefault();
    this.setState({'trimis':true});
    if ( this.state.nume && this.state.email && this.state.parola && this.state.confirmare && (this.state.parola === this.state.confirmare)) {
     axios.post(this.ajaxUrl+'/inregistrare', this.state)
      .then(response => {
         this.setState({'apiResponse':response.data});
         this.setState({'ajaxExecutat':true});
      })
      .catch(error => {
        this.setState({'apiResponse':{eroare:true,mesaj:'A avut loc o eroare de conectiune'}});
        this.setState({'ajaxExecutat':true});
      });
    }
    
  }
  componentWillUnmount() {
    this.setState(stareInitiala)
   }
  render() {

    let ajaxResponse = null;
    if (this.state.ajaxExecutat) {
      if (this.state.apiResponse.eroare) {
        ajaxResponse = <div className="alert alert-danger" role="alert">{this.state.apiResponse.mesaj}</div>;
      } else {
        ajaxResponse = <Redirect to={{
              pathname: '/login',
              state: { registerResponse: this.state.apiResponse.mesaj }
            }} /> ;
      }
    }
    return (
      
      <form className={this.state.trimis?'was-validated':''}>
        <h2 className="text-center">Inregistrare</h2>
        <div className="form-group">
        {ajaxResponse}
          <label htmlFor="email">Nume</label>
          <input type="text" className="form-control" id="nume" aria-describedby="emailHelp" required placeholder="Adauga nume" value={this.state.nume} onChange={this.schimbaNume}/>
          {this.state.trimis && !this.state.nume &&
               <div className="invalid-feedback">Numele este necesara</div>
          }
        </div>
        <div className="form-group">
          <label htmlFor="email">Adresa de email</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" required placeholder="Adauga email" value={this.state.email} onChange={this.schimbaEmail}/>
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
        <div className="form-group">
          <label htmlFor="confirmare">Confirmare Parola</label>
          <input type="password" className={(this.state.trimis && this.state.confirmare && (this.state.parola !==  this.state.confirmar))?'is-invalid form-control':'form-control'} id="confirmare" required placeholder="Confirmare parola" value={this.state.confirmare} onChange={this.schimbaConfirmare}/>
          {this.state.trimis && !this.state.confirmare &&
               <div className="invalid-feedback">Confirmati parola</div>
          }
           {this.state.trimis && this.state.confirmare && this.state.parola !==  this.state.confirmare &&
               <small className="text-danger">Parolele nu coincid</small>
          }
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.trimiteFormular}>Inregistrare</button>
      </form>
    );
  }
}

export default InregistrareForm;
