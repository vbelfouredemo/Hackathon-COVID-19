import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { connect } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import { updateLocation } from '../../store/actions/updateLocationActions';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '10ch',
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
            width: '10ch',
            '&:focus': {
                width: '10ch',
            },
        },
    },

}));

const SearchBar = (props) => {
    const [location, setLocation] = useState('')
    const classes = useStyles();

    const handleSubmit = (e) => {
        if (e.key === 'Enter') {
            props.updateLocation(location);
            setLocation('');
        } else {
            return;
        }
    }

    const handleOnChange = (e) => {
        setLocation(e.target.value)
    }

    return (
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
                onChange={handleOnChange}
                onKeyPress={handleSubmit}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        updateLocation: (location) => dispatch(updateLocation(location))
    }
}

export default connect(null, mapDispatchToProps)(SearchBar);