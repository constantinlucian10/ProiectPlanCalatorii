import React, { Component } from 'react';
import $ from 'jquery'; //folosim jquery aici pentru ca axios nu are jsonp necesar pentru a trece de eroarea de cors
import LocatieVreme from './LocatieVreme';
class Meniu extends Component {

    constructor(props) {
        const initState = {
            locatie: '',
            trimis: false,
            apiResponse:{},
            ajaxExecutat:false,
        };
        super(props);
        //instantiem variabilele care contin valorile din formular
        this.state = initState;
       this.ajaxUrl = 'https://api.wunderground.com/api/ac60552690218f41/forecast/lang:RO/q/';
       this.schimbaLocatie = this.schimbaLocatie.bind(this);
       this.cautaLocatie = this.cautaLocatie.bind(this);
    }
    schimbaLocatie(e) {
        this.setState({'locatie':e.target.value});
        this.setState({'trimis':false});
      }
    cautaLocatie(e) {
        e.preventDefault();
        $.ajax({
          url : this.ajaxUrl+encodeURI(this.state.locatie)+'.json',
          dataType : "jsonp",
          success : function(response) {
          this.setState({'apiResponse':response});
             this.setState({'ajaxExecutat':true});
             console.log(this.state)
          }.bind(this),
          error: function(xhr, status, err) {
           this.setState({'apiResponse':{eroare:true,mesaj:'Nu s-a gasit Locatia'}});
           this.setState({'ajaxExecutat':true});
          }.bind(this)
         });
        // axios.jsonp())
        //   .then(response => {
             
        //   })
        //   .catch(error => {
        //     this.setState({'apiResponse':{eroare:true,mesaj:'A avut loc o eroare de conectiune'}});
        //     this.setState({'ajaxExecutat':true});
        //   });
    }
    
    render() {
        let results = null;
        if (this.state.apiResponse.response && this.state.apiResponse.response.results) {
          results = this.state.apiResponse.response.results.map(function(locatie) {
                 return <LocatieVreme key={locatie.zmw} locatie={locatie}/>;
         });  
        }
        let vremea = null ;
        if (this.state.apiResponse.forecast) {
            vremea = this.state.apiResponse.forecast.txt_forecast.forecastday.map(function(vremeaZi) {
                 return <div style={{border:'1px solid #ccc',padding:5+'px',margin:'10px 0',width:'100%'}}>
                 
                 <h5>{vremeaZi.title}</h5>
                 <div style={{width:100+'%'}}><img src={vremeaZi.icon_url}/></div>
                 <small>{vremeaZi.fcttext_metric}</small>
                 </div>;
         });  
        }
        
    return (
      <div>Inainte de a pleca intr-o calatorie nu uita sa verifici vremea
       <form className={this.state.trimis?'was-validated  container':'container'}>
       {this.state.apiResponse && this.state.apiResponse.eroare &&
       <div className="alert alert-danger" role="alert">{this.state.apiResponse.mesaj}</div>
       }
       <div className="row">
       <div className="form-group col-lg-12">
          <label htmlFor="tara">Cauta Locatie</label>
          <input type="text" className="form-control" id="locatie" aria-describedby="emailHelp" required placeholder="Locatie"  value={this.state.tara} onChange={this.schimbaLocatie}/>
          {this.state.trimis && !this.state.locatie &&
               <div className="invalid-feedback">O locatie</div>
          }
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.cautaLocatie}>Cauta</button>
        {this.state.apiResponse && this.state.apiResponse.response && this.state.apiResponse.response.error &&
         <div className="alert alert-warning" role="alert">{this.state.apiResponse.response.error.description}</div>
         }
         {results}
         {vremea}
         </div>
        </form>
      <img src="https://icons.wxug.com/logos/PNG/wundergroundLogo_4c.png" width="107" style={{padding:'10px'}} className="float-xs-right"/>
      </div>
    );
  }
}

export default Meniu;
