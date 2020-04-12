import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDistance } from 'geolib';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';


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
        //console.log("Getting data");
        var targetUrl = "https://corona.lmao.ninja/v2/jhucsse";
        //var targetUrl = "https://bing.com/covid/data";
        var appToken = "ZDYwNTk3NDktOGMyZi00NzcxLTk5NTMtNTYxOWM3OThhM2Ji";

        var eventSource = streamdataio.createEventSource(targetUrl, appToken, []);
        var result = [];

        const localSetState = (data) => {
            this.setState({ data })

        };

        eventSource
            .onOpen(function () {
                // console.log("connected!");
            })
            .onData(function (data) {
                //console.log("data received");
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

    getClosestData() {
        var closestData = {};
        var p = 0.017453292519943295;    // Math.PI / 180
        var c = Math.cos;
        const myLat = this.props.currentLocation.lat;
        const myLng = this.props.currentLocation.lng;
        const distance = this.state.data.map(result => {
            var a = 0.5 - c((result.coordinates.latitude - myLat) * p) / 2 +
                c(myLat * p) * c(result.coordinates.latitude * p) *
                (1 - c((result.coordinates.longitude - myLng) * p)) / 2;
            const myDistance = 12742 * Math.asin(Math.sqrt(a));
            if (!closestData.distance || myDistance < closestData.distance) {
                closestData = {
                    distance: myDistance,
                    result: result
                }
            }
        })
        return closestData;
    }

    findByProvince(province) {
        return this.state.data.find((provinceData) => {
            return provinceData.province === province;
        })
    }

    render() {

        //var closestData = this.getClosestData();
        //console.log("Closest data: ", closestData);
        // console.log("Country List form Statistics: ", countryList);

        var closestData = {
            distance: '',
            result: this.findByProvince(this.props.currentLocation.sublocality)
        };
        /*
        pseudo: if there is no hit on sublocality then default to getClosestData
        */

        // console.log("Province Data: ", provinceData);
        return (
            <Card variant="outlined">
                <CardHeader
                    title="COVID-19 Statistics"
                />
                <CardContent>
                    <div>Source: Johns Hopkins University CSSE Data</div>
                    {closestData.result ?
                        <div>
                            <Grid direction="row" container spacing={5}>
                                <Grid item>Location: {closestData.result.province}, {closestData.result.country}</Grid>
                                <Grid item>Updated: {closestData.result.updatedAt}</Grid>
                            </Grid>
                            <Grid direction="row" container spacing={5}>
                                <Grid item>Confirmed Cases: {closestData.result.stats.confirmed}</Grid>
                                <Grid item>Deaths: {closestData.result.stats.deaths}</Grid>
                                <Grid item>Recovered: {closestData.result.stats.recovered}</Grid>
                            </Grid>
                        </div>
                        :
                        <div>
                            Location data not available
                        </div>
                    }
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