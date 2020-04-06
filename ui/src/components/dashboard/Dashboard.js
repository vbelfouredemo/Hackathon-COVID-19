import React,{ Component } from 'react';
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
import Neededhelp from '../NeededHelp/Neededhelp';
import Markets from './Markets';

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

//export default function CenteredGrid({props}) {
class Dashboard extends Component{
    constructor(props){
        super(props);

    }  

    render(props){
        const classes = this.props;
        console.log('dashboard', JSON.stringify(classes));
        return (
            <React.Fragment>
                <Container maxWidth="xl">
                    <div style={{ marginTop: 20, padding: 30, backgroundColor: 'slategray' }} >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <Card variant="outlined">
                                    <CardHeader
                                        title="COVID-19 Statistics"
                                    />
                                    <CardContent>
                                        <Statistics />
                                        <p>
                                                Your location: {classes.currentLocation.neighbourhood}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card variant="outlined">
                                <CardHeader
                                        title="Market Watch "
                                    />
                                    <CardContent >
                                        <Markets />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card  variant="outlined">
                                    <CardHeader
                                        title="Supplies Near You "
                                    />
                                    <CardContent>
                                        <Typography color="textSecondary" gutterBottom>
                                            Supplies Near You
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card variant="outlined">
                                    <CardContent >
                                        <Campaigns currentLocation={classes.currentLocation}/>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                            <Card variant="outlined">
                                <CardHeader
                                        title="Needed Help"
                                    />
                                    <CardContent >
                                        <Neededhelp />
                                    </CardContent>
                                </Card>
                            </Grid>
    
                        </Grid>
                    </div>
                </Container>
            </React.Fragment>
        )
    }
}

export default Dashboard;
