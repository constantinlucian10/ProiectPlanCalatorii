import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router'
import Acasa from './Acasa';
import Login from './Login';
import Inregistrare from './Inregistrare';
import PlanCalatorie from './PlanCalatorie';
import ListaPlanuri from './ListaPlanuri';
import ModificaCalatorie from './ModificaCalatorie';
const isAuthToken = function() {
  let token = window.localStorage.getItem('login_token');
  if (token) {
    return token;
  }
  return false;
}
const RouteAutentificat = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthToken() !== false
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)
const RouteFaraAuth = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthToken() === false
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)
//activam incarcam template-ul pentru pagina curenta
class Continut extends Component {
  render() {
    return (
      <div className="row">
        <Switch>
          <Route exact path='/' component={Acasa}/>
          <RouteFaraAuth path='/login' component={Login}/>
          <RouteFaraAuth path='/inregistrare' component={Inregistrare}/>
          <RouteAutentificat exact={true} path='/plan-calatorie' component={ListaPlanuri}/>
           <RouteAutentificat exact={true} path='/plan-calatorie/adauga' component={PlanCalatorie}/>
          <RouteAutentificat exact={true} path='/plan-calatorie/:id/modifica' component={ModificaCalatorie}/>
        </Switch>
      </div>
    );
  }
}

export default Continut;
