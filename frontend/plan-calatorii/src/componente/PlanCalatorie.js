import React, { Component } from 'react';
import { Redirect } from 'react-router'
import axios from 'axios';

class PlanCalatorie extends Component {
    constructor(props) {
        const initState = {
            tara: '',
            orase: '',
            an:'',
            durata:'',
            id:'',
            review:'',
            trimis: false,
            erori:'',
            apiResponse:{},
            authToken:window.localStorage.getItem('login_token')?window.localStorage.getItem('login_token'):false,
            ajaxExecutat:false,
            modificare:false
        };
        super(props);
        //instantiem variabilele care contin valorile din formular
        this.state = initState;
       this.ajaxUrl = 'https://proiect-plan-calatorii-constantinlucian10.c9users.io:8081';
       this.schimbaTara = this.schimbaTara.bind(this);
       this.schimbaDurata = this.schimbaDurata.bind(this);
       this.schimbaAn = this.schimbaAn.bind(this);
       this.schimbaOrase = this.schimbaOrase.bind(this);
       this.schimbaReview = this.schimbaReview.bind(this);
       this.trimiteFormular = this.trimiteFormular.bind(this);
       this.trimiteModificare = this.trimiteModificare.bind(this);
  }
  //salvam valorea campurilor
  schimbaTara(e) {
    this.setState({'tara':e.target.value});
    this.setState({'trimis':false});
  }
    schimbaAn(e) {
    this.setState({'an':e.target.value});
    this.setState({'trimis':false});
  }
    schimbaDurata(e) {
    this.setState({'durata':e.target.value});
    this.setState({'trimis':false});
  }
  schimbaOrase(e) {
    this.setState({'orase':e.target.value});
    this.setState({'trimis':false});
  }
  schimbaReview(e) {
    this.setState({'review':e.target.value});
    this.setState({'trimis':false});
  }
  trimiteFormular(e) {
  e.preventDefault();
  this.setState({'trimis':true});
  
  if ( this.state.tara && this.state.orase && this.state.an && this.state.durata && this.state.review) {
     axios.post(this.ajaxUrl+'/plan-calatorie/adauga', this.state)
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
  trimiteModificare(e) {
  e.preventDefault();
  this.setState({'trimis':true});
  
  if ( this.state.tara && this.state.orase && this.state.an && this.state.durata && this.state.review) {
     axios.put(this.ajaxUrl+'/plan-calatorie/'+this.state.id+'/modifica', this.state)
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
  componentDidMount() {
      let calatorie = this.props.modificaCalatoria;
      if (calatorie) {
            this.setState({'id':calatorie.id});
            this.setState({'tara':calatorie.tara});
            this.setState({'an':calatorie.an});
            this.setState({'durata':calatorie.durata});
            this.setState({'orase':calatorie.orase});
            this.setState({'review':calatorie.review});
            this.setState({'modificare':true});
          
      }

  }
  render() {
     let ajaxResponse = null;
    if (this.state.ajaxExecutat) {
      if (this.state.apiResponse.eroare) {
        ajaxResponse = <div className="alert alert-danger" role="alert">{this.state.apiResponse.mesaj}</div>;
      } else {
        ajaxResponse = <Redirect to={{
              pathname: '/plan-calatorie',
              state: { createResponse: this.state.apiResponse.mesaj }
            }} /> ;
      }
    }
    return (
      <form className={this.state.trimis?'was-validated  container':'container'}>
        <h2 className="text-center">Plan Calatorie</h2>
        {ajaxResponse}
        <div className="row">
        <div className="form-group col-lg-3">
          <label htmlFor="tara">Tara</label>
          <input type="text" className="form-control" id="tara" aria-describedby="emailHelp" required placeholder="Adauga tara"  value={this.state.tara} onChange={this.schimbaTara}/>
          {this.state.trimis && !this.state.tara &&
               <div className="invalid-feedback">O tara este necesara</div>
          }
        </div>
        <div className="form-group col-lg-3">
          <label htmlFor="orase">Orase Vizitate</label>
          <input type="text" className="form-control" id="orase" aria-describedby="emailHelp" required placeholder="Adauga orase"  value={this.state.orase} onChange={this.schimbaOrase}/>
          {this.state.trimis && !this.state.orase &&
               <div className="invalid-feedback">Un oras este necesar</div>
          }
        </div>
         <div className="form-group col-lg-3">
          <label htmlFor="an">An calatorie</label>
          <input type="text" className="form-control" id="an" aria-describedby="emailHelp" required placeholder="Adauga an"  value={this.state.an} onChange={this.schimbaAn}/>
          {this.state.trimis && !this.state.tara &&
               <div className="invalid-feedback">Un an este necesar</div>
          }
        </div>
         <div className="form-group col-lg-3">
          <label htmlFor="durata">Durata(zile)</label>
          <input type="number" className="form-control" id="durata" aria-describedby="emailHelp" required placeholder="Adauga durata"  value={this.state.durata} onChange={this.schimbaDurata}/>
          {this.state.trimis && !this.state.durata &&
               <div className="invalid-feedback">Durata este necesara</div>
          }
        </div>
        <div className="form-group col-lg-12">
          <label htmlFor="review">Review</label>
          <textarea className="form-control" id="review" aria-describedby="emailHelp" required placeholder="Adauga review" onChange={this.schimbaReview} value={this.state.review}></textarea>
          {this.state.trimis && !this.state.review &&
               <div className="invalid-feedback">Review este necesar</div>
          }
        </div>
        </div>
        {!this.state.modificare &&
        <button type="submit" className="btn btn-primary" onClick={this.trimiteFormular}>Adauga</button>
        }
        {this.state.modificare &&
        <button type="submit" className="btn btn-primary" onClick={this.trimiteModificare}>Modifica</button>
        }
      </form>
    );
  }
}

export default PlanCalatorie;
