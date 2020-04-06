import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';

import AppBar from './components/layout/AppBar';
import Dashboard from './components/dashboard/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className="App">
            <AppBar />
            <Dashboard />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default App;
