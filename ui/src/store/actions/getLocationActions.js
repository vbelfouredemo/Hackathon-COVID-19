import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyB_Idu-JfFY9FeTmEJO9mihrD5MUYvgMjw");
Geocode.setLanguage("en");

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
                            // console.log("Address from getLocation: ", addressComponents);
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

                        var action = {
                            type: 'GET_LOCATION',
                            payload: { location }
                        }
                        resolve(position);
                        dispatch(action);
                    }
                )
            }, () => {
                reject();
                //reject(new Error('Permission denied'));
            });
        });
    }
};