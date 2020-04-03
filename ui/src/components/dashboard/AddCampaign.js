import React, {Component} from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'

class AddCampaign extends Component{
    /*constructor(props){
        super(props);
    }*/

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
        fetch('http://localhost:8080/api/mongo/campaigns', {
            method: "POST",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'Authorization': 'Basic QnhnTG5OaDF4UnluOTlPdnBPaVd1SUdMZi9pL0NqZDA6'
            }),
            body: data
        }).then(function(response) {
            if(response.ok) {
              alert('Campaign successfully added!');
              document.getElementById("caddCampaignForm").reset();
            }
         }).then(function(data) { 
           console.log(data)
         }).catch(console.log)

        
    }
    render(){
        console.log('###>'+this.props)
        return(
            <Modal
                {...this.props}
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
        )
    }
}

export default AddCampaign