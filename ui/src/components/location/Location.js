import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { updateLocation } from '../../store/actions/updateLocationActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


class Location extends Component {

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
        this.setState({ updateLocation: false });
    }

    handleChange(e) {
        this.setState({ zip: e.target.value });
    }

    render() {
        return (
            <Grid direction="row">
                <Grid item>

                    {this.props.currentLocation.city ?
                        <Typography>
                            Your location:&nbsp;{this.props.currentLocation.city}, {this.props.currentLocation.sublocality} {this.props.currentLocation.zipcode}
                            <TextField color="white" style={{ width: 100, height: 5 }} inputstyle={{ width: 100, height: 5 }} label="postal code" value={this.state.zip} variant="outlined" onChange={this.handleChange} />
                            <Button variant="outlined" color="inherit" style={{ marginLeft: 10 }} onClick={this.handleUpdateLocation}>
                                Update Location
                                </Button>
                        </Typography>

                        :
                        <Typography>
                            <TextField color="primary" style={{ width: 100, height: 5 }} inputstyle={{ width: 100, height: 5 }} label="postal code" value={this.state.zip} variant="outlined" onChange={this.handleChange} />
                            <Button variant="outlined" color="inherit" style={{ marginLeft: 10 }} onClick={this.handleUpdateLocation}>
                                Update Location
                                </Button>
                        </Typography>

                    }
                </Grid>

            </Grid>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentLocation: state.currentLocation,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateLocation: (location) => dispatch(updateLocation(location))
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
export default connect(mapStateToProps, mapDispatchToProps)(Location);