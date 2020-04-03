import React, { Component } from 'react';
import { geolocated } from 'react-geolocated';
import axios from 'axios';

class Neededhelp extends Component {

    state = {
        lat: '',
        long:'',
        zip: '',
        result: [],
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
              this.setState({ results: res.data.neededhelps});
              console.log(res.data);
          })
          
         /*
         fetch('https://1e10c271567ad134793f520871ded1f590218981.cloudapp-enterprise.appcelerator.com/api/mongo/offeredHelp', {
            method: "GET",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'Authorization': 'Basic QnhnTG5OaDF4UnluOTlPdnBPaVd1SUdMZi9pL0NqZDA6'
            })
        }).then(res => res.json())
            .then((data) => {
                this.setState({ result: data.neededhelps })
            })
            .catch(console.log)
        }
        */
    }

    componentDidMount = () => {
        this.getData();
    }

    render() {

        return(
            <div>
                Hello
            </div>
        )
    }
}

export default Neededhelp;