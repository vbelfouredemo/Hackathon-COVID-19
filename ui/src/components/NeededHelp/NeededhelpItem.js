import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import CardActions from '@material-ui/core/CardActions';
// import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';


const NeededhelpItem = ({ item }) => {
    return (
    <Card variant="outlined">
        <CardContent>
            <Typography>
                {item.name}
            </Typography>
        </CardContent>
    </Card>
    )
}

export default NeededhelpItem