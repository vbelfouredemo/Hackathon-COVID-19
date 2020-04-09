import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { updateLocation } from '../../store/actions/updateLocationActions';
import { withStyles } from '@material-ui/styles';
import Login from '../login/Login';
// import { Modal, Row, Col, Form } from 'react-bootstrap';

const styles = theme => {
    return ({
        root: {
            '& label.Mui-focused': {
                color: 'white',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: 'white',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'white',
                },
                '&:hover fieldset': {
                    borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'white',
                },
            },
        }
    })
}

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateLocation: false,
            zip: ''
        }
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
        this.handleUpdateLocation = this.handleUpdateLocation.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleUpdateClick(e) {
        e.preventDefault();
        this.setState({ updateLocation: true });
    }

    handleUpdateLocation(e) {
        e.preventDefault();
        this.props.updateLocation(this.state.zip);
        //console.log("handleUpdateLocation: ", this.state.zip);
        //this.props.updateLocation(e.zip)
    }

    handleChange(e) {
        this.setState({ zip: e.target.value });
    }

    render() {
        const { classes } = this.props;
        console.log("Location from NafBar: ", this.props.currentLocation);
        return (
            <div >
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            The Social Isolation Blues Brothers Dashboard
                       </Typography>
                       <Typography>
                           <Login />
                       </Typography>
                        <Typography align="right" style={{ marginRight: 10 }}>
                            Your location:&nbsp;
                                {this.props.currentLocation.city &&
                                <Typography>
                                    {this.props.currentLocation.city}, {this.props.currentLocation.sublocality} { this.props.currentLocation.zipcode}
                                </Typography>
                            }
                        </Typography>
                        &nbsp;&nbsp;&nbsp;
                        {!this.state.updateLocation &&
                            <Button variant="outlined" color="inherit" align="right" style={{ marginLeft: 10 }} onClick={this.handleUpdateClick}>
                                Change Location
                       </Button>
                        }
                        {this.state.updateLocation &&
                            <form className={classes.root} noValidate autoComplete="off" onSubmit={this.handleUpdateLocation}>
                                <TextField color="primary" style={{width:100, height:5}} inputstyle={{width:100, height:5}}label="postal code" value={this.state.zip} variant="outlined" onChange={this.handleChange} />
                                <Button variant="outlined" color="inherit" style={{ marginLeft: 10 }} onClick={this.handleUpdateLocation}>
                                    Update Location
                                </Button>
                            </form>
                        }

                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentLocation: state.currentLocation
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateLocation: (location) => dispatch(updateLocation(location))
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBar));