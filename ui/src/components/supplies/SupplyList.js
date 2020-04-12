import React, { useState } from 'react';
import ShowMoreText from 'react-show-more-text';
import CommentList from '../Comments/CommentList';
import CommentForm from '../Comments/CommentForm';

const SupplyList = ({ supplies, timeDiffCalc }) => {
//   if (loading) {
//     return <h2>Loading...</h2>;
//   }
    // const [comments, setComments] = useState(0);

    // const handleUpdateComments = (id) => {
    //     supplies.forEach(function (element) {
    //         if(element.id == id){
    //             const newComments = element.comments;
    //             setComments(newComments);
    //         }
    //     }
    // }
    console.log('supply.comments', supplies);
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
                <div className="row">
                    <div >
                        {/* <CommentList comments={updatedSupplies.comments}/> */}
                    </div>
                    {/* <div className="col-4  pt-3 border-right">
                        <h6>Say something about React</h6>
                        <CommentForm />
                    </div> */}
                </div>
                <hr></hr>
            </div>
        ))
    );
};

export default SupplyList;