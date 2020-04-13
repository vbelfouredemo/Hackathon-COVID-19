import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { connect } from 'react-redux';
import { userLogin, userLogout } from '../../store/actions/userActions';
import { withStyles } from '@material-ui/styles';
import "./login.scss";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


class Login extends Component {
  constructor() {
    super();
    this.state = {
      userDetails: {},
      isUserLoggedIn: false,
      redirect: null
    };
  }

  responseGoogle = response => {
    if (response.profileObj) {
      this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
      this.props.userLogin(this.state);
    }
    if (this.state.isUserLoggedIn == true) {
      this.setState({ redirect: "/" });
    }
  };

  logout = () => {
    this.setState({ userDetails: {}, isUserLoggedIn: false })
    this.props.userLogout(this.state);
    if (this.state.isUserLoggedIn == false) {
      this.setState({ redirect: "/" });
    }
  };

  render(props) {
    const { classes } = this.props;

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    return (
      <div className={classes.root} style={{ marginLeft: 0, marginTop: 0, padding: 30 }}>
        <div className="loginlogout">
          {!this.props.currentUser.isUserLoggedIn && (
            <GoogleLogin
              clientId="39208363193-8fu7230mh4lhruik0umv2r5le48dv4q2.apps.googleusercontent.com" //TO BE CREATED
              render={renderProps => (
                <button
                  className="button"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Log in with Google
                </button>
              )}
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
          )}
          {this.props.currentUser.isUserLoggedIn ?
            <span className="logout">
              Logged in as: {this.props.currentUser.userDetails.givenName}{" "}
              {this.props.currentUser.userDetails.familyName} &nbsp;&nbsp;&nbsp;
              <GoogleLogout
                render={renderProps => (
                  <button
                    className="logout-button"
                    onClick={renderProps.onClick}
                  >
                    Log Out
                  </button>
                )}
                onLogoutSuccess={this.logout}
              />
            </span>
            :
            <div>Not logged in</div>
          }
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.userDetails
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (state) => dispatch(userLogin(state)),
    userLogout: (state) => dispatch(userLogin(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));