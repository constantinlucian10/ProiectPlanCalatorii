import React, { Component } from 'react';
import $ from 'jquery'; //folosim jquery aici pentru ca axios nu are jsonp necesar pentru a trece de eroarea de cors

class LocatieVreme extends Component {
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
       this.ajaxUrl = 'https://api.wunderground.com/api/ac60552690218f41/forecast/lang:RO';
       this.afiseazaVremea = this.afiseazaVremea.bind(this);
    }
  
    afiseazaVremea(e) {
        e.preventDefault();
        $.ajax({
          url : this.ajaxUrl+encodeURI(this.props.locatie.l)+'.json',
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
        
    }
    
    render() {
        let locatie = this.props.locatie;
        let vremea = null ;
        if (this.state.apiResponse.forecast) {
            vremea = this.state.apiResponse.forecast.txt_forecast.forecastday.map(function(vremeaZi) {
                 return <div key={vremeaZi.title} style={{border:'1px solid #ccc',padding:5+'px',margin:'10px 0',width:'100%'}}>
                 
                 <h5>{vremeaZi.title}</h5>
                 <div style={{width:100+'%'}}><img src={vremeaZi.icon_url}/></div>
                 <small>{vremeaZi.fcttext_metric}</small>
                 </div>;
         });  
        }
                 return (
                     <div className="col-lg-12" style={{padding:'10px'}} key={locatie.zmw} onClick={this.afiseazaVremea}>
                     <div>{locatie.city}, judetul {locatie.state}
                     <button style={{float:'right'}} className="btn btn-sm btn-primary" type="button">Afiseaza</button>
                     </div>
                     {vremea}
                     </div>);
       
  }
}

export default LocatieVreme;
