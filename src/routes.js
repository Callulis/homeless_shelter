// ./src/routes.js
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './components/common/HomePage';
import ShelterPage from './components/shelter/ShelterPage';
import ShelterDetailsPage from './components/shelter/ShelterDetailsPage'
import App from './App';
import FavouritePage from './components/favourite/FavouritePage'
import Signup from './components/common/SignupPage'
import Login from './components/common/LoginPage'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}></IndexRoute>
    <Route path="/shelters" component={ShelterPage}></Route>
    <Route path="/shelter/:id" component={ShelterDetailsPage}></Route>
    <Route path="/favourites" component={FavouritePage}></Route>
    <Route path="/signup" component={Signup}></Route>
    <Route path="/login" component={Login}></Route>
  </Route>
);
