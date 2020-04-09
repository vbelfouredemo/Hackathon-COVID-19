import React from 'react';
import ShowMoreText from 'react-show-more-text';
import CommentsBlock from 'simple-react-comments';

const SupplyList = ({ supplies, timeDiffCalc }) => {
//   if (loading) {
//     return <h2>Loading...</h2>;
//   }
    const googleMapURL = 'https://www.google.com/maps/place/?q=place_id:';
    return (
        supplies.map(supply  => (
            <div className="supply-body" key={supply.id} >
                <span style={{float:'right'}}>
                    {timeDiffCalc(new Date(), new Date(supply.createdTime))} ago
                </span>
                <br/>
                <ShowMoreText lines={2} more='Show more' less='Show less' anchorClass='' expanded={false} width={window.width}>
                    {supply.description} 
                </ShowMoreText>
                <br/>
                <h6 className="supply-name">{supply.storeName}</h6>
                <p>{supply.formattedAddress}</p>
                {(supply.googlePlaceId != '' && supply.googlePlaceId != 'undefined')?
                    <a href={googleMapURL+supply.googlePlaceId} target="_blank" >
                        Get Direction
                    </a>
                :''}
                <div>
                    <CommentsBlock
                    comments={this.state.comments}
                    signinUrl={'/signin'}
                    isLoggedIn
                    reactRouter // set to true if you are using react-router
                    onSubmit={text => {
                        if (text.length > 0) {
                        this.setState({
                            comments: [
                            ...this.state.comments,
                            {
                                authorUrl: '#',
                                avatarUrl: '#avatarUrl',
                                createdAt: new Date(),
                                fullName: 'Name',
                                text,
                            },
                            ],
                        });
                        console.log('submit:', text);
                        }
                    }}
                    />
                </div>
                <hr></hr>
            </div>
        ))
    );
};

export default SupplyList;