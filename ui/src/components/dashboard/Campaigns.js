import React, { Component } from 'react'
import ShowMoreText from 'react-show-more-text';
//import {Button} from 'react-bootstrap';
//import Modal from 'react-modal';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
//import AddCampaign from './AddCampaign';


class Campaigns extends Component{

    constructor(props){
        super(props)
        this.state = {
            campaigns: [],
            modal: false
        };
    }
    onOpenModal = () => { 
        this.setState({ modal: true });
    };

    onCloseModal = () => {
        this.setState({ modal: false });
    };
    render(){
        const {modal} = this.state;
        const campaigns = this.state.campaigns;
       //alert({modal});
       // let addModalClose = () => this.setState({campaignModalOpened: false});
        let addModalCampaignAdded = () => this.refreshList();
        const campaignList = campaigns.map(campaign  => {
            return(
                <div className="campaign-body" key={campaign.id} >
                    <h5 className="campaign-name">
                        {campaign.name} &nbsp;
                        <img src={`../img/${campaign.type}.png`}></img>
                    </h5>
                    <h6 className="campaign-location">{campaign.city}, {campaign.neighbourhood}, {campaign.state}, P:{campaign.phone} </h6>
                    <ShowMoreText lines={2} more='Show more' less='Show less' anchorClass='' expanded={false} width={window.width}>
                        {campaign.statement}
                    </ShowMoreText>
                    <a href={campaign.charityURL} target="_blank" >
                        <b>Make a donation</b>
                    </a>
                    <hr></hr>
                </div>
            )
        })
        return(
            <>
            <div className="campaigns" >
                <h4>Local businesses need your help</h4>
                <div className="text-right">
                <Button 
                    variant = 'primary' 
                    onClick={this.onOpenModal}>
                        Add New Campaign
                    </Button>
                </div>
                {campaignList}
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
                                        <Button onClick={this.props.onHide} variant="secondary" style={{float: 'right'}}>Close</Button>
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
    //componentDidUpdate(prevProps){
        //console.log(this.state);
        //console.log(prevProps.state.campaigns);
        //this.refreshlist()
    //}

}


export default Campaigns