// ./src/components/shelter/ShelterForm.js
import React from 'react';
import { FormGroup,ControlLabel,FormControl,Button,Glyphicon } from 'react-bootstrap';

const ShelterEditForm = (props) => {
  return (
    <form
    className="form form-horizontal" id="shelterEditForm" onChange={props.handleChange} onSubmit={props.submitEditShelter}
    >

    <div className="row">
    <div className="col-md-12">
    <FormGroup>
          <ControlLabel>Name: </ControlLabel>
          <FormControl
            type="hidden"
            name="ShelterId" defaultValue={props.shelterData._id}
             />
            <FormControl
              type="text" placeholder="Enter name"
              name="name" defaultValue={props.shelterData.name}
               />
        </FormGroup>
        </div>
    <div className="col-md-12">
        <FormGroup>
          <ControlLabel>Management: </ControlLabel>
            <FormControl
              type="text"
              name="management"
               placeholder="Enter management" defaultValue={props.shelterData.management}/>
        </FormGroup>
     </div>
     <div className="col-md-4">
        <FormGroup>
          <ControlLabel>City: </ControlLabel>
            <FormControl
              type="text"
              name="city"
              placeholder="Enter city" defaultValue={props.shelterData.city} />
          </FormGroup>
       </div>
       <div className="col-md-4">
        <FormGroup>
          <ControlLabel>State: </ControlLabel>
            <FormControl
              type="text"
              name="state"
              placeholder="Enter state" defaultValue={props.shelterData.state} />
          </FormGroup>
        </div>
        <div className="col-md-4s">
        <FormGroup>
          <ControlLabel>Zip: </ControlLabel>
            <FormControl
              type="Number"
              name="zip"
              placeholder="Enter zip" defaultValue={props.shelterData.zip} />
          </FormGroup>
        </div>
    </div>

        <FormGroup>
            <Button type="submit" bsStyle="success" bsSize="large" block>Update</Button>
        </FormGroup>
    </form>
  );
};

export default ShelterEditForm;