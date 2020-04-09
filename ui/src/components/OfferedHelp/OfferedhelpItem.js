import React from 'react';
import ShowMoreText from 'react-show-more-text';
import Button from '@material-ui/core/Button';
const OfferedHelpItem = ({ items, loggedInUser, removeIds, addIds }) => {
    return (
        items.map(item => (
            <div className="help-body" key={item.id} >
                <h5 className="help-name">
                    {item.name}
                </h5>
                <h6>Location: {item.zipcode}, P:{item.phone} </h6>
                {(item.count > 0)
                    ? (item.offeredHelpCount > 0)?<p>Needed Count: {item.count} &nbsp;&nbsp;&nbsp; Offered Help Count: {item.offeredHelpCount} </p>: <p>Needed Count: {item.count}</p>
                    : ''
                }
                <ShowMoreText lines={2} more='Show more' less='Show less' anchorClass='' expanded={false} width={window.width}>
                    {item.description}
                </ShowMoreText>
                {(item.url != '' && item.url != 'undefined')?<a href={item.url} target="_blank" ><b>Click here for more info</b></a>:''}
                <hr></hr>
            </div>
        ))
    )
}
export default OfferedHelpItem