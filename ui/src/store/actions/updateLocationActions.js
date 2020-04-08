import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyB_Idu-JfFY9FeTmEJO9mihrD5MUYvgMjw");
Geocode.setLanguage("en");

export const updateLocation = (location) => {
    return (dispatch, getState) => {

        dispatch({ type: 'UPDATE_LOCATION', location });
    }
};
