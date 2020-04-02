import axios from 'axios';
import authStrategy from 'streamdataio-js-sdk-auth';
import jsonPatch from 'fast-json-patch';

export default {

    getStream: () => {
    var streamdataio = require('streamdataio-js-sdk/dist/bundles/streamdataio-node');
    console.log("Getting data");
    var targetUrl = "https://corona.lmao.ninja/jhucsse";
    var appToken = "ZDYwNTk3NDktOGMyZi00NzcxLTk5NTMtNTYxOWM3OThhM2Ji";

    var eventSource = streamdataio.createEventSource(targetUrl, appToken, []);
    var result = [];

    eventSource
        .onOpen(function ()
        {
            console.log("connected!");
        })
        .onData(function (data)
        {
            console.log("data received");
            result = data;
        })
        .onError(function (error)
        {
            console.log('ERROR!', error);
            eventSource.close();
        });

        eventSource.open();
    }
};