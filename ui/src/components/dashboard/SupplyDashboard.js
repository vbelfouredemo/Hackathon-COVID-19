import React from 'react';
// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Supplies from '../supplies/Supplies';
import AddSupply from '../supplies/AddSupply';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const SupplyDashboard = () =>
{
    return(
        <React.Fragment>
            <Container maxWidth="xl">
                <div style={{ marginLeft: 120, marginTop: 5, padding: 30, backgroundColor: 'slategray' }} >
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Supplies />
                        </Grid>
                        <Grid item xs={4}>
                            <AddSupply />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default SupplyDashboard