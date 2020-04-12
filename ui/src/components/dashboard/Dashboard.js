import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Statistics from '../statistics/Statistics';
import Campaigns from '../campaigns/Campaigns';
import Neededhelp from '../NeededHelp/Neededhelp';
import OfferedHelp from '../OfferedHelp/OfferedHelp'
import Markets from '../markets/Markets';
<<<<<<< HEAD
import Supplies from '../supplies/Supplies';
import AddSupply from '../supplies/AddSupply';
=======
>>>>>>> 8236d2ea028bfe25241b1d04dbbdb8f500181552

const useStyles = makeStyles(theme => ({

}))

const Dashboard = () => {

    const classes = useStyles();
    return (
        <div style={{ marginLeft: 150, marginTop: 0, padding: 30, backgroundColor: 'slategray' }} >
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <Statistics />
                </Grid>
                <Grid item xs={5}>
                    <Markets />
                </Grid>
                <Grid item xs={4}>
                    <OfferedHelp />
                </Grid>
                <Grid item xs={4}>
                    <Campaigns />
                </Grid>
                <Grid item xs={4}>
                    <Neededhelp />
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard;
