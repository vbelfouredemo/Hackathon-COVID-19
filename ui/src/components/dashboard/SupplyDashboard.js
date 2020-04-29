import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Supplies from '../supplies/Supplies';
import AddSupply from '../supplies/AddSupply';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.light,
        height: '100%' 
    },
    paper: {
        backgroundColor: theme.palette.primary.light,
        height: '100%',
        flexGrow: 1 
    }


}))
const SupplyDashboard = () =>
{
    const classes = useStyles();
    return(
        <Paper className={classes.paper} style={{ marginLeft: 150, marginTop: 0, padding: 30}} >
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Supplies />
                </Grid>
                <Grid item xs={4}>
                    <AddSupply />
                </Grid>
            </Grid>
        </Paper>
    )
}

export default withStyles(useStyles)(SupplyDashboard)