import React, { Component } from 'react'
import ShowMoreText from 'react-show-more-text';
import {Button} from 'react-bootstrap';
//import AddCampaign from './AddCampaign';


class Campaigns extends Component{

    constructor(props){
        super(props)
        this.state = {
            campaigns: [],
            campaignModalOpened: false
        };
    }
    render(){
        console.log('===>'+this.props)
        const campaigns = this.state.campaigns;
        let addModalClose = () => this.setState({campaignModalOpened: false});
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
                        <img alt="donate" src="../img/donatebutton.png" width="220" height="60"/>
                    </a>
                    <hr></hr>
                </div>
            )
        })
        return(
            <div className="campaigns" >
                <h4>Local stores need your help</h4>
                <div className="text-right">
                    <Button 
                    variant = 'primary' 
                    onClick={()=>this.setState({campaignModalOpened: true})}>
                        Add New Campaign
                    </Button>
                    
                </div>
                {campaignList}
            </div>
        )
    }
    componentDidMount() {
        this.refreshlist();
    }
    refreshlist(){
        fetch('http://localhost:8080/api/mongo/campaigns', {
            method: "GET",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'Authorization': 'Basic QnhnTG5OaDF4UnluOTlPdnBPaVd1SUdMZi9pL0NqZDA6'
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