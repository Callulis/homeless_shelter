// ./src/reducers/shelterReducers.js

const INITIAL_STATE = { sheltersList: {shelters: [], error:null, isFetching: false},
							newShelter:{shelter:null, error: null, isAdding: false},
							deleteShelter:{
								showDeleteModal: false,
							  shelterToDelete: null,
							  isFetching: false,
							  error: null,
							  successMsg:null
							},
							editShelter:{
									showEditModal: false,
								  shelterToEdit: null,
								  isFetching: false,
								  error: null,
								  successMsg:null
								}
						};

// For handling array of shelters
export const sheltersReducer =  (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CREATE_SHELTER_REQUEST':
          return { ...currentState, sheltersList: {shelters:[...currentState.sheltersList.shelters], error:null,isFetching: true},newShelter:{shelter:null, error:null, isAdding:true}};

    case 'CREATE_SHELTER_SUCCESS':
          const nextState = { ...currentState, sheltersList:{shelters:[...currentState.sheltersList.shelters, action.shelter], isFetching:false},newShelter:{shelter:action.shelter, error:null, isAdding:false}}
      return nextState;

	 case 'CREATE_SHELTER_REQUEST_FAILED':
	       return { ...currentState, sheltersList:{shelters:[...currentState.sheltersList.shelters], error:null, isFetching:false}, newShelter:{shelter:null, error:action.message, isAdding:false}}

  case 'FETCH_SHELTER_REQUEST':
         return { ...currentState, sheltersList: {shelters:[], error: null, isFetching: true} };

   case 'FETCH_SHELTER_SUCCESS':
          //return action.shelters;
           return { ...currentState, sheltersList: {shelters: action.shelters, error:null, isFetching: false} };
   case 'HIDE_SHELTER_MESSAGE':
	         return { ...currentState, sheltersList: {shelters:[...currentState.sheltersList.shelters], error:null,isFetching: false},newShelter:{shelter:null, error:null, isAdding:false}};

	 case 'SHOW_DELETE_MODAL':
	 			return{
	 				...currentState, sheltersList: {shelters:[...currentState.sheltersList.shelters], error:null, isFetching: false}, deleteShelter: {showDeleteModal:true, shelterToDelete:action.shelterToDelete}
	 			}

	 case 'HIDE_DELETE_MODAL':
	 			return{
	 				...currentState, sheltersList: {shelters:[...currentState.sheltersList.shelters], error:null, isFetching: false}, deleteShelter: {showDeleteModal:false, shelterToDelete:null}
	 			}

	 case 'CONFIRM_DELETE_SHELTER_REQUEST':
	 			return{
	 				...currentState, sheltersList: {shelters:[...currentState.sheltersList.shelters], error:null, isFetching: false}, deleteShelter: {showDeleteModal:true, shelterToDelete:action.shelterToDelete, isFetching:true,error:null,successMsg:null}
	 			}

	 case 'CONFIRM_DELETE_SHELTER_REQUEST_FAILED':
	 			return{
	 				...currentState, sheltersList: {shelters:[...currentState.sheltersList.shelters], error:null, isFetching: false}, deleteShelter: {showDeleteModal:true, shelterToDelete:currentState.shelterToDelete, isFetching:false, error:action.message}
	 			}

	 case 'CONFIRM_DELETE_SHELTER_REQUEST_SUCCESS':
	      const filterdShelters = currentState.sheltersList.shelters.filter(shelter => shelter._id !== action.deletedShelterId);
	 			return{
	 				...currentState, sheltersList: {shelters:filterdShelters, error:null, isFetching: false}, deleteShelter: {showDeleteModal:true, shelterToDelete:null, isFetching:false, error:null,successMsg:action.message}
	 			}

	 case 'SHOW_EDIT_MODAL':
	      return {
					...currentState, sheltersList: {shelters:[...currentState.sheltersList.shelters], error:null, isFetching: false}, editShelter:{showEditModal:true, shelterToEdit:action.shelterToEdit}
				}

		case 'HIDE_EDIT_MODAL':
				return {
					...currentState, sheltersList: {shelters:[...currentState.sheltersList.shelters], error:null, isFetching: false}, editShelter:{showEditModal:false, shelterToEdit:null}
				}

		case 'EDIT_SHELTER_REQUEST':
				return {
					...currentState, sheltersList: {shelters:[...currentState.sheltersList.shelters], error:null, isFetching: false}, editShelter:{showEditModal:true, shelterToEdit:action.shelterToEdit, isFetching:true, error:null, successMsg:null}
				}

		case 'EDIT_SHELTER_REQUEST_FAILED':
				return {
					...currentState, sheltersList: {shelters:[...currentState.sheltersList.shelters], error:null, isFetching: false}, editShelter:{showEditModal:true, shelterToEdit:currentState.editShelter.shelterToEdit, isFetching:false, error:action.message, successMsg:null}
				}

		case 'EDIT_SHELTER_REQUEST_SUCCESS':
		    const updatedState = currentState.sheltersList.shelters.map((shelter) => {
					if(shelter._id === action.shelter._id){
						return {...shelter, ...action.shelter};
					}
					return shelter;
				});
				return {
					...currentState, sheltersList: {shelters:updatedState, error:null, isFetching: false}, editShelter:{showEditModal:true, shelterToEdit:action.shelter, isFetching:false, error:null, successMsg:action.message}
				}

		case 'HANDLE_EDIT_SHELTER_FORM_CHANGE':
		      return {
						...currentState, sheltersList: {shelters:[...currentState.sheltersList.shelters], error:null, isFetching: false}, editShelter:{showEditModal:true, shelterToEdit:currentState.editShelter.shelterToEdit, isFetching:false, error:null, successMsg:null}
					}

    default:
        return currentState;

  }
};

export const shelterReducer = (currentState = [], action) => {
  switch (action.type) {
    case 'FETCH_SHELTER_BY_ID_SUCCESS':
      return action.shelter;
    default:
      return currentState;
  }
};
