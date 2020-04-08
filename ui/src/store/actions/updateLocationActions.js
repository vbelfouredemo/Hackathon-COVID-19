import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyB_Idu-JfFY9FeTmEJO9mihrD5MUYvgMjw");
Geocode.setLanguage("en");

export const updateLocation = (zip) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const location = getState();
            Geocode.fromAddress(zip).then(
                response => {
                    const addressComponents = response.results[0].address_components;
                    console.log("Address from updateLocation: ", response);
                    if (addressComponents != null) {
                        for (var i = 0; i < addressComponents.length; i++) {
                            var obj = addressComponents[i];
                            var types = obj.types;
                            if (types.indexOf('neighborhood') > -1) {
                                location.neighbourhood = obj.long_name;
                            } else if (types.indexOf('locality') > -1) {
                                location.city = obj.long_name;
                            } else if (types.indexOf('sublocality') > -1) {
                                location.city = obj.long_name;
                            } else if (types.indexOf('administrative_area_level_1') > -1) {
                                location.sublocality = obj.long_name;
                            } else if (types.indexOf('postal_code') > -1) {
                                location.zipcode = obj.long_name;
                            }
                        }
                    }
                    const geometryComponents = response.results[0].geometry;
                    if (geometryComponents.location != null) {
                        location.lat = geometryComponents.location.lat || '';
                        location.lng = geometryComponents.location.lng || '';
                    }

                    var action = {
                        type: 'UPDATE_LOCATION',
                        payload: { location }
                    }
                    //resolve(position);
                    dispatch(action);
                }, () => {
                    reject(new Error('Permission denied'));


                });
            });
        }
};