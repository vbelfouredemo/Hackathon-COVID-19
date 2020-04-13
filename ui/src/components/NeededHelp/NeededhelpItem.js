import React from 'react';
import ShowMoreText from 'react-show-more-text';
import Button from '@material-ui/core/Button';
const NeededhelpItem = ({ items, loggedInUser, removeIds, addIds }) => {
    return (
        items.map(item => (
            <div className="help-body" key={item.id} >
                <h5 className="campaign-name">
                    {item.name}
                </h5>
                <h6>Location: {item.zipcode}, P:{item.phone} </h6>
                {(item.count > 0)
                    ? (item.offeredHelpCount > 0)?<p>Needed Count: {item.count} &nbsp;&nbsp;&nbsp; Offered Help Count: {item.offeredHelpCount} </p>: <p>Needed Count: {item.count}</p>
                    : ''
                }
                <ShowMoreText lines={2} more='Show more' less='Show less' anchorClass='' expanded={false} width={window.width}>
                    {item.missionStatement}
                </ShowMoreText>
                {(item.url != '' && item.url != 'undefined')?<a href={item.url} target="_blank" ><b>Click here for more info</b><br/></a>:''}
                <span >
                    {(item.signedUp)
                        ? <Button variant="outlined" color="primary"  onClick= { () =>removeIds(item.id)}>Thank You for signing up for help</Button>
                        : (item.moreHelpNeeded)? <Button variant="outlined" color="primary" onClick= { () =>addIds(item.id)} >Signup for help!</Button>:<Button variant="outlined" color="inherit">We have got enough help, Thank You!</Button>
                    }
                </span>
                <hr></hr>
            </div>
        ))
    )
}
export default NeededhelpItem