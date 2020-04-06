import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Modal, Row, Col, Form} from 'react-bootstrap'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    leftText: {
        textAlign: "left"
    },
    rightText: {
        textAlign: "right"
    }
}));
class NavBar extends Component{
//export default function NavBar(props) {
//const NavBar = (props) =>{
   //console.log('current1 ==='+props.currentLocation.lat);
   constructor(props) {
        super(props);
        this.state = {
            modal: false,
            currentLocation: this.props.currentLocation
        };
    }
    onOpenModal = () => { 
        this.setState({ modal: true });
    };

    onCloseModal = () => {
        this.setState({ modal: false });
    };
    changeLocation= (event) =>{
        event.preventDefault();
        const newLocation = {
            zipcode : event.target.zipcode.value,
            state : event.target.state.value,
            city : event.target.city.value,
            neighbourhood : event.target.neighbourhood.value
        };
        this.setState({currentLocation:newLocation});
        this.setState({ modal: false });
    }
    componentWillReceiveProps(props) {
        //console.log('updating props.............')
        this.setState({ currentLocation: props.currentLocation });  
    }
    render(){
        const {modal} = this.state;
        return(
            <>
            <div >
               <AppBar position="static">
                   <Toolbar>
                       <Typography variant="h6" style={{ marginRight: 700 }}>
                       The Social Isolation Blues Brothers Dashboard
                       </Typography>
                       <Typography >
                              Your location: {this.state.currentLocation.neighbourhood}, {this.state.currentLocation.city}, {this.state.currentLocation.zipcode}
                       </Typography>
                       <Button variant="outlined" color="inherit" style={{ marginLeft: 10 }} onClick={this.onOpenModal}>
                        Change Location
                       </Button>
                   </Toolbar>
               </AppBar>
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
                   Change your location
               </Modal.Title>
           </Modal.Header>
           <Modal.Body>
               <div className="container">
                   <Row>
                       <Col>
                           <Form onSubmit={this.changeLocation} id="addLocationForm">
                               <Form.Group controlId="name" >
                                   <Form.Control type="text" name="zipcode" required placeholder="Zipcode"/><br/>
                                   <Form.Control type="text" name="city" required placeholder="City"/><br/>
                                   <Form.Control type="text" name="neighbourhood" required placeholder="Neighbourhood"/><br/>
                                   <Form.Control type="text" name="state" required placeholder="State"/><br/>
                               </Form.Group>
                               <Form.Group>
                                   <Button variant="primary" type="submit">
                                       Change Location
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
       );
   }
}

export default NavBar;