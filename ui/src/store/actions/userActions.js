export const userLogin = (userDetails) => {
    return function (dispatch) {
        var action = {
            type: 'USER_LOGGED_IN',
            payload: { userDetails }
        }
        dispatch(action);
    }
}

export const userLogout = (userDetails) => {
    return function (dispatch) {
        var action = {
            type: 'USER_LOGGED_OUT',
            payload: { userDetails }
        }
        dispatch(action);
    }
}