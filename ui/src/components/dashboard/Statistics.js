import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { JsonPatchError } from 'fast-json-patch/module/core';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));



class Statistics extends Component {



    state = {
        data: []
    };

    getData = () => {

        var streamdataio = require('streamdataio-js-sdk/dist/bundles/streamdataio-node');
        var jsonPatch = require('fast-json-patch');
        console.log("Getting data");
        var targetUrl = "https://corona.lmao.ninja/jhucsse";
        var appToken = "ZDYwNTk3NDktOGMyZi00NzcxLTk5NTMtNTYxOWM3OThhM2Ji";

        var eventSource = streamdataio.createEventSource(targetUrl, appToken, []);
        var result = [];

        const localSetState = (data) => {
            this.setState({data})
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
        console.log("State: ", this.state);
        return (
            <div className={useStyles.root}> 
                Hello
            </div>
        );
 
    }
}

export default Statistics;


/*

const uniqueTags = [];
images.map(img => {
    if (uniqueTags.indexOf(img.tag) === -1) {
        uniqueTags.push(img.tag)
    }
});

*/