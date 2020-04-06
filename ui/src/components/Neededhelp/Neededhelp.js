import React, { Component } from 'react';
import axios from 'axios';
import NeededhelpItem from './NeededhelpItem';


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
              this.setState({ result: res.data.neededhelps});
              console.log("Result: ", res.data.neededhelps);
          })
    }

    componentDidMount = () => {
        this.getData();
    }

    render() {
        console.log("this.state.result: ", this.state.result);
        return(
            <div className="neededhelp-list section">
                {this.state.result && this.state.result.map(result => {
                    return (
                        <NeededhelpItem item={result} key={result.id} />
                    )
                })}
            </div>
        )
    }
}

export default Neededhelp;