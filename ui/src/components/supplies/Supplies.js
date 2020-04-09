import React, { Component } from 'react'
import {Button, Modal, Row, Col, Form} from 'react-bootstrap'
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import Pagination from '../Pagination/Pagination';
import SupplList from './SupplyList';
 
const MY_API_KEY = "AIzaSyB_Idu-JfFY9FeTmEJO9mihrD5MUYvgMjw"

class Supplies extends Component{

    constructor(props){
        super(props);
        this.state = {
            supplies: [],
            currentLocation: this.props.currentLocation,
            modal: false,
            currentPage: 1,
            suppliesPerPage: 4,
            search: "",
            value: "",
        };
        this.addSupply = this.addSupply.bind(this)
        //console.log('In Campaign==>'+JSON.stringify(this.state));
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
    onOpenModal = () => { 
        this.setState({ modal: true });
    };

    onCloseModal = () => {
        this.setState({ modal: false });
        this.getSupplies();
    };
    componentDidMount() {
        this.getSupplies();
    }
    getSupplies(){
        fetch('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/supplies', {
            method: "GET",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
                //'apikey': 'ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
            })
        }).then(res => res.json())
            .then((data) => {
                this.setState({ supplies: data.supplies })
            })
            .catch(console.log)
    }
    addSupply(event){
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
        const {search, value} = this.state
        const indexOfLastSupply = this.state.currentPage * this.state.suppliesPerPage;
        const indexOfFirstSupply = indexOfLastSupply - this.state.suppliesPerPage;
        const currentSupplies = this.state.supplies.slice(indexOfFirstSupply, indexOfLastSupply);
        // currentSupplies.forEach(function (element) {
        //     element.timeDifference = timeDiffCalc(new Date(), element.createdTime);
        // });
        // Change page
        const paginate = pageNumber => this.setState({currentPage: pageNumber}) //setCurrentPage(pageNumber);
        return(
            <>
                <div className="supplies" >
                    <h4>Local Supplies</h4>
                    <span className="text-right" style={{float: 'right'}}>
                        <a href="#" onClick={this.onOpenModal}>
                            <img alt="Add New Supply" src="../img/plus.png" title="Add New Supply" />
                        </a>
                    </span>
                    <br/> <br/>
                    <SupplList supplies={currentSupplies} timeDiffCalc={this.timeDiffCalc} />

                    <Pagination
                        postsPerPage={this.state.suppliesPerPage}
                        totalPosts={this.state.supplies.length}
                        paginate={paginate}
                    />
                </div>
                <Modal
                show={this.state.modal}
                onHide={this.onCloseModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add local supply
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                                                            input: search,
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
                                                    <Form.Control type="text" name="storeName" value={value} onChange={this.handleInputChange} required placeholder="Name of the local store"/><br/>
                                                    </ReactGooglePlacesSuggest>
                                                )
                                            }
                                        />
                                            <Form.Control as="textarea" rows="3" name="description"  required  placeholder="Description, availability, count, etc. of the item"/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Button variant="primary" type="submit">
                                                Add Supply
                                            </Button>
                                            <Button onClick={this.onCloseModal} variant="secondary" style={{float: 'right'}}>Close</Button>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
    timeDiffCalc(dateFuture, dateNow){
        let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
        // calculate days
        const days = Math.floor(diffInMilliSeconds / 86400);
        diffInMilliSeconds -= days * 86400;
        console.log('calculated days', days);
        // calculate hours
        const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
        diffInMilliSeconds -= hours * 3600;
        console.log('calculated hours', hours);
        // calculate minutes
        const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
        diffInMilliSeconds -= minutes * 60;
        console.log('minutes', minutes);
        let difference = '';
        if (days > 0) {
            difference += (days === 1) ? `${days} day, ` : `${days} days, `;
        }
        if (hours > 0) {
            difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;
        }
        difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`; 
        return difference;
    }
}

export default Supplies;