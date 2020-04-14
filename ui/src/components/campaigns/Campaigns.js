import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, Row, Col, Form } from 'react-bootstrap'
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Pagination from '../pagination/Pagination';
import CampaignList from './CampaignList';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ClearIcon from '@material-ui/icons/Clear';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';

class Campaigns extends Component {

    constructor(props) {
        super(props);
        this.state = {
            originalCampaigns: [],
            campaigns: [],
            modal: false,
            filterModal: false,
            loading: false,
            currentPage: 1,
            camPaignsPerPage: 4
            //currentLocation: props.currentLocation
        };
        this.filterCampaign = this.filterCampaign.bind(this);
        //this.showLocalOnly = this.showLocalOnly.bind(this);
        // console.log('campaign', props.currentLocation)
    };

    showLocalOnly = () =>{
        var currentLocation = this.props.currentLocation;
        var originalCampaigns = this.state.originalCampaigns;
        //console.log(originalCampaigns);
        var localCampains = [];
        originalCampaigns.forEach(function (campaign) {
            if(currentLocation != 'undefined'){ 
                if((campaign.city == currentLocation.city)||
                (campaign.city == currentLocation.neighbourhood)||
                (campaign.neighbourhood == currentLocation.neighbourhood)||
                (campaign.neighbourhood == currentLocation.city)||
                (campaign.zipcode == currentLocation.zipcode)){
                    localCampains.push(campaign);
                }
            }
        });
        this.setState({ campaigns: localCampains})
        //console.log(localCampains);
    }

    clearLocal = () =>{
        var originalCampaigns = this.state.originalCampaigns;
        this.setState({ campaigns: originalCampaigns})
    }

    onOpenFilterModal = () => {
        this.setState({ filterModal: true });
    };

    onCloseFilterModal = () => {
        this.setState({ filterModal: false });
    };
    filterCampaign = (event) => {
        event.preventDefault();
        var type = event.target.type.value;
        var propValue = event.target.propValue.value;
        const newData ={};
        newData[type] = propValue;
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
            }
        };
        axios.get('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/campaigns/query?where='+JSON.stringify(newData), options)
          .then(res => {
                this.setState({ campaigns: res.data.campaigns });
                this.onCloseFilterModal();
          })
    }
    onOpenModal = () => {
        this.setState({ modal: true });
    };

    onCloseModal = () => {
        this.setState({ modal: false });
        this.refreshlist();
    };
    addCampaign(event) {
        event.preventDefault();
        const data = JSON.stringify({
            name: event.target.storeName.value,
            type: event.target.type.value,
            city: event.target.city.value,
            neighbourhood: event.target.neighbourhood.value,
            state: event.target.state.value,
            phone: event.target.phone.value,
            charityURL: event.target.url.value,
            statement: event.target.statement.value
        });
        fetch('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/campaigns', {
            method: "POST",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
            }),
            body: data
        }).then(function (response) {
            if (response.ok) {
                alert('Campaign successfully added!');
                //document.getElementById("caddCampaignForm").reset();
            }
        }).then(function (data) {
            //console.log(data)
        }).catch(console.log)
    }
    render() {
        //console.log('this.props.currentLocation', this.props.currentLocation)
        const { modal } = this.state;
        //const campaigns = this.state.campaigns;
        // Get current posts
        const indexOfLastCampaign = this.state.currentPage * this.state.camPaignsPerPage;
        const indexOfFirstCampaign = indexOfLastCampaign - this.state.camPaignsPerPage;
        const currentCampaigns = this.state.campaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);

        // Change page
        const paginate = pageNumber => this.setState({ currentPage: pageNumber }) //setCurrentPage(pageNumber);
        return (
            <>
                
                <Card variant="outlined">
                    <CardHeader
                        title="Local businesses need your help"
                    />
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <CardActions>
                            <Tooltip title="Clear local Campaigns filter">
                                <IconButton aria-label="Clear local Campaigns filter" onClick={this.clearLocal}>
                                    <ClearIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Filter only local Campaigns ">
                                <IconButton aria-label="Filter only local Campaigns" onClick={this.showLocalOnly}>
                                    <LocalOfferIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Filter Campaigns">
                                <IconButton aria-label="Filter Campaigns" onClick={this.onOpenFilterModal}>
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Add New Campaign">
                                <IconButton aria-label="Add New Campaign" onClick={this.onOpenModal}>
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                    </Grid>
                    <CardContent>
                    {(this.state.campaigns != 'undefined' && this.state.campaigns.length>0)?
                            <div>
                                <CampaignList campaigns={currentCampaigns} />
    
                                <Pagination
                                    postsPerPage={this.state.camPaignsPerPage}
                                    totalPosts={this.state.campaigns.length}
                                    paginate={paginate}
                                />
                            </div>
                        :<p>Sorry, there is no item in your local area. Either remove filter to see the entire list 
                        or change your current location</p>
                    }
                    </CardContent>
                </Card>
                
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
                                            <Form.Control type="text" name="storeName" required placeholder="Name of the local store" /><br />
                                            <Form.Control as="select" name="type" placeholder="Type">
                                                <option value="">Select Type of the Place</option>
                                                <option value="restaurant">Restaurant</option>
                                                <option value="salon">Salon</option>
                                                <option value="spa">Spa</option>
                                                <option value="game">Game Center</option>
                                                <option value="theater">Theater</option>
                                            </Form.Control><br />
                                            <Form.Control type="text" name="city" required placeholder="City of the local store" /><br />
                                            <Form.Control type="text" name="neighbourhood" placeholder="Neighbourhood of the local store" /><br />
                                            <Form.Control type="text" name="state" required placeholder="State of the local store" /><br />
                                            <Form.Control type="text" name="phone" placeholder="Phone of the local store" /><br />
                                            <Form.Control type="" name="url" required placeholder="GoFundMe URL of the local store" /><br />
                                            <Form.Control as="textarea" rows="3" name="statement" required placeholder="Campaign statement from owner" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Button variant="primary" type="submit">
                                                Add Campaign
                                        </Button>
                                            <Button onClick={this.onCloseModal} variant="secondary" style={{ float: 'right' }}>Close</Button>
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
                                                <option value="neighbourhood">Neighbourhood</option>
                                                <option value="city">City</option>
                                                <option value="state">State</option>
                                            </Form.Control><br />
                                            <Form.Control type="text" name="propValue" required placeholder="Value of the type" /><br />
                                        </Form.Group>
                                        <Form.Group>
                                            <Button variant="primary" type="submit">
                                                Apply Filter
                                        </Button>
                                            <Button onClick={this.onCloseFilterModal} variant="secondary" style={{ float: 'right' }}>Close</Button>
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
    refreshlist() {
        //const currentLocation = this.props.currentLocation;
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
                const campaigns = data.campaigns;
                this.setState({ campaigns: campaigns, originalCampaigns: campaigns});
                console.log(campaigns);
            })
            .catch(console.log)
    }


}

const mapStateToProps = (state) => {
    return {
        currentLocation: state.currentLocation
    }
}

export default connect(mapStateToProps)(Campaigns)