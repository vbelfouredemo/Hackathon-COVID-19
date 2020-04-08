import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { updateLocation } from '../../store/actions/updateLocationActions';
// import { Modal, Row, Col, Form } from 'react-bootstrap';
// import { makeStyles } from '@material-ui/core/styles';


class NavBar extends Component {

    render() {
        console.log("Props from NavBar: ", this.props);
        return (
            <div >
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{ marginRight: 200 }}>
                            The Social Isolation Blues Brothers Dashboard
                       </Typography>
                        <Typography style={{ marginRight: 50 }}>
                            Your location:&nbsp;
                                {this.props.currentLocation.city &&
                                <Typography>
                                    {this.props.currentLocation.city} , {this.props.currentLocation.sublocality}
                                </Typography>
                            }
                        </Typography>
                        <Button variant="outlined" color="inherit" style={{ marginLeft: 10 }} onClick={this.onOpenModal}>
                            Change Location
                       </Button>
                    </Toolbar>
                </AppBar>
            </div>
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
        updateLocation: (location) => dispatch(updateLocation(location))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);