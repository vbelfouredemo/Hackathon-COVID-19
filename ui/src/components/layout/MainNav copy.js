import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
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
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import SearchIcon from '@material-ui/icons/Search';

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
    icon: {
        color: 'white'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
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
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Postal Code"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
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
                            <ListItemIcon className={classes.icon}>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Main" />
                        </ListItem>
                        <ListItem key={"supplies"} component={Link} to="/supplies">
                            <ListItemIcon className={classes.icon}>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Supplies" />
                        </ListItem>
                        <ListItem key={"movies"} component={Link} to="/movies">
                            <ListItemIcon className={classes.icon}>
                                <LocalMoviesIcon />
                            </ListItemIcon>
                            <ListItemText primary="Movies" />
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
