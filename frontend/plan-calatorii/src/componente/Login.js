import React, { Component } from 'react';
import LoginForm from './LoginForm'
class Login extends Component {
  render() {
    return (
      <div className="col-lg-6 offset-lg-3">
      <LoginForm prevState={this.props.location.state}/>
      </div>
    );
  }
}

export default Login;
