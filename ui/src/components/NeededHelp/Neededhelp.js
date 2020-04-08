import React, { Component } from 'react';
import axios from 'axios';
import NeededhelpItem from './NeededhelpItem';
import Pagination from '../Pagination/Pagination';
import {Button, Modal, Row, Col, Form} from 'react-bootstrap'
class Neededhelp extends Component {

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
        
        axios.get('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/neededHelp', options)
          .then(res => {
                var neededHelps = res.data.neededhelps;
                // neededHelps.forEach(function (element) {
                //     element.offeredhelpIds = ['test@gmail.com'];
                // });
                for(var i = 0; i < neededHelps.length; i++) {
                    var offeredhelpIds =  neededHelps[i].offeredhelpIds;
                    if (undefined !== offeredhelpIds){
                        if(offeredhelpIds.indexOf(this.state.loggedInUser.email) > -1){
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
                console.log("Neededhelp: ", neededHelps);
          })
    }
    removeIds(id)  { 
        console.log('removeIds..', id);
    };
    addIds(id){ 
        console.log('addIds..', id);
    };
    componentDidMount = () => {
        this.getData();
    }
    onOpenModal = () => { 
        this.setState({ modal: true });
    };

    onCloseModal = () => {
        this.setState({ modal: false });
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
              this.getData();
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
            <>
            <div className="neededhelp-list section">
                <h4>People/organizations need help</h4>
                <span className="text-right" style={{float: 'right'}}>
                    <a href="#" onClick={this.onOpenModal}>
                        <img alt="Add New Campaign" src="../img/plus.png" title="Add a New Item" />
                    </a>
                </span>
                <br/> <br/>
                <NeededhelpItem items={currentItems} loggedInUser={this.state.loggedInUser} removeIds={this.removeIds} addIds={this.addIds}/>
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
        </>
        )
    }
}

export default Neededhelp;