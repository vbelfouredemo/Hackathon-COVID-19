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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.light,
        color: 'white'
    }
}))

const AboutUsDashboard = () => {

    const classes = useStyles();
    return (
        <div className={classes.root} style={{ marginLeft: 150, marginTop: 0, padding: 50 }} >
            <div style={{display: 'table', width: '100%', }}>
                <div class="row" style={{ width: '100%' }}>
                    <div class="cell" style={{ width: '33%' }}>
                        <td align="center">
                            <img src="../img/vbelfoure.png"></img>
                            <div class="caption">Vincent Belfoure</div>
                        </td>
                    </div>
                    <div class="cell" style={{ width: '33%' }}>
                        <td align="center">
                            <img src="../img/kmaity.png"></img>
                            <div class="caption">Krishanu Maity</div>
                        </td>
                    </div>
                    <div class="cell" style={{ width: '33%' }}>
                        <td align="center">
                            <img src="../img/bbarrett.png"></img>
                            <div class="caption">Bob Barrett</div>
                        </td>
                    </div>
                </div>
                <div class="row" style={{width: '100%'}}>
                    <div class="cell" style={{width: '100%'}}>
                    <br></br>
                       <br></br>
                       <br></br>
                       
                        <center><h1>Our Mission</h1></center>
                        <font size="+1">

                        <p>To provide a single website where in these trying times ... </p>
                        <p>
                        
                        <li>local volunteer organizations and charities in need of assistance can easily connect with local volunteers</li>
                        <li>local businesses in need of help can request and accept donations</li>
                        <li>individuals and organizations can connect on where to find scarce local supplies</li>
                        <li>a visitor can see the local CV-19 statistics and the currrent major stock market indices</li>
                        </p>
                        <p>The Main dashboard provides the coronavirus statistics for your area as well as the major stock market indices.   This dashboard also allows volunteers and organizations who are offering help or need help to easily connect.   It also allows local businesses that are in need of help to request assistance.    Visitors can either donate directly to the local business or make a point to  frequent that business (i.e. order take out).  </p>
                        <p>The Local Supplies menu allows you to minimize your trips to the store (and your possible exposure to CV-19) by allow visitors to quickly see which stores have essesntials in stock and how current that information is.  Visitors can update this information and even get directions to the store! </p>
                        <p>And, on the lighter side, to provide a forum for people to recommend their favorite movies and dishes to make our time spent self-distancing as comfortable as possible.  You can even upload pictures and recipes of your favorites! </p>
                        </font>
                       <br></br>
                       <br></br>
                       <br></br>
                       <br></br>
                       <br></br>
                       <br></br>
                       <br></br>
                       <br></br>
                       <br></br>
                       <br></br>
                       <br></br>
                       <br></br>
                       <br></br>
                       <br></br>
                       <br></br>
                        
                    </div>   
                </div>
                
            </div>
        </div>
    )
}

export default AboutUsDashboard;
