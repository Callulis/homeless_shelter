// ./src/reducers/index.js
import { combineReducers } from 'redux';
import { sheltersReducer, shelterReducer } from './shelterReducers';
import favourite from './favouriteReducers';
import appReducer from './appReducers';

export default combineReducers({
  shelters: sheltersReducer,
  shelter: shelterReducer,
  favourite: favourite,
  appState: appReducer
  // More reducers if there are
  // can go here
});
