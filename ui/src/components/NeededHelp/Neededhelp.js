import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import NeededhelpItem from './NeededhelpItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';

class Neededhelp extends Component {

    state = {
        lat: '',
        long: '',
        zip: '',
        result: [],
    }

    getData = () => {
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
            }
        };

        axios.get('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/neededHelp', options)
            .then(res => {
                this.setState({ result: res.data.neededhelps });
                console.log("Neededhelp: ", res.data.neededhelps);
            })
    }

    componentDidMount = () => {
        this.getData();
    }

    render() {
        console.log("this.state.result: ", this.state.result);
        return (
            <Card variant="outlined">
                <CardHeader
                    title="Help Needed"
                />
                <CardContent>
                    {this.state.result && this.state.result.map(result => {
                        return (
                            <NeededhelpItem item={result} key={result.id} />
                        )
                    })}
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentLocation: state.currentLocation
    }
}

export default connect(mapStateToProps)(Neededhelp);