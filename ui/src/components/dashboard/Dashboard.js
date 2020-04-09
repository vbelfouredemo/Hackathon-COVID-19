import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Statistics from '../statistics/Statistics';
import Campaigns from '../campaigns/Campaigns';
import Neededhelp from '../NeededHelp/Neededhelp';
import Markets from '../markets/Markets';
import Supplies from '../supplies/Supplies';

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

class Dashboard extends Component {
    constructor(props) {
        super(props);

    }

    render(props) {
        const classes = this.props;
        return (
            <React.Fragment>
                <Container maxWidth="xl">
                    <div style={{ marginTop: 20, padding: 30, backgroundColor: 'slategray' }} >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Statistics />
                            </Grid>
                            <Grid item xs={3}>
                                        <Markets />
                            </Grid>
                            <Grid item xs={3}>
                                <Supplies />
                            </Grid>
                            <Grid item xs={3}>
                                <Campaigns />
                            </Grid>
                            <Grid item xs={3}>
                                <Neededhelp />
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </React.Fragment>
        )
    }
}

export default Dashboard;
