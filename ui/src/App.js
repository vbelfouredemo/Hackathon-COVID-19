import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppBar from './components/layout/AppBar';
import Dashboard from './components/dashboard/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppBar />
          <Dashboard />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
