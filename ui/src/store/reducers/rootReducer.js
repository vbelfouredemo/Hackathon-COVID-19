const initState = {
    currentLocation: {
        city: '',
        zipcode: '',
        neighbourhood: '',
        sublocality: '',
        lat: '',
        lng: ''
    },
    userDetails: {
        userDetails: '',
        isUserloggedIn: false
    }
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_LOCATION':
            return {
                ...state,
                currentLocation: action.payload.location
            }
        case 'UPDATE_LOCATION':
            return {
                ...state,
                currentLocation: action.payload.location
            }
        case 'USER_LOGGED_IN':
            return{
                ...state,
                userDetails: action.payload.userDetails
            }
        case 'USER_LOGGED_OUT':
            return {
                ...state,
                userDetails: action.payload.userDetails
            }
        default:
            return {...state}
    }
}

export default rootReducer

