import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyB_Idu-JfFY9FeTmEJO9mihrD5MUYvgMjw");
Geocode.setLanguage("en");

/*
export const getLocation = (location) => {
    return (dispatch, getState) => {
        // make call
        if (navigator.geolocation) {
            const location = getState().currentLocation;
            console.log("Geolocation is supported by this browser.");
            navigator.geolocation.getCurrentPosition(
                function displayLocationInfo (position) {
                    Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                        response => {
                            const addressComponents = response.results[0].address_components;
                            if (addressComponents != null) {
                                for (var i = 0; i < addressComponents.length; i++) {
                                    var obj = addressComponents[i];
                                    var types = obj.types;
                                    if (types.indexOf('neighborhood') > -1) {
                                        location.neighbourhood = obj.long_name;
                                    } else if (types.indexOf('locality') > -1) {
                                        location.city = obj.long_name;
                                    } else if (types.indexOf('administrative_area_level_1') > -1) {
                                        location.sublocality = obj.long_name;
                                    } else if (types.indexOf('postal_code') > -1) {
                                        location.zipcode = obj.long_name;
                                    }
                                }
                            }
                            location.lat = position.coords.latitude;
                            location.lng = position.coords.longitude;
                            console.log("location from getLocation: ", location);
                            dispatch({ type: 'GET_LOCATION', location });
                        },
                        error => {
                            console.error(error);
                        }
                    )
                }
            )
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
};
*/

export const getLocation = () => {
    return function (dispatch, getState) {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
            }
            navigator.geolocation.getCurrentPosition((position) => {
                const location = getState();
                Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                    response => {
                        const addressComponents = response.results[0].address_components;
                        if (addressComponents != null) {
                            for (var i = 0; i < addressComponents.length; i++) {
                                var obj = addressComponents[i];
                                var types = obj.types;
                                if (types.indexOf('neighborhood') > -1) {
                                    location.neighbourhood = obj.long_name;
                                } else if (types.indexOf('locality') > -1) {
                                    location.city = obj.long_name;
                                } else if (types.indexOf('administrative_area_level_1') > -1) {
                                    location.sublocality = obj.long_name;
                                } else if (types.indexOf('postal_code') > -1) {
                                    location.zipcode = obj.long_name;
                                }
                            }
                        }
                        location.lat = position.coords.latitude;
                        location.lng = position.coords.longitude;
                        console.log("Location 1 from action: ", JSON.stringify(location));

                        var action = {
                            type: 'GET_LOCATION',
                            payload: { location }
                        }
                        resolve(position);
                        dispatch(action);
                    }
                )
            }, () => {
                reject(new Error('Permission denied'));
            });
        });
    }
};