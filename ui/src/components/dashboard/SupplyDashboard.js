import React from 'react';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Supplies from '../supplies/Supplies';
import AddSupply from '../supplies/AddSupply';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.light,
    }


}))
const SupplyDashboard = () =>
{
    const classes = useStyles();
    return(
        <div className={classes.root} style={{ marginLeft: 150, marginTop: 0, padding: 30}} >
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Supplies />
                </Grid>
                <Grid item xs={4}>
                    <AddSupply />
                </Grid>
            </Grid>
        </div>
    )
}

export default SupplyDashboard