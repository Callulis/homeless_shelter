// ./src/components/shelter/ShelterDetails.js
import React from 'react';
import ReactPDF from 'react-pdf';
import './ShelterPage.css'

class ShelterDetails extends React.Component {
render(){
  const { isFetching, favourites, newFavourite, error } = this.props.favouritesData;
  const  b  = this.props.shelter;
  return (
    <div className="shelterDetail">
        <div className="col-md-6">
          <h4 className="">{b.name}</h4>
          <ul className="list-group">
            <li><strong>Management: </strong> {b.management}</li>
            <li><strong>City: </strong> {b.city}</li>
            <li><strong>State: </strong> {b.state} </li>
            <li><strong>Zip: </strong> {b.zip} </li>
            <br/>
            {isFetching && newFavourite == null &&
              <h3>Adding to favourites...</h3>
            }
            {!isFetching && newFavourite != null && newFavourite.shelter._id === b._id &&
              <h3>Shelter Successfully added to favourites</h3>
            }
            {!isFetching && newFavourite == null && error != null &&
              <h3>{error}</h3>
            }
            <button className="btn btn-primary" onClick={this.props.addToFavourite}>Add To Favourite</button>
          </ul>
        </div>
      </div>
  )
}

}

export default ShelterDetails;
