// ./src/components/shelter/ShelterForm.js
import React from 'react';
import { FormGroup,ControlLabel,FormControl,Button } from 'react-bootstrap';

const ShelterForm = (props) => {
  return (
    <form
    className="form form-horizontal" id="myForm" onSubmit={props.submitShelter}
    >

    <div className="row">
    <div className="col-md-12">
    <FormGroup>
          <ControlLabel>Name: </ControlLabel>
            <FormControl
              type="text" placeholder="Enter name"
              name="name"
               />
        </FormGroup>
        </div>
    <div className="col-md-12">
        <FormGroup>
          <ControlLabel>Management: </ControlLabel>
            <FormControl
              type="text"
              name="management"
               placeholder="Enter management"/>
        </FormGroup>
     </div>
     <div className="col-md-4">
        <FormGroup>
          <ControlLabel>City: </ControlLabel>
            <FormControl
              type="text"
              name="city"
              placeholder="Enter city" />
          </FormGroup>
       </div>
       <div className="col-md-4">
        <FormGroup>
          <ControlLabel>State: </ControlLabel>
            <FormControl
              type="text"
              name="state"
              placeholder="Enter state" />
          </FormGroup>
        </div>
        <div className="col-md-4">
        <FormGroup>
          <ControlLabel>Zip: </ControlLabel>
            <FormControl
              type="Number"
              name="zip"
              placeholder="Enter zip" />
          </FormGroup>
        </div>
        <div className="col-md-12">
        <FormGroup>
          <ControlLabel>Comment: </ControlLabel>
            <FormControl
              type="textarea"
              name="comment"
              placeholder="Enter comment"/>
          </FormGroup>
        </div>
    </div>

        <FormGroup>
            <Button type="submit" bsStyle="success" bsSize="large" block>Submit</Button>
        </FormGroup>
    </form>
  );
};

export default ShelterForm;