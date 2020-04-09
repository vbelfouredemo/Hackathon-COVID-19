import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import OfferedhelpItem from './OfferedhelpItem';
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

class OfferedHelp extends Component {

    state = {
        lat: '',
        long:'',
        zip: '',
        result: [],
        modal: false,
        filterModal: false,
        currentPage: 1,
        itmsPerPage: 3,
        loggedInUser:{
            name: 'Krishanu Maity',
            email: 'test@gmail.com'
        }
    }

    getData = () => {
        const options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
            }
        };
        
        axios.get('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/offeredHelp', options)
          .then(res => {
                var offeredHelps = res.data.offeredhelps;
                this.setState({ result: offeredHelps});
                console.log("offeredHelps: ", offeredHelps);
          })
    }
    removeIds(id)  { 
        console.log('removeIds..', id);
    };
    addIds(id){ 
        console.log('addIds..', id);
        var updatedHelp;
        var neededHelps = this.state.result;
       
        fetch('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/offeredHelp/'+id, {
            method: "PUT",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'Authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
            }),
            body: updatedHelp
        }).then(function(response) {
            if(response.ok) {
              alert('Help successfully added!');
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
    addOfferedHelp(event){
        event.preventDefault();
        const data = JSON.stringify({
            name : event.target.title.value,
            zipcode : event.target.zipcode.value,
            phone : event.target.phone.value,
            type : event.target.type.value,
            description : event.target.description.value,
        });
        fetch('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/offeredHelp', {
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
        console.log("this.state.result: ", this.state.result);
        const indexOfLastItem = this.state.currentPage * this.state.itmsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itmsPerPage;
        const currentItems = this.state.result.slice(indexOfFirstItem, indexOfLastItem);
        console.log('currentItems', currentItems);  
         // Change page
         const paginate = pageNumber => this.setState({currentPage: pageNumber})

        return(
            <Card variant="outlined">
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
                        <OfferedhelpItem items={currentItems} loggedInUser={this.state.loggedInUser} removeIds={this.removeIds} addIds={this.addIds}/>
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
                                    <Form onSubmit={this.addOfferedHelp} id="neededHelpForm">
                                        <Form.Group controlId="name" >
                                            <Form.Control type="text" name="title" required placeholder="Short description of the type of help"/><br/>
                                            <Form.Control type="number" name="zipcode" required placeholder="Zipcode if the help is associated with an area"/><br/>
                                            <Form.Control type="text" name="phone"  placeholder="Phone number to contact"/><br/>
                                            <Form.Control type="text" name="type" placeholder="What type of help, e.g. grocery, tutor, etc."/><br/>
                                            <Form.Control as="textarea" rows="3" name="description"  required  placeholder="Enter a long description of the help you are offering"/>
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
        currentLocation: state.currentLocation
    }
}

export default connect(mapStateToProps)(OfferedHelp);