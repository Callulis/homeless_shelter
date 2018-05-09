// ./src/reducers/appReducers.js
const INITIAL_STATE = {
  showAddShelter: false
}

const appReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_ADD_SHELTER':
          return {
            ...currentState,showAddShelter: !currentState.showAddShelter
          }


    default:
       return currentState;

  }
}

export default appReducer;
