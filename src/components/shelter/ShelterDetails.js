// ./src/components/shelter/ShelterDetails.js
import React from 'react';
import ReactPDF from 'react-pdf';
import './ShelterPage.css'
// const ShelterDetails = ({shelter, addToCart}) => {
//   return (
//     <div className="media">
//         <div className="media-left">
//           <a href="#">
//             <img className="media-object" src="http://placehold.it/200x280" alt="Placehold" />
//           </a>
//         </div>
//         <div className="media-body">
//           <h4 className="media-heading">{shelter.title}</h4>
//           <ul>
//             <li><stron>Author: </stron> {shelter.author}</li>
//             <li><stron>Price: </stron> ${shelter.price}</li>
//             <li><stron>Year: </stron> {shelter.year}</li>
//             <br/>
//             <button className="btn btn-primary" onClick={e => addToCart(shelter)}>Buy</button>
//           </ul>
//         </div>
//       </div>
//   )
// }

class ShelterDetails extends React.Component {
  // constructor(props) {
  //   super(props);
  // }




render(){
  const { isFetching, favourites, newFavourite, error } = this.props.favouritesData;
  const  b  = this.props.shelter;
  return (
    <div className="shelterDetail">
        <div className="col-md-6">
          <h4 className="">{b.title}</h4>
          <ul className="list-group">
            <li><stron>Author: </stron> {b.author}</li>
            <li><stron>Price: </stron> ${b.price}</li>
            <li><stron>Year: </stron> {b.year} </li>
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
            <button className="btn btn-primary" onClick={this.props.addToFavourite}>AddToFavourite</button>
          </ul>
        </div>
      </div>
  )
}

}

export default ShelterDetails;
