import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class Markets extends Component {


    constructor(props) {
        super(props);
        this.state = {
            djiadata: {
                "01. symbol": "DJIA",
                "05. price": "0.00",
                "02. open": "0.000",
                "03. high": "0.00",
                "04. low": "0.00"
            },
            sp500data: {
                "01. symbol": "^SPX",
                "05. price": "0.00",
                "02. open": "0.000",
                "03. high": "0.00",
                "04. low": "0.00"
            },
            russ2000data: {
                "01. symbol": "^RUT",
                "05. price": "0.00",
                "02. open": "0.000",
                "03. high": "0.00",
                "04. low": "0.00"
            }
        };
        this.getTicker("^SPX");
        this.getTicker("^DJI");
        this.getTicker("^RUT");


        console.log('campaign', props.currentLocation)
    };

    getTicker(index) {

        fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + index + '&apikey=TZT050RZL1IA18QQ', {
            method: "GET",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                //'authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
                //'apikey': 'ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
            })
        }).then(response => response.json())
            .then((data) => {

                if (data["Global Quote"]["01. symbol"] != null) {
                    if (index === "^SPX") {
                        this.setState({ sp500data: data["Global Quote"] });
                        console.log(' In getTicker sp500data', this.state.sp500data);
                    } else if (index === "^DJI") {
                        this.setState({ djiadata: data["Global Quote"] });
                        console.log('In getTicker djiadata', this.state.djiadata);
                    }
                    else if (index === "^RUT") {
                        this.setState({ russ2000data: data["Global Quote"] });
                        console.log('In getTicker russ2000data', this.state.russ2000data);
                    }
                }
            })
            .catch(console.log)

    }


    render() {

        return (
            <Card style={{height:'235px'}} elevation={4}>
                <CardHeader
                    title="Market Watch"
                />
                <CardContent>
                    <div>Source: Alphavantage</div>
                    { //this.state.sp500data ?
                        (this.state.djiadata || this.state.sp500data || this.state.nasdaqdata) ?
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Index</TableCell>
                                            <TableCell>Current</TableCell>
                                            <TableCell>Open</TableCell>
                                            <TableCell>High</TableCell>
                                            <TableCell>Low</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>S&P500</TableCell>
                                            <TableCell>{(Number(this.state.sp500data["05. price"]).toFixed(2) > 0) ? Number(this.state.sp500data["05. price"]).toFixed(2):"-------"} </TableCell>
                                            <TableCell>{(Number(this.state.sp500data["02. open"]).toFixed(2) > 0) ? Number(this.state.sp500data["02. open"]).toFixed(2):"-------"} </TableCell>
                                            <TableCell>{(Number(this.state.sp500data["03. high"]).toFixed(2) > 0) ? Number(this.state.sp500data["03. high"]).toFixed(2):"-------"} </TableCell>
                                            <TableCell>{(Number(this.state.sp500data["04. low"]).toFixed(2) > 0) ? Number(this.state.sp500data["04. low"]).toFixed(2):"-------"} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Russell 2000</TableCell>
                                            <TableCell>{(Number(this.state.russ2000data["05. price"]).toFixed(2) > 0) ? Number(this.state.russ2000data["05. price"]).toFixed(2):"-------"} </TableCell>
                                            <TableCell>{(Number(this.state.russ2000data["02. open"]).toFixed(2) > 0) ? Number(this.state.russ2000data["02. open"]).toFixed(2):"-------"} </TableCell>
                                            <TableCell>{(Number(this.state.russ2000data["03. high"]).toFixed(2) > 0) ? Number(this.state.russ2000data["03. high"]).toFixed(2):"-------"} </TableCell>
                                            <TableCell>{(Number(this.state.russ2000data["04. low"]).toFixed(2) > 0) ? Number(this.state.russ2000data["04. low"]).toFixed(2):"-------"} </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            :
                            <div>
                                Data not available
                    </div>
                    }
                    <div>* Data will be dashes if service unavailable</div>
                </CardContent>
            </Card>
        )
    }
}

export default Markets;