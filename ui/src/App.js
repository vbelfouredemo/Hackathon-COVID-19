import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainNav from './components/layout/MainNav'
// import NavBar from './components/layout/NavBar';
import Dashboard from './components/dashboard/Dashboard'
import SupplyDashboard from './components/dashboard/SupplyDashboard'
import MovieDashboard from './components/dashboard/MovieDashboard'
import FoodDashboard from './components/dashboard/FoodDashboard'
import AboutUsDashboard from './components/dashboard/AboutUsDashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import Geocode from "react-geocode";
import { connect } from 'react-redux';
import { getLocation } from './store/actions/getLocationActions'
//import { ThemeProvider } from 'react-bootstrap';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'

class App extends Component {

  componentDidMount() {
    this.props.getLocation();
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="App">
            <MainNav />
            <Switch>
              <Route exact path="/" component={Dashboard}  />
              <Route path="/supplies" component={SupplyDashboard} />
              <Route path="/movies" component={MovieDashboard} />
              <Route path="/foods" component={FoodDashboard} />
              <Route path="/aboutus" component={AboutUsDashboard} />
            </Switch>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
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
