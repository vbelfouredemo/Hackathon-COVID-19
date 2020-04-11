import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink, withRouter, Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Login from '../login/Login';
import Location from '../location/Location';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.primary.main

    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


const MainNav = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Grid justify="space-between" direction="row" container align-items="center" >
                        <Grid item>
                            <Typography variant="h6">
                                The Social Isolation Blues Brothers Dashboard
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Location />
                        </Grid>
                        <Grid item>
                            <Login />
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper
                }}
            >

                <div classname={classes.drawerContainer}>
                    <Toolbar />
                    <List>

                        <ListItem key={"main"} component={Link} to="/">
                            <ListItemText primary="Main" />
                        </ListItem>
                        <ListItem key={"supplies"} component={Link} to="/supplies">
                            <ListItemText primary="Supplies" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>

            </main>
        </div>
    )

}

export default withRouter(MainNav);
