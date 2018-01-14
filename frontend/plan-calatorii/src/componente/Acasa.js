import React, { Component } from 'react';
import InregistrareForm from './InregistrareForm';
import LoginForm from './LoginForm';

class Acasa extends Component {
 
  render() {
  let body = null;
  if (window.localStorage.getItem('login_token')) {
    body = 'logged'
  } else {
    body = 'not logged';
  }
  if(this.props.location.state) {
    
    body = <div className="alert alert-success" role="alert">{this.props.location.state.registerResponse}</div>
  }
    return (
      <div className="container">
      {body}
      </div>
    );
  }
}

export default Acasa;
