import React,{ Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Statistics from '../Statistics/Statistics';
import Campaigns from '../Campaigns/Campaigns';
import Neededhelp from '../NeededHelp/Neededhelp';
import Supplies from '../supplies/Supplies';
import Markets from '../Markets/Markets';

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
        this.state = {
            currentLocation: this.props.currentLocation
        };
    }  
    componentWillReceiveProps(props) {
        //console.log('updating props.............')
        this.setState({ currentLocation: props.currentLocation });  
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
                                    <CardContent style={{height:'850px'}}>
                                        <Markets />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card  variant="outlined">
                                    <CardContent style={{height:'850px'}}>
                                        <Supplies currentLocation={this.state.currentLocation}/>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card variant="outlined">
                                    <CardContent style={{height:'850px'}}>
                                        <Campaigns currentLocation={this.state.currentLocation}/>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3} >
                                <Card variant="outlined">
                                    <CardContent style={{height:'850px'}}>
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
