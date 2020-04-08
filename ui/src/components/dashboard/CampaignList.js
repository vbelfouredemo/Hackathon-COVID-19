import React from 'react';
import ShowMoreText from 'react-show-more-text';

const CampaignList = ({ campaigns, loading }) => {
//   if (loading) {
//     return <h2>Loading...</h2>;
//   }

    return (
        campaigns.map(campaign  => (
            <div className="campaign-body" key={campaign.id} >
                <h5 className="campaign-name">
                    {campaign.name} &nbsp;
                    <img src={`../img/${campaign.type}.png`} alt="campaign type"></img>
                </h5>
                <h6 className="campaign-location">{campaign.city}, {campaign.neighbourhood}, {campaign.state}, P:{campaign.phone} </h6>
                <ShowMoreText lines={2} more='Show more' less='Show less' anchorClass='' expanded={false} width={window.width}>
                    {campaign.statement}
                </ShowMoreText>
                <a href={campaign.charityURL} target="_blank" rel="noopener noreferrer">
                    <b>Make a donation</b>
                </a>
                <hr></hr>
            </div>
        ))
    );
};

export default CampaignList;