import React, { Component } from 'react';
import Navigation from '../../components/Navigation'
import Body from '../../components/Body'

import './App.css';

class App extends Component {

    render() {
      return (
          <div className="App">
            <Navigation />
            <div className="main-content">
              <Body />
            </div>
          </div>
      );
    }
  }

export default App;
