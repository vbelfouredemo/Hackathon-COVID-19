import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';


// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardHeader from '@material-ui/core/CardHeader';
// import Typography from '@material-ui/core/Typography';
// import { JsonPatchError } from 'fast-json-patch/module/core';


class Statistics extends Component {



    state = {
        data: []
    };

    getData = () => {
        // streams.getStream();

        var streamdataio = require('streamdataio-js-sdk/dist/bundles/streamdataio-node');
        var jsonPatch = require('fast-json-patch');
        console.log("Getting data");
        var targetUrl = "https://corona.lmao.ninja/jhucsse";
        var appToken = "ZDYwNTk3NDktOGMyZi00NzcxLTk5NTMtNTYxOWM3OThhM2Ji";

        var eventSource = streamdataio.createEventSource(targetUrl, appToken, []);
        var result = [];

        const localSetState = (data) => {
            this.setState({ data })
        };

        eventSource
            .onOpen(function () {
                console.log("connected!");
            })
            .onData(function (data) {
                console.log("data received");
                //this.setState({data});
                result = data;
                localSetState(result);
            })
            .onPatch(function (patch) {
                console.log("patch ", patch);
                jsonPatch.applyPatch(result, patch);
                localSetState(result);
            })
            .onError(function (error) {
                console.log('ERROR!', error);
                eventSource.close();
            });

        eventSource.open();

    };

    componentDidMount = () => {
        this.getData();
    }

    render() {
        return (
            <Card variant="outlined">
                <CardHeader
                    title="COVID-19 Statistics"
                />
                <CardContent>
                    Location: {this.props.currentLocation.city}
                </CardContent>
            </Card>

        );

    }
}

const mapStateToProps = (state) => {
    return {
        currentLocation: state.currentLocation
    }
}

export default connect(mapStateToProps)(Statistics);