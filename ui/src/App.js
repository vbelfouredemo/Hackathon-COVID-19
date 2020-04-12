import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainNav from './components/layout/MainNav'
// import NavBar from './components/layout/NavBar';
import Dashboard from './components/dashboard/Dashboard'
import LocalSupplies from './components/supplies/LocalSupplies'
import DashboardMovies from './components/Movies/DashboardMovies'
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
        {/*
          <NavBar />
          <Dashboard />
      */}
        <MainNav />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/supplies" component={LocalSupplies} />
          <Route exact path="/movies" component={DashboardMovies} />
        </Switch>
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
