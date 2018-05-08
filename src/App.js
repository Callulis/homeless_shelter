// ./src/component/App.js
import React from 'react';
import { Link } from 'react-router';
import * as appActions from './actions/appActions';
import { connect } from 'react-redux';
import { Navbar,Nav,NavItem,MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.toggleAddShelter = this.toggleAddShelter.bind(this);
  }
  toggleAddShelter(e){
    e.preventDefault();
     this.props.mappedToggleAddShelter();
  }
  render(){
    return (
      <div>
      <Navbar inverse  collapseOnSelect className="customNav">
    <Navbar.Header>
      <Navbar.Brand>
        <strong><text>Homeless Shelter</text></strong>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to="/">
           <NavItem eventKey={1}>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/shelters">
           <NavItem eventKey={2}>Shelter Posts</NavItem>
        </LinkContainer>
        <LinkContainer to="/favourites">
           <NavItem eventKey={3}>Bookmarked Posts</NavItem>
        </LinkContainer>
        <LinkContainer to="/signup">
           <NavItem eventKey={4}>Sign Up</NavItem>
        </LinkContainer>
        <LinkContainer to="/login">
           <NavItem eventKey={5}>Login</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
      {this.props.location.pathname === '/shelters' &&
      <LinkContainer to="/" onClick={this.toggleAddShelter}>
         <NavItem eventKey={1}>Add Post</NavItem>
      </LinkContainer>
      }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  <div className="container">
  { /* Each Smaller Components */}
   {this.props.children}
  </div>
 </div>
    );
  }
}

//Map state from store to props
const mapStateToProps = (state) => {
  return{
    //you can now say this.props.mappedAppSate
    mappedAppSate: state.appState
  }
}

//Map actions to props
const mapDispatchToProps = (dispatch) => {
  return{
    //you can now say this.props.mappedAppActions
    mappedToggleAddShelter: () => dispatch(appActions.toggleAddShelter())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
