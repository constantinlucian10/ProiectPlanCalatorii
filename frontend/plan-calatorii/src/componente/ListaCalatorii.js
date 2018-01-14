import React, { Component } from 'react';
import ItemCalatorie from './MeniuControlCalatorie.js'
import axios from 'axios';

class ListaCalatorii extends React.Component {
  render() {
      let proprii = this.props.proprii;
      if (this.props.calatorii.length) {
          return (
            <ul className="list-group">
              {this.props.calatorii.map(function(calatorie){
                 return <ItemCalatorie key={calatorie.id} calatorie={calatorie} proprii={proprii}/>;
              })}
            </ul>
          )
      } else {
          return (
              <h4>Nu exista calatorii</h4>
              )
      }
       
  }
}
export default ListaCalatorii;