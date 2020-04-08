const initState = {
    currentLocation: {
        city: '',
        zipcode: '',
        neighbourhood: '',
        sublocality: '',
        lat: '',
        lng: ''
    }
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_LOCATION':
            console.log("Running GET_LOCATION: ", action.payload);
            return {
                ...state,
                currentLocation: action.payload.location
            }
        case 'UPDATE_LOCATION':
            return {
                currentLocation: action.payload.location
            }
        default:
            console.log('Default reducer action');
            return {...state}
    }
}

export default rootReducer

