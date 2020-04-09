import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, Row, Col, Form } from 'react-bootstrap'
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';

const MY_API_KEY = "AIzaSyB_Idu-JfFY9FeTmEJO9mihrD5MUYvgMjw"

class Supplies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            supplies: [],
            currentLocation: this.props.currentLocation,
            modal: false,
            currentPage: 1,
            camPaignsPerPage: 4,
            search: "",
            value: "",
        };
        //console.log('In Campaign==>'+JSON.stringify(this.state));
    };
    handleInputChange = e => {
        this.setState({ search: e.target.value, value: e.target.value })
    }

    handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
        console.log(geocodedPrediction, originalPrediction) // eslint-disable-line
        this.setState({
            search: "",
            value: originalPrediction.structured_formatting.main_text,
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
        //this.refreshlist();
    };
    addSupply(event) {
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
        fetch('http://localhost:8080/api/mongo/supplies', {
            method: "POST",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'Authorization': 'Basic QnhnTG5OaDF4UnluOTlPdnBPaVd1SUdMZi9pL0NqZDA6'
            }),
            body: data
        }).then(function (response) {
            if (response.ok) {
                alert('Campaign successfully added!');
                document.getElementById("caddCampaignForm").reset();
            }
        }).then(function (data) {
            console.log(data)
        }).catch(console.log)


    }
    render() {
        const { search, value } = this.state
        return (
            <>
                <Card variant="outlined">
                    <CardHeader
                        title="Local Supplies"
                    />
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <CardActions>
                            <Tooltip title="Add New Supply">
                                <IconButton aria-label="Add New Supply" onClick={this.onOpenModal}>
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                    </Grid>
                    <CardContent>
                        List of supplies goes here
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
                                                            <Form.Control type="text" name="storeName" value={value} onChange={this.handleInputChange} required placeholder="Name of the local store" /><br />
                                                        </ReactGooglePlacesSuggest>
                                                    )
                                                }
                                            />
                                            <Form.Control as="textarea" rows="3" name="statement" required placeholder="Description, availability, count, etc. of the item" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Button variant="primary" type="submit">
                                                Add Supply
                                            </Button>
                                            <Button onClick={this.onCloseModal} variant="secondary" style={{ float: 'right' }}>Close</Button>
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

const mapStateToProps = (state) => {
    return {
        currentLocation: state.currentLocation
    }
}

export default connect(mapStateToProps)(Supplies);