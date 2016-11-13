import React, { Component } from 'react';
import { Link } from 'react-router'
import Navbar from './navbar.js'

export default class App extends Component {

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}