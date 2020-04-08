import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Dashboard from './components/dashboard/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePosition } from 'use-position';
import Geocode from "react-geocode";
import { connect } from 'react-redux';
import { getLocation } from './store/actions/getLocationActions'

Geocode.setApiKey("AIzaSyB_Idu-JfFY9FeTmEJO9mihrD5MUYvgMjw");
Geocode.setLanguage("en");

class App extends Component {

  componentDidMount() {
    console.log("Initial props from App: ", this.props);
      this.props.getLocation();
  }

  render() {
    console.log("State from App: ", this.props);
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Dashboard />
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentLocation: state.currentLocation
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLocation: (location) => dispatch(getLocation(location))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
