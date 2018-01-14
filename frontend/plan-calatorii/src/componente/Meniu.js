import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
const isAuthToken = function() {
  let token = window.localStorage.getItem('login_token');
  if (token) {
    return token;
  }
  return false;
}
class Meniu extends Component {
    constructor(props) {
        super(props);
        this.redirect = false
        this.state = {
            isLoggingIn:false,
        }
       this.logOut = this.logOut.bind(this)
  }
  logOut(e) {
      e.preventDefault();
      window.localStorage.removeItem('login_token');
      this.redirect = <Redirect to="/"/>
      this.setState({isLoggingIn:false})
  }
  componentDidMount() {
     
      
  }
  render() {
      let html = null;
      if (this.redirect) {
         html = this.redirect;
      }
       setTimeout(()=>{
          if (isAuthToken()) {
          this.setState({isLoggingIn:true})
          } else {
              this.setState({isLoggingIn:false})
          }
      },300);
     
    return (
       
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {html}
            <div className="container"><div className="row">
                <a className="navbar-brand" href="#">Plan Calatorii</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to='/' className="nav-link">Acasa</Link>
                        </li>
                        {!this.state.isLoggingIn  &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        }
                        {!this.state.isLoggingIn &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/inregistrare">Inregistrare</Link>
                        </li>
                        }
                        {this.state.isLoggingIn &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/plan-calatorie">Plan Calatorie</Link>
                        </li>
                        }
                         {this.state.isLoggingIn &&
                        <li className="nav-item">
                            <a className="nav-link" href="" onClick={this.logOut} >Logout</a>
                        </li>
                        }
                    </ul>
                </div>
            </div></div>
        </nav>
    );
  }
}

export default Meniu;
