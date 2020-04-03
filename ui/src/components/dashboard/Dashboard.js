import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Statistics from './Statistics';
import Campaigns from './Campaigns';

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

export default function CenteredGrid() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Container maxWidth="xl">
                <div className={classes.root} style={{ marginTop: 20, padding: 30, backgroundColor:'slategray' }} >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>xs=12</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Statistics />
                        </Grid>
                        <Grid item xs={3}>
                            <Card className={classes.root} variant="outlined">
                                <CardHeader
                                    title="Supplies Near You "
                                />
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Supplies Near You
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={3}>
                            <Card className={classes.root} variant="outlined">
                                <CardContent >
                                    <Campaigns/>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>xs=6</Paper>
                        </Grid>
                        
                    </Grid>
                </div>
            </Container>
        </React.Fragment>
    )
}
