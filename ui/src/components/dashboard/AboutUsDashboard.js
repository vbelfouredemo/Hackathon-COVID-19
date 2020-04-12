import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Statistics from '../statistics/Statistics';
import Campaigns from '../campaigns/Campaigns';
import Neededhelp from '../NeededHelp/Neededhelp';
import OfferedHelp from '../OfferedHelp/OfferedHelp'
import Markets from '../markets/Markets';

const useStyles = makeStyles(theme => ({

}))

const AboutUsDashboard = () => {

    const classes = useStyles();
    return (
        <div style={{ marginLeft: 150, marginTop: 0, padding: 30, backgroundColor: 'slategray' }} >
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    Vincent Belfoure
                </Grid>
                <Grid item xs={4}>
                    Krishanu Maity
                </Grid>
                <Grid item xs={4}>
                    Bob Barret
                </Grid>
                <Grid item xs={12}>
                    Our Mission
                </Grid>
            </Grid>
        </div>
    )
}

export default AboutUsDashboard;
