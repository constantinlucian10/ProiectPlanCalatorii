import React, { Component } from 'react';
import './App.css';
import Meniu from './componente/Meniu';
import Continut from './componente/Continut';
class App extends Component {
 
  render() {
    return (
      <div>
        <Meniu />
        <div className="container">
          <Continut />
        </div>
      </div>
    );
  }
}

export default App;
