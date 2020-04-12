import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainNav from './components/layout/MainNav'
import Dashboard from './components/dashboard/Dashboard'
import SupplyDashboard from './components/dashboard/SupplyDashboard'
import MovieDashboard from './components/dashboard/MovieDashboard'
import FoodDashboard from './components/dashboard/FoodDashboard'
import AboutUsDashboard from './components/dashboard/AboutUsDashboard'
import Login from './components/login/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { getLocation } from './store/actions/getLocationActions'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
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
              <Route path='/login' component={Login} />
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
