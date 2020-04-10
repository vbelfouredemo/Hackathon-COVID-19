import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Button, Modal, Row, Col, Form} from 'react-bootstrap'
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import Pagination from '../pagination/Pagination';
import SupplList from './SupplyList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
const MY_API_KEY = "AIzaSyB_Idu-JfFY9FeTmEJO9mihrD5MUYvgMjw"
class AddSupply extends Component{
    constructor(props){
        super(props);
        this.state = {
            supplies: [],
            search: "",
            value: "",
        };
        //console.log('In Campaign==>'+JSON.stringify(this.state));
        this.addSupply=this.addSupply.bind(this);

    };
    handleInputChange = e => {
        this.setState({search: e.target.value, value: e.target.value})
    }
 
    handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
        console.log(geocodedPrediction, originalPrediction) // eslint-disable-line
        var neighbourhood, state, city, zipcode;
        const addressComponents = geocodedPrediction.address_components;
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
                    state = obj.long_name;
                }else if(types.indexOf('postal_code') > -1){
                    zipcode = obj.long_name;
                }
            } 
        }
        this.setState({
            search: "",
            value: originalPrediction.structured_formatting.main_text,
            formattedAddress: geocodedPrediction.formatted_address,
            city: city,
            state: state,
            zipcode: zipcode,
            neighbourhood: neighbourhood,
            googlePlaceId: geocodedPrediction.place_id,
            types: geocodedPrediction.types            
        })
    }
    
    handleNoResult = () => {
        console.log("No results for ", this.state.search)
    }
    
    handleStatusUpdate = status => {
        console.log(status)
    }
    addSupply(event){
        //console.log('state', this.state);
        event.preventDefault();
        const data = JSON.stringify({
            storeName : event.target.storeName.value,
            //types : this.state.types,
            description : event.target.description.value,
            //neighbourhood : this.state.neighbourhood,
            state : this.state.state,
            city : this.state.city,
            zipcode : this.state.zipcode,
            formattedAddress : this.state.formattedAddress,
            googlePlaceId: this.state.googlePlaceId,
            createdTime: new Date()
        });
        console.log('supplies', data)
        fetch('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/supplies', {
            method: "POST",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
            }),
            body: data
        }).then(function(response) {
            if(response.ok) {
              alert('Local supply added successfully!');
              //document.getElementById("caddCampaignForm").reset();
            }
         }).then(function(data) { 
           console.log(data)
         }).catch(console.log)

    }
    render(){
        return(
            <Card variant="outlined">
                <CardHeader title="Add Local Supply"/>
                <CardContent>
                    <div className="container">
                        <Row>
                            <Col>
                                <Form onSubmit={this.addSupply} id="addSupplyForm">
                                    <Form.Group controlId="name" >
                                    <ReactGoogleMapLoader
                                        params={{
                                            key: MY_API_KEY,
                                            libraries: "places,geocode",
                                        }}
                                        render={googleMaps =>
                                            googleMaps && (
                                                <ReactGooglePlacesSuggest
                                                    googleMaps={googleMaps}
                                                    autocompletionRequest={{
                                                        input: this.state.search,
                                                        // Optional options
                                                        // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                                                    }}
                                                    // Optional props
                                                    onNoResult={this.handleNoResult}
                                                    onSelectSuggest={this.handleSelectSuggest}
                                                    onStatusUpdate={this.handleStatusUpdate}
                                                    textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                                                    customRender={prediction => (
                                                        <div className="customWrapper">
                                                            {prediction
                                                                ? prediction.description
                                                                : "My custom no results text"}
                                                        </div>
                                                    )}
                                                >
                                                <Form.Control type="text" name="storeName" value={this.state.value} onChange={this.handleInputChange} required placeholder="Name of the local store"/><br/>
                                                </ReactGooglePlacesSuggest>
                                            )
                                        }
                                    />
                                        <Form.Control as="textarea" rows="3" name="description"  required  placeholder="Description, availability, count, etc. of the item"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button onClick={()=>this.setState({search: '', value: ''})} variant="secondary" style={{float: 'right'}}>Close</Button>
                                        <Button variant="primary" type="submit">
                                            Add Supply
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentLocation: state.currentLocation
    }
}

export default connect(mapStateToProps)(AddSupply);