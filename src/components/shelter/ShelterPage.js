import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
//import PropTypes from 'prop-types'
import { Alert,Glyphicon,Button,Modal } from 'react-bootstrap';

import * as shelterActions from '../../actions/shelterActions';
import ShelterForm from './ShelterForm';
import * as appActions from '../../actions/appActions';
import ShelterEditForm from './ShelterEditForm';

import './ShelterPage.css';

class ShelterPage extends React.Component {
   constructor(props){
     super(props);
     this.hideShelterMessage = this.hideShelterMessage.bind(this);
     this.hideDeleteModal = this.hideDeleteModal.bind(this);
     this.cofirmDeleteShelter = this.cofirmDeleteShelter.bind(this);
     this.hideEditModal = this.hideEditModal.bind(this);
     this.submitEditShelter = this.submitEditShelter.bind(this);
     this.handleEditChange = this.handleEditChange.bind(this);
   }
  componentWillMount() {
    this.props.fetchShelters();
    this.props.mappedAppSate.showAddShelter = false;
  }
  componentDidUpdate(){
    this.props.newShelter.shelter = null;
    this.props.newShelter.error = null;
  }

  submitShelter(e){
    e.preventDefault();
    const form = document.getElementById('myForm');
    if(form.name.value === '' || form.management.value === '' || form.city.value === '' 
            || form.state.value === '' || form.zip.value === '' || form.comment.value === ''){
      this.props.createShelterFailed('Fill all fields');
      return;
    }

    const data = new FormData();
    data.append('name',form.name.value);
    data.append('management',form.management.value);
    data.append('city',form.city.value);
    data.append('state',form.state.value);
    data.append('zip',form.zip.value);
    data.append('comment', form.comment.value);
    this.props.createShelter(data);
    form.reset();
  }

  hideShelterMessage(e){
    e.preventDefault();
    this.props.mappedhideShelterMessage();
  }

  hideDeleteModal(){
    this.props.mappedhideDeleteModal();
  }

  showDeleteModal(shelterToDelete){
    this.props.mappedshowDeleteModal(shelterToDelete);console.log(shelterToDelete);
  }

  cofirmDeleteShelter(){
    this.props.mappedConfirmDeleteShelter(this.props.mapppedShelterToDel.shelterToDelete);
  }

  showEditModal(shelterToEdit){
     this.props.mappedshowEditModal(shelterToEdit);
  }

  hideEditModal(){
      this.props.mappedhideEditModal();
  }

  submitEditShelter(e){
     e.preventDefault();
     const editForm = document.getElementById('shelterEditForm');
     if(editForm.name.value === '' || editForm.management.value === '' || editForm.city.value === '' 
             || editForm.state.value === '' || editForm.zip.value === '' || editForm.comment.value === ''){
       this.props.mappededitShelterFailed('Fill all fields');
       return;
     } else {
        const data = new FormData();
        data.append('_id',editForm.ShelterId.value);
        data.append('name',editForm.name.value);
        data.append('management',editForm.management.value);
        data.append('city', editForm.city.value);
        data.append('state',editForm.state.value);
        data.append('zip',editForm.zip.value);
        data.append('comment',editForm.comment.value);
        this.props.mappededitShelter(data);
     }
  }

  handleEditChange(){
    this.props.mappededitShelterFormChanged();
  }


  render(){
    const { isFetching, shelters } = this.props.sheltersList;
    const { shelter, isAdding, error } = this.props.newShelter;
    let { shelterAddMessage, ShelterMessageStyle }= this.props;
    const MapAppState  = this.props.mappedAppSate;
    const deleteShelter = this.props.mapppedShelterToDel;
    const editShelter = this.props.mapppedShelterToEdit;
    //const isEmpty = shelters.length === 0;
    if (!shelter && isAdding) {
      shelterAddMessage = 'New Shelter Adding..';
      ShelterMessageStyle = 'info';
    }
    if (shelter && !isAdding) {
      shelterAddMessage = ` Added Successfully`;
      ShelterMessageStyle = 'success';
    }
    if(!shelter && !isAdding){
      shelterAddMessage = error;
      ShelterMessageStyle = 'danger';
    }
    if(error){
      shelterAddMessage = error;
      ShelterMessageStyle ='danger';
    }
    /*
    if (isEmpty && isFetching ) {
      return <h2><i>Loading...</i></h2>
    }
    */
    if (!shelter && !isAdding && !error) {
      shelterAddMessage = null;
    }

    //return jsx
    return(
      <div className="ShelterPageDiv">
       <div>
       {this.props.mappedAppSate.showAddShelter &&
       <div className="addShelterBox">
       <h3 className="addShelterHeading">Add New Shelter</h3>
        {/* Import and inject Shelter form */}
       <ShelterForm submitShelter={this.submitShelter.bind(this)}/>
        {shelterAddMessage  &&
          <Alert bsStyle={ShelterMessageStyle} onDismiss={this.hideShelterMessage}>
            <strong>{shelter && <Link to={`/shelter/${shelter._id}`}><span className="addShelterHeading">{shelter.title}</span></Link>} {shelterAddMessage}</strong>
          </Alert>
      }
       </div>
     }
       </div>

      <div className="row">
          <div className="col-md-12">
          <h3>Shelter Posts</h3>

          <table className="table sheltersTable">
          <thead>
          <tr><th>Name</th>
          <th>Comment</th>
          <th className="textCenter">Edit</th>
          <th className="textCenter">Delete</th>
          <th className="textCenter">View</th></tr>
          </thead>
          <tbody>
          
          <td>{b.title}</td>
          <td>{b.comment}</td>
           <td className="textCenter"><Button onClick={() => this.showEditModal(b)} bsStyle="info" bsSize="xsmall"><Glyphicon glyph="pencil" /></Button></td>
           <td className="textCenter"><Button onClick={() => this.showDeleteModal(b)} bsStyle="danger" bsSize="xsmall"><Glyphicon glyph="trash" /></Button></td>
           <td className="textCenter"><Link to={`/shelter/${b._id}`}>View Details</Link> </td>
           </tr> )}
          </tbody>
          </table>
          </div>

      </div>
      <Modal
      show={deleteShelter.showDeleteModal}
      onHide={this.hideDeleteModal}
      container={this}
      aria-labelledby="contained-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">Delete Your Shelter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {deleteShelter.shelterToDelete && !deleteShelter.error && !deleteShelter.isFetching &&
        <Alert bsStyle="warning">
   Are you sure you want to delete this shelter <strong>{deleteShelter.shelterToDelete.title} </strong> ?
 </Alert>
      }
      {deleteShelter.shelterToDelete && deleteShelter.error &&
        <Alert bsStyle="warning">
   Failed. <strong>{deleteShelter.error} </strong>
 </Alert>
      }

      {deleteShelter.shelterToDelete && !deleteShelter.error && deleteShelter.isFetching &&
        <Alert bsStyle="success">
    <strong>Deleting.... </strong>
 </Alert>
      }

      {!deleteShelter.shelterToDelete && !deleteShelter.error && deleteShelter.successMsg &&
        <Alert bsStyle="success">
   Shelter <strong>{deleteShelter.successMsg} </strong>
 </Alert>
      }
      </Modal.Body>
      <Modal.Footer>
       {!deleteShelter.successMsg && !deleteShelter.isFetching &&
         <div>
         <Button onClick={this.cofirmDeleteShelter}>Yes</Button>
         <Button onClick={this.hideDeleteModal}>No</Button>
         </div>
      }
      {deleteShelter.successMsg && !deleteShelter.isFetching &&
        <Button onClick={this.hideDeleteModal}>Close</Button>
      }
      </Modal.Footer>
    </Modal>

    {/* Modal for editing shelter */}
    <Modal
      show={editShelter.showEditModal}
      onHide={this.hideEditModal}
      container={this}
      aria-labelledby="contained-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">Edit Your Shelter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
    <div className="col-md-12">
    {editShelter.shelterToEdit &&
    <ShelterEditForm shelterData={editShelter.shelterToEdit} submitEditShelter={this.submitEditShelter} handleChange={this.handleEditChange}/>
    }
    {editShelter.shelterToEdit && editShelter.isFetching &&
      <Alert bsStyle="info">
  <strong>Updating...... </strong>
      </Alert>
    }
    {editShelter.shelterToEdit && !editShelter.isFetching && editShelter.error &&
      <Alert bsStyle="danger">
  <strong>Failed. {editShelter.error} </strong>
      </Alert>
    }
    {editShelter.shelterToEdit && !editShelter.isFetching && editShelter.successMsg &&
      <Alert bsStyle="success">
  Shelter <strong> {editShelter.shelterToEdit.title} </strong>{editShelter.successMsg}
      </Alert>
    }
    </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.hideEditModal}>Close</Button>
      </Modal.Footer>
    </Modal>
      </div>
    );
  }
}

// Map state from store to props
const mapStateToProps = (state,ownProps) => {
  return {
    // You can now say this.props.shelters
    sheltersList: state.shelters.sheltersList,
    newShelter: state.shelters.newShelter,
    mappedAppSate: state.appState,
    mapppedShelterToDel: state.shelters.deleteShelter,
    mapppedShelterToEdit: state.shelters.editShelter
  }
};

// Map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    // You can now say this.props.createShelter
    createShelter: shelter => dispatch(shelterActions.createShelter(shelter)),
    fetchShelters: () => dispatch(shelterActions.fetchShelters()),
    createShelterFailed: message => dispatch(shelterActions.createShelterFailed(message)),
    mappedhideShelterMessage: () => dispatch(shelterActions.hideShelterMessage()),
    mappedshowDeleteModal: shelterToDelete => dispatch(shelterActions.showDeleteModal(shelterToDelete)),
    mappedhideDeleteModal: () => dispatch(shelterActions.hideDeleteModal()),
    mappedConfirmDeleteShelter: (shelterToDelete) => dispatch(shelterActions.confirmDeleteShelter(shelterToDelete)),
    mappedshowEditModal: shelterToEdit => dispatch(shelterActions.showEditModal(shelterToEdit)),
    mappedhideEditModal: () => dispatch(shelterActions.hideEditModal()),
    mappededitShelter: shelterFormData => dispatch(shelterActions.editShelter(shelterFormData)),
    mappededitShelterFailed: (shelter,message) => dispatch(shelterActions.editShelterRequestFailed(shelter,message)),
    mappededitShelterFormChanged: () => dispatch(shelterActions.handleEditShelterFormChange())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShelterPage);