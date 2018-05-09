import React from 'react';
import { connect } from 'react-redux';
import ShelterDetails from './ShelterDetails';

import * as shelterActions from '../../actions/shelterActions';
import * as favouriteActions from '../../actions/favouriteActions';

class ShelterDetailsPage extends React.Component{
  constructor(props, context){
    super(props, context);
    this.addToFavourite = this.addToFavourite.bind(this);
  }

  componentDidMount(){
    this.props.mappedfetchShelterById(this.props.params.id);
  }

  addToFavourite(shelter){
     const item = {
       id:this.props.mappedshelter._id
     }
     this.props.mappedaddToFavourite(item);
  }

  render(){
    return(
      <div>
     <h1>Shelter Details Page</h1>
     <ShelterDetails shelter={this.props.mappedshelter} addToFavourite={this.addToFavourite} favouritesData={this.props.mappedfavouriteItems}/>
      </div>
    );
  };
}

const mapStateToProps = (state,ownProps) => {
  return {
     mappedshelter: state.shelter,
     mappedfavouriteItems: state.favourite
  }
}
 const mapDispatchToProps = (dispatch) => {
   return {
     // This dispatch will trigger
     // the Ajax request we setup
     // in our actions
     mappedfetchShelterById: shelterId => dispatch(shelterActions.fetchShelterById(shelterId)),
     mappedaddToFavourite: item => dispatch(favouriteActions.addToFavourite(item))
   }
 }

 export default connect(mapStateToProps, mapDispatchToProps)(ShelterDetailsPage);
