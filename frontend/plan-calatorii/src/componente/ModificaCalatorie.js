import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import PlanCalatorie from './PlanCalatorie.js';

class ModificaCalatorie extends Component {
    constructor(props) {
        super(props);

  }
render() {
    console.log(this)
    if (this.props.location.state.calatorie) {
       return (
            <PlanCalatorie modificaCalatoria={this.props.location.state.calatorie}/>
        ) 
    } else {
        return (
          <Redirect to='/plan-calatorie' /> 
       )
    }
    
}
}

export default ModificaCalatorie;
