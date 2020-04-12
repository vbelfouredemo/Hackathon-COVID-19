
import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Button, Modal, Row, Col, Form} from 'react-bootstrap'
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import Pagination from '../pagination/Pagination';
import SupplList from './SupplyList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
 
const MY_API_KEY = "AIzaSyB_Idu-JfFY9FeTmEJO9mihrD5MUYvgMjw"

class Supplies extends Component{

    constructor(props){
        super(props);
        this.state = {
            supplies: [],
            currentLocation: this.props.currentLocation,
            modal: false,
            currentPage: 1,
            suppliesPerPage: 3,
            currentSupplies: []
        };
        this.getComments=this.getComments.bind(this);
        //console.log('In Campaign==>'+JSON.stringify(this.state));
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
   
    getComments(id){
        console.log('id', id);
    }
    render(){
        const {search, value} = this.state
        const indexOfLastSupply = this.state.currentPage * this.state.suppliesPerPage;
        const indexOfFirstSupply = indexOfLastSupply - this.state.suppliesPerPage;
        //this.setState({currentSupplies: this.state.supplies.slice(indexOfFirstSupply, indexOfLastSupply)});
        const currentSupplies = this.state.supplies.slice(indexOfFirstSupply, indexOfLastSupply);
        //var index = 0;
        //this.setState({currentSupplies: currentSupplies});
        currentSupplies.forEach(function (element) {
            //index++;
            fetch('https://test-e4ec6c3369cdafa50169d681096207de.apicentral.axwayamplify.com/hackathon/mongo/comments/query?where={"subjectId":"'+element.id+'"}', {
                method: "GET",
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': ' application/json',
                    'authorization': 'Apikey ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
                    //'apikey': 'ae1528d0-fc6a-4235-89bd-f9d4ae46e122'
                })
            }).then(res => res.json())
                .then((data) => {
                    element.comments = data.comments;
                    // var newCurrentSupplies = this.state.currentSupplies
                    // newCurrentSupplies[index] = element
                    // this.setState({
                    //     ...this.state,
                    //     currentSupplies: newCurrentSupplies
                    // });
                })
                .catch(console.log)
            
        });
        console.log('comments', currentSupplies);
        // Change page
        const paginate = pageNumber => this.setState({currentPage: pageNumber}) //setCurrentPage(pageNumber);

        return(
            <>
                <Card variant="outlined">
                    <CardHeader
                        title="Local Supplies"
                    />
                    <CardContent>
                        <div className="supplies" >
                            <SupplList supplies={currentSupplies} timeDiffCalc={this.timeDiffCalc} />

                            <Pagination
                                postsPerPage={this.state.suppliesPerPage}
                                totalPosts={this.state.supplies.length}
                                paginate={paginate}
                            />
                        </div>
                    </CardContent>
                </Card>
            </>
        )
    }
    timeDiffCalc(dateFuture, dateNow){
        let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
        // calculate days
        const days = Math.floor(diffInMilliSeconds / 86400);
        diffInMilliSeconds -= days * 86400;
        // calculate hours
        const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
        diffInMilliSeconds -= hours * 3600;
        // calculate minutes
        const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
        diffInMilliSeconds -= minutes * 60;
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

const mapStateToProps = (state) => {
    return {
        currentLocation: state.currentLocation
    }
}

export default connect(mapStateToProps)(Supplies);