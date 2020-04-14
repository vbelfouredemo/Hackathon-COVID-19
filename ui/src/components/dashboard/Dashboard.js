import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Statistics from '../statistics/Statistics';
import Campaigns from '../campaigns/Campaigns';
import Neededhelp from '../NeededHelp/Neededhelp';
import OfferedHelp from '../OfferedHelp/OfferedHelp'
import Markets from '../markets/Markets';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.light,
    },
    paper: {
        height: 100
      }


}))

const Dashboard = () => {

    const classes = useStyles();
    return (
        <div className={classes.root} style={{ marginLeft: 150, marginTop: 0, padding: 30}} >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Statistics />
                </Grid>
                <Grid item xs={6}>
                    {/* <Markets /> */}
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