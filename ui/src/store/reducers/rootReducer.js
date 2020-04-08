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
            return {
                ...state,
                currentLocation: action.payload.location
            }
        case 'UPDATE_LOCATION':
            return {
                ...state,
                currentLocation: action.payload.location
            }
        default:
            return {...state}
    }
}

export default rootReducer

