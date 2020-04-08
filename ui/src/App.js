import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppBar from './components/layout/AppBar';
import Dashboard from './components/dashboard/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePosition } from 'use-position';
import Geocode from "react-geocode"
Geocode.setApiKey("AIzaSyB_Idu-JfFY9FeTmEJO9mihrD5MUYvgMjw");
Geocode.setLanguage("en");

class App extends Component {
  state = {
    currentLocation : {
      city: '',
      zipcode: '',
      neighbourhood: '',
      sublocality: '',
      lat: '',
      lng:''
    }
  }

  getLocation(){ 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  
  showPosition =(position) =>{
    var latitude, longitude, neighbourhood, sublocality, city, zipcode;
    
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    Geocode.fromLatLng(latitude, longitude).then(
      response => {
        const addressComponents = response.results[0].address_components;
        //console.log(addressComponents);
        if(addressComponents !=null){
            for(var i = 0; i < addressComponents.length; i++) {
                var obj = addressComponents[i];
                var types = obj.types;
              if(types.indexOf('neighborhood') > -1){
                  neighbourhood = obj.long_name;
              }else if(types.indexOf('locality') > -1){
                  city = obj.long_name;
              }else if(types.indexOf('administrative_area_level_1') > -1){
                sublocality = obj.long_name;
              }else if(types.indexOf('postal_code') > -1){
                  zipcode = obj.long_name;
              }
          } 
          this.setState({currentLocation : {
            city: city,
            zipcode: zipcode,
            neighbourhood: neighbourhood,
            sublocality: sublocality,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }});
        }
        //console.log(addressComponents);
      },
      error => {
        console.error(error);
      }
      );
      //console.log('details from geocode api '+ JSON.stringify(this.state.currentLocation));
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppBar currentLocation={this.state.currentLocation}/>
          <Dashboard currentLocation={this.state.currentLocation}/>
        </div>
      </BrowserRouter>
    )
  }

  
}

export default App;
