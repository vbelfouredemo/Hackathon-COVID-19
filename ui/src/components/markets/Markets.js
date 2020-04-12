import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';


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
            sp500data:{
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
        //this.getTicker("^DJI");
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
                //              this.setState({ djiadata: data })
                
                if ( data["Global Quote"]["01. symbol"] != null) {
                    if (index === "^SPX" ) {
                        this.setState({ sp500data: data["Global Quote"] });
                        console.log(' In getTicker sp500data', this.state.sp500data);
                    } else if (index === "^DJI") {
                        this.setState({ djiadata: data["Global Quote"] });
                        console.log('In getTicker djiadata', this.state.djiadata);
                    }  
                    else  if (index === "^RUT") {
                        this.setState({ russ2000data: data["Global Quote"] });
                        console.log('In getTicker russ2000data', this.state.russ2000data);
                    }  
                }
            })
            .catch(console.log)

}


render() {
    //const DJIA = new Markets();
    return (
        <Card>
            <CardHeader
                title="Market Watch"
            />
            <CardContent>
                <div>Source: Alphavantage</div>
                { this.state.sp500data ?
               // (this.state.djiadata || this.state.sp500data || this.state.nasdaqdata) ?
                    <Grid container>
                        <Grid direction="row" container spacing={7}>
                            <Grid item >Index</Grid>
                            <Grid item>Current</Grid>
                            <Grid item>Open</Grid>
                            <Grid item>High</Grid>
                            <Grid item>Low</Grid>
                        </Grid>
                        <Grid direction="row" container spacing={5}>
                            <Grid item>{this.state.sp500data["01. symbol"]}</Grid>
                            <Grid item>{Number(this.state.sp500data["05. price"]).toFixed(2)}</Grid>
                            <Grid item>{Number(this.state.sp500data["02. open"]).toFixed(2)}</Grid>
                            <Grid item>{Number(this.state.sp500data["03. high"]).toFixed(2)}</Grid>
                            <Grid item>{Number(this.state.sp500data["04. low"]).toFixed(2)}</Grid>
                        </Grid>
                        <Grid direction="row" container spacing={5}>
                            <Grid item>{this.state.djiadata["01. symbol"]}</Grid>
                            <Grid item>{Number(this.state.djiadata["05. price"]).toFixed(2)}</Grid>
                            <Grid item>{Number(this.state.djiadata["02. open"]).toFixed(2)}</Grid>
                            <Grid item>{Number(this.state.djiadata["03. high"]).toFixed(2)}</Grid>
                            <Grid item>{Number(this.state.djiadata["04. low"]).toFixed(2)}</Grid>
                        </Grid>
                        <Grid direction="row" container spacing={5}>
                            <Grid item>{this.state.russ2000data["01. symbol"]}</Grid>
                            <Grid item>{Number(this.state.russ2000data["05. price"]).toFixed(2)}</Grid>
                            <Grid item>{Number(this.state.russ2000data["02. open"]).toFixed(2)}</Grid>
                            <Grid item>{Number(this.state.russ2000data["03. high"]).toFixed(2)}</Grid>
                            <Grid item>{Number(this.state.russ2000data["04. low"]).toFixed(2)}</Grid>
                        </Grid>
                    </Grid>
                    :
                    <div>
                        Data not available
                    </div>
                }

            </CardContent>
        </Card>
    )
}
}

export default Markets;