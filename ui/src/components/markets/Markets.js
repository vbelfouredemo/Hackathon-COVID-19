import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

class Markets extends Component {

    render() {

        return(
            <Card>
                <CardHeader
                    title="Market Watch"
                />
                <CardContent>
                    Market Content Goes Here
                </CardContent>
            </Card>
        )
    }
}

export default Markets;