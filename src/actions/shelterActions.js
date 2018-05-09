// ./src/actions/shelterActions.js
import Axios from 'axios';

//API URL
//API URL
const apiUrl = 'https://api.mlab.com/api/1/databases?apiKey=oKr0Uav4IgVTRXduUKvG3T6KvI-_gvv0';

export const hideShelterMessage = () => {
  return {
    type:'HIDE_SHELTER_MESSAGE'
  }
}

export const fetchSheltersRequest = () => {
  return {
    type:'FETCH_SHELTER_REQUEST'
  }
}


//Sync action
export const fetchSheltersSuccess = (shelters) => {
  return {
    type: 'FETCH_SHELTER_SUCCESS',
    shelters: shelters,
    receivedAt: Date.now
  }
};

//Async action
export const fetchShelters = () => {
  // Returns a dispatcher function
  // that dispatches an action at later time
  return (dispatch) => {

    dispatch(fetchSheltersRequest());
    // Returns a promise
    return Axios.get(apiUrl)
                .then(response => {
                  // dispatch another action
                  // to consume data
                  dispatch(fetchSheltersSuccess(response.data.shelters))
                })
                .then(error => {
                  throw(error);
                })
  }
}


// Sync action
export const createShelterSuccess = (shelter) => {
  return {
    type: 'CREATE_SHELTER_SUCCESS',
    shelter
  }
}

export const createShelterRequest = () => {
  return {
    type:'CREATE_SHELTER_REQUEST'
  }
}

export const createShelterFailed = (message) => {
  return {
    type:'CREATE_SHELTER_REQUEST_FAILED',
    message
  }
}

export const createShelter = (shelter) => {
  //Return action
  return (dispatch) => {
       dispatch(createShelterRequest());
    return Axios.post(apiUrl + 'shelter', shelter)
                .then(response => {
                  if(response.data.success){
                  // dispatch a synchronus action
                  // to handle data
                  dispatch(createShelterSuccess(response.data.shelter));
                }
                else{
                  dispatch(createShelterFailed(response.data.message));
                }
                })
                .then(error => {
                  console.log(error);
                })
  }
};



//Sync action
export const fetchShelterByIdSuccess = (shelter) => {
  return {
    type: 'FETCH_SHELTER_BY_ID_SUCCESS',
    shelter
  }
}

//Async action
export const fetchShelterById = (shelterId) => {
  //Return action
  return (dispatch) => {
    return Axios.get(apiUrl + 'shelter/' + shelterId)
                .then(response => {
                  //Handle data with sync action
                  dispatch(fetchShelterByIdSuccess(response.data.shelter[0]))
                })
                .catch(error => {
                  throw(error);
                })
  }
};


//sync action to show Delete shelter model
export const showDeleteModal = (shelterToDelete) => {
  return{
    type: 'SHOW_DELETE_MODAL',
    shelterToDelete
  }
}

export const hideDeleteModal = () => {
  return{
    type: 'HIDE_DELETE_MODAL'
  }
}

export const confirmDeleteShelterRequest = (shelterToDelete) => {
  return{
    type: 'CONFIRM_DELETE_SHELTER_REQUEST',
    shelterToDelete
  }
}

export const confirmDeleteShelterRequestSuccess = (message, deletedShelterId) => {
  return{
    type: 'CONFIRM_DELETE_SHELTER_REQUEST_SUCCESS',
    message:message,
    deletedShelterId:deletedShelterId
  }
}

export const confirmDeleteShelterRequestFailed = (message) => {
  return{
    type: 'CONFIRM_DELETE_SHELTER_REQUEST_FAILED',
    message
  }
}

export const confirmDeleteShelter = (shelterToDelete) => {
    return (dispatch) => {
      dispatch(confirmDeleteShelterRequest(shelterToDelete));
      return Axios.delete(apiUrl + 'shelter/' + shelterToDelete._id)
                  .then(response => {console.log(response);
                    if(response.data.success){
                      //dispatch another action to consume data
                       dispatch(confirmDeleteShelterRequestSuccess(response.data.message,shelterToDelete._id));
                    }
                    else{
                      //dispatch another action to consume data
                       dispatch(confirmDeleteShelterRequestFailed(response.data.message));
                    }
                  })
                  .catch(error => {
                     dispatch(confirmDeleteShelterRequestFailed(error));
                  })
    }
}

export const showEditModal = (shelterToEdit) => {
  return{
    type: 'SHOW_EDIT_MODAL',
    shelterToEdit
  }
}

export const hideEditModal = () => {
  return{
    type: 'HIDE_EDIT_MODAL'
  }
}

export const editShelterRequest = (shelterToEdit) => {
  return{
    type: 'EDIT_SHELTER_REQUEST',
    shelterToEdit
  }
}

export const editShelterRequestSuccess = (shelter,message) => {
  return{
    type: 'EDIT_SHELTER_REQUEST_SUCCESS',
    shelter:shelter,
    message:message
  }
}

export const editShelterRequestFailed = (message) => {
  return{
    type:'EDIT_SHELTER_REQUEST_FAILED',
    message
  }
}

export const editShelter = (shelterToEdit) => {
  return (dispatch) => {
    dispatch(editShelterRequest(shelterToEdit));
    return Axios.put(apiUrl +'shelter', shelterToEdit)
                .then(response => {
                  if(response.data.success){
                    dispatch(editShelterRequestSuccess(response.data.shelter,response.data.message));
                  }
                  else{
                    dispatch(editShelterRequestFailed(response.data.message));
                  }
                })
               .catch(err => {
                  dispatch(editShelterRequestFailed(err));console.log(err);
               })
  }
}

export const handleEditShelterFormChange = () => {
  return{
    type:'HANDLE_EDIT_SHELTER_FORM_CHANGE'
  }
}
