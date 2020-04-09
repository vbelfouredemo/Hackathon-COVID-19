import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import Dashboard from './components/dashboard/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import Geocode from "react-geocode";
import { connect } from 'react-redux';
import { getLocation } from './store/actions/getLocationActions'

Geocode.setApiKey("AIzaSyB_Idu-JfFY9FeTmEJO9mihrD5MUYvgMjw");
Geocode.setLanguage("en");

class App extends Component {

  componentDidMount() {
      this.props.getLocation();
  }

  render() {
    return (
      <BrowserRouter>
          <NavBar />
          <Dashboard />
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
