import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import NeededhelpItem from './NeededhelpItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import FilterListIcon from '@material-ui/icons/FilterList';
import Pagination from '../pagination/Pagination';
import {Button, Modal, Row, Col, Form} from 'react-bootstrap'

class Neededhelp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: '',
            long:'',
            zip: '',
            result: [],
            modal: false,
            filterModal: false,
            currentPage: 1,
            itmsPerPage: 3,
            loggedInUser:{
                name: props.currentUser.userDetails.name,
                email: props.currentUser.userDetails.email
            }
        }
        this.addIds = this.addIds.bind(this);
        this.removeIds = this.removeIds.bind(this);
        this.getData = this.getData.bind(this);
    }

    getData = () => {
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
            }
        };
        
        axios.get('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/neededHelp', options)
          .then(res => {
                var neededHelps = res.data.neededhelps;
                // neededHelps.forEach(function (element) {
                //     element.offeredHelpIds = ['test@gmail.com'];
                // });
                for(var i = 0; i < neededHelps.length; i++) {
                    var offeredHelpIds =  neededHelps[i].offeredHelpIds;
                    if (undefined !== offeredHelpIds){
                        if(offeredHelpIds.indexOf(this.state.loggedInUser.email) > -1){
                            neededHelps[i].signedUp = true;
                        }else{
                            neededHelps[i].signedUp = false;
                        }
                    }
                    var count = parseInt(neededHelps[i].count);
                    var offeredHelpCount = parseInt(neededHelps[i].offeredHelpCount);
                    if(count>0 &&  count>offeredHelpCount){
                        neededHelps[i].moreHelpNeeded = true;
                    }else{
                        neededHelps[i].moreHelpNeeded = false;
                    }
                }
                this.setState({ result: neededHelps});
          })
    }
    removeIds= (id, email) =>{ 
        var updatedData = new Object();
        var neededHelps = this.state.result;
        neededHelps.forEach(function (element) {
            if(element.id == id){
                if(updatedData.offeredHelpIds == 'undefined'){
                    updatedData.offeredHelpIds = ''
                }else{
                    updatedData.offeredHelpIds = element.offeredHelpIds.replace(email, '');
                }
                updatedData.offeredHelpCount = element.offeredHelpCount - 1;
            }
        });
        fetch('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/neededHelp/'+id, {
            method: "PUT",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
            }),
            body: JSON.stringify(updatedData)})
            .then(function(response) {
                if(response.ok) {
                  //alert('Successfully unsubscribed from the Help!');
                  //document.getElementById("caddCampaignForm").reset();
                  this.getData();
                }
             }).then(function(data) { 
               //console.log(data)
             }).catch(console.log)
    };
    addIds= (id, email) =>{ 
        // console.log('addIds..', id);
        var updatedData = new Object();
        var neededHelps = this.state.result;
        neededHelps.forEach(function (element) {
            if(element.id == id){
                if(updatedData.offeredHelpIds == 'undefined'){
                    updatedData.offeredHelpIds = email
                }else{
                    updatedData.offeredHelpIds = element.offeredHelpIds+','+email;
                }
                updatedData.offeredHelpCount = element.offeredHelpCount + 1;
            }
        });
        fetch('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/neededHelp/'+id, {
            method: "PUT",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
            }),
            body: JSON.stringify(updatedData)})
            .then(function(response) {
                if(response.ok) {
                  //alert('Thank you the your offer to help. You will be contacted by the organizer!');
                  this.getData();
                  //document.getElementById("caddCampaignForm").reset();
                }
             }).then(function(data) { 
               //console.log(data)
             }).catch(console.log)
    };
    componentDidMount = () => {
        this.getData();
    }
    onOpenModal = () => { 
        this.setState({ modal: true });
    };

    onCloseModal = () => {
        this.setState({ modal: false });
        this.getData();
    };
    addHelp(event){
        event.preventDefault();
        var count = (event.target.count.value != undefined && event.target.count.value !='0')? parseInt(event.target.count.value):0;
        const data = JSON.stringify({
            name : event.target.title.value,
            zipcode : parseInt(event.target.zipcode.value),
            phone : event.target.phone.value,
            count : count,
            url : event.target.url.value,
            missionStatement : event.target.missionStatement.value,
            offeredHelpCount:0
        });
        fetch('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/neededHelp', {
            method: "POST",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
            }),
            body: data
        }).then(function(response) {
            if(response.ok) {
              alert('Help successfully added!');
              //document.getElementById("caddCampaignForm").reset();
            }
         }).then(function(data) { 
           //console.log(data)
         }).catch(console.log)
    }

    render() {
        // console.log("this.state.result: ", this.state.result);
        const indexOfLastItem = this.state.currentPage * this.state.itmsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itmsPerPage;
        const currentItems = this.state.result.slice(indexOfFirstItem, indexOfLastItem);
        // console.log('currentItems', currentItems);  
         // Change page
         const paginate = pageNumber => this.setState({currentPage: pageNumber})

        return(
            <Card elevation={4}>
                <CardHeader title="People/organizations need help"/>
                <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                    <CardActions>
                        <Tooltip title="Add a New item">
                            <IconButton aria-label="Add a New item" onClick={this.onOpenModal}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Grid>
                <CardContent>
                    <div className="neededhelp-list section">
                        <NeededhelpItem items={currentItems} loggedInUser={this.state.loggedInUser} removeIds={this.removeIds} addIds={this.addIds} />
                        <Pagination
                            postsPerPage={this.state.itmsPerPage}
                            totalPosts={this.state.result.length}
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
                            Add a new help
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <Row>
                                <Col>
                                    <Form onSubmit={this.addHelp} id="neededHelpForm">
                                        <Form.Group controlId="name" >
                                            <Form.Control type="text" name="title" required placeholder="Short description of the type of help"/><br/>
                                            <Form.Control type="number" name="zipcode" required placeholder="Zipcode where the help needed"/><br/>
                                            <Form.Control type="text" name="phone"  placeholder="Phone number to contact"/><br/>
                                            <Form.Control type="number" name="count" placeholder="Expected count of volunteer for this job(if applicable)"/><br/>
                                            <Form.Control type="text" name="url" placeholder="URL for more details"/><br/>
                                            <Form.Control as="textarea" rows="3" name="missionStatement"  required  placeholder="Mission statement from the organizer"/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Button variant="primary" type="submit">
                                                Add Help
                                            </Button>
                                            <Button onClick={this.onCloseModal} variant="secondary" style={{float: 'right'}}>Close</Button>
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        </div>
                    </Modal.Body>
                </Modal>
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentLocation: state.currentLocation,
        currentUser: state.userDetails
    }
}

export default connect(mapStateToProps)(Neededhelp);

