import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { NavLink, withRouter, Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
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
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import RecentActorsIcon from '@material-ui/icons/RecentActors';

const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: 'none'
    },
    drawer: {
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.primary.main,
        textColor: 'white'

    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    icon: {
        color: 'white'
    },
    itemText: {
        color: 'white'
    }
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
                    <Divider />
                    <List>

                        <ListItem key={"main"} component={Link} to="/">
                            <ListItemIcon className={classes.icon}>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.itemText} primary="Main" />
                        </ListItem>
                        <ListItem key={"supplies"} component={Link} to="/supplies">
                            <ListItemIcon className={classes.icon}>
                                <ShoppingCartIcon />
                            </ListItemIcon>

                            <ListItemText className={classes.itemText} primary="Supplies" />

                        </ListItem>
                        <ListItem key={"movies"} component={Link} to="/movies">
                            <ListItemIcon className={classes.icon}>
                                <LocalMoviesIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.itemText} primary="Movies" />
                        </ListItem>

                        <ListItem key={"foods"} component={Link} to="/foods">
                            <ListItemIcon className={classes.icon}>
                                <FastfoodIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.itemText} primary="Foods" />
                        </ListItem>

                        <ListItem key={"foods"} component={Link} to="/aboutus">
                            <ListItemIcon className={classes.icon}>
                                <RecentActorsIcon />
                            </ListItemIcon>
                            <ListItemText className={classes.itemText} primary="AboutUs" />
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
