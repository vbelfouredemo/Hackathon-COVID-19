import React, { Component } from 'react'
//import {Button} from 'react-bootstrap';
//import Modal from 'react-modal';
import {Button, Modal, Row, Col, Form} from 'react-bootstrap'
//import Button from '@material-ui/core/Button';
//import ReactPaginate from 'react-paginate';

//import AddCampaign from './AddCampaign';
import Pagination from './Pagination';
import CampaignList from './CampaignList';
import Icon from '@material-ui/core/Icon';
class Campaigns extends Component{

    constructor(props){
        super(props);
        console.log('campaign', props.currentLocation)
        this.state = {
            campaigns: [],
            currentLocation: this.props.currentLocation,
            modal: false,
            filterModal: false,
            loading: false,
            currentPage: 1,
            camPaignsPerPage: 3
        };
        console.log('In Campaign==>'+JSON.stringify(this.state));
    };
    onOpenFilterModal = () => { 
        this.setState({ filterModal: true });
    };

    onCloseFilterModal = () => {
        this.setState({ filterModal: false });
        //this.refreshlist();
    };
    filterCampaign(event){
        event.preventDefault();
        const data = JSON.stringify({
            type : event.target.type.value,
            propValue : event.target.city.value
        });
        fetch('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/campaigns', {
            method: "POST",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
            }),
            body: data
        }).then(function(response) {
            if(response.ok) {
              alert('Campaign successfully added!');
              //document.getElementById("caddCampaignForm").reset();
            }
         }).then(function(data) { 
           //console.log(data)
         }).catch(console.log)
    }
    onOpenModal = () => { 
        this.setState({ modal: true });
    };

    onCloseModal = () => {
        this.setState({ modal: false });
        this.refreshlist();
    };
    addCampaign(event){
        event.preventDefault();
        const data = JSON.stringify({
            name : event.target.storeName.value,
            type : event.target.type.value,
            city : event.target.city.value,
            neighbourhood : event.target.neighbourhood.value,
            state : event.target.state.value,
            phone : event.target.phone.value,
            charityURL : event.target.url.value,
            statement : event.target.statement.value
        });
        fetch('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/campaigns', {
            method: "POST",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
            }),
            body: data
        }).then(function(response) {
            if(response.ok) {
              alert('Campaign successfully added!');
              //document.getElementById("caddCampaignForm").reset();
            }
         }).then(function(data) { 
           //console.log(data)
         }).catch(console.log)
    }
    render(){
        const {modal} = this.state;
        //const campaigns = this.state.campaigns;
        // Get current posts
        const indexOfLastCampaign = this.state.currentPage * this.state.camPaignsPerPage;
        const indexOfFirstCampaign = indexOfLastCampaign - this.state.camPaignsPerPage;
        const currentCampaigns = this.state.campaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);

        // Change page
        const paginate = pageNumber => this.setState({currentPage: pageNumber}) //setCurrentPage(pageNumber);
        return(
            <>
            <div className="campaigns" >
                <h4>Local businesses need your help</h4>
                <span className="text-left">
                    <a href="#" onClick={this.onOpenFilterModal}>
                        <img alt="donate" src="../img/filter.png" />
                    </a>
                </span>
                <span className="text-right" style={{float: 'right'}}>
                    <Button 
                        variant="primary"
                        onClick={this.onOpenModal}>
                        Add New Campaign
                    </Button>
                </span>
                <CampaignList campaigns={currentCampaigns}  />

                <Pagination
                    postsPerPage={this.state.camPaignsPerPage}
                    totalPosts={this.state.campaigns.length}
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
                        Add your local Business Campaign
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Row>
                            <Col>
                                <Form onSubmit={this.addCampaign} id="addCampaignForm">
                                    <Form.Group controlId="name" >
                                        <Form.Control type="text" name="storeName" required placeholder="Name of the local store"/><br/>
                                        <Form.Control as="select" name="type" placeholder="Type">
                                            <option value="">Select Type of the Place</option>
                                            <option value="restaurant">Restaurant</option>
                                            <option value="salon">Salon</option>
                                            <option value="spa">Spa</option>
                                            <option value="game">Game Center</option>
                                            <option value="theater">Theater</option>
                                        </Form.Control><br/>
                                        <Form.Control type="text" name="city" required placeholder="City of the local store"/><br/>
                                        <Form.Control type="text" name="neighbourhood" placeholder="Neighbourhood of the local store"/><br/>
                                        <Form.Control type="text" name="state" required placeholder="State of the local store"/><br/>
                                        <Form.Control type="text" name="phone"  placeholder="Phone of the local store"/><br/>
                                        <Form.Control type="" name="url" required placeholder="GoFundMe URL of the local store"/><br/>
                                        <Form.Control as="textarea" rows="3" name="statement"  required  placeholder="Campaign statement from owner"/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Campaign
                                        </Button>
                                        <Button onClick={this.onCloseModal} variant="secondary" style={{float: 'right'}}>Close</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={this.state.filterModal}
                onHide={this.onCloseModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add your Filter for local Business Campaign
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <Row>
                            <Col>
                                <Form onSubmit={this.filterCampaign} id="addCampaignFilter">
                                    <Form.Group controlId="name" >
                                        <Form.Control as="select" name="type" placeholder="Type">
                                            <option value="">Select Type of filter</option>
                                            <option value="name">Name</option>
                                            <option value="zipcode">Zipcode</option>
                                            <option value="neighbourhood">Neighbourhood</option>
                                            <option value="city">City</option>
                                            <option value="state">State</option>
                                        </Form.Control><br/>
                                        <Form.Control type="text" name="propValue" required placeholder="Value of the type"/><br/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Apply Filter
                                        </Button>
                                        <Button onClick={this.onCloseFilterModal} variant="secondary" style={{float: 'right'}}>Close</Button>
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
    componentDidMount() {
        this.refreshlist();
    }
    refreshlist(){
        fetch('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/campaigns', {
            method: "GET",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
                //'apikey': 'ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
            })
        }).then(res => res.json())
            .then((data) => {
                this.setState({ campaigns: data.campaigns })
            })
            .catch(console.log)
    }
    componentWillReceiveProps(props) {
        this.setState({ currentLocation: props.currentLocation });  
        console.log('updating props.............'+JSON.stringify(this.state));
    }
    //componentDidUpdate(prevProps){
        //console.log(this.state);
        //console.log(prevProps.state.campaigns);
        //this.refreshlist()
    //}

}


export default Campaigns