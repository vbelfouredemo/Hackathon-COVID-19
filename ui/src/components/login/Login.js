import React, { Component } from 'react';
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import "./login.scss";
class Login extends Component {
    constructor() {
        super();
        this.state = {
          userDetails: {},
          isUserLoggedIn: false
        };
      }
    
      responseGoogle = response => {
        this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
      };
    
      logout = () => {
        this.setState({isUserLoggedIn: false})
      };
    
      render() {
        return (
          <div className="loginlogout">
            {!this.state.isUserLoggedIn && (
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
              />
            )}
            {this.state.isUserLoggedIn && (
                <span className="logout">
                    Welcome, {this.state.userDetails.givenName}{" "}
                    {this.state.userDetails.familyName} &nbsp;&nbsp;&nbsp;
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
            )}
          </div>
        );
    }
}

export default Login;