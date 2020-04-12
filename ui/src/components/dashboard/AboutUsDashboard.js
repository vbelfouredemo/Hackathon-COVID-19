import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Statistics from '../statistics/Statistics';
import Campaigns from '../campaigns/Campaigns';
import Neededhelp from '../NeededHelp/Neededhelp';
import OfferedHelp from '../OfferedHelp/OfferedHelp'
import Markets from '../markets/Markets';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.light,
        color: 'white'
    }
}))

const AboutUsDashboard = () => {

    const classes = useStyles();
    return (
        <div className={classes.root} style={{ marginLeft: 150, marginTop: 0, padding: 30}} >
            <table >
                <tr style={{border:'solid'}}>
                    <td>
                    Vincent Belfoure
                    </td>
                    <td>
                    Krishanu Maity
                    </td>
                    <td>
                    Bob Barrett
                    </td>
                </tr>
                <tr style={{border:'solid'}}>
                    <p>Our Mission</p>
                    <p>Our Mission</p>
                    <p>Our Mission</p>
                    <p>Our Mission</p>
                </tr>
            </table>
            {/* <Grid container spacing={2}>
                <Grid item xs={4}>
                    Vincent Belfoure
                </Grid>
                <Grid item xs={4}>
                    Krishanu Maity
                </Grid>
                <Grid item xs={4}>
                    Bob Barrett
                </Grid>
                <Grid item xs={12}>
                    Our Mission
                </Grid>
            </Grid> */}
        </div>
    )
}

export default AboutUsDashboard;
