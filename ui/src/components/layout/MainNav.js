import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink, withRouter } from 'react-router-dom';
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

import CssBaseline from '@material-ui/core/CssBaseline';

const drawerWidth = 120;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        
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
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Grid justify="space-between" direction="row" container spacing={24}>
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
                <Toolbar />
                <div classname={classes.drawerContainer}>
                    <List>
                            <ListItem>
                                <NavLink to="/">
                                    <MenuItem selected="/">
                                        <ListItemText primary="Main" />
                                    </MenuItem>
                                </NavLink>
                            </ListItem>
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
            </main>
        </div>
    )

}

export default withRouter(MainNav);
