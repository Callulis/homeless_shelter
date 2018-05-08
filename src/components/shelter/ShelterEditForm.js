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
          <ControlLabel>Title: </ControlLabel>
          <FormControl
            type="hidden"
            name="ShelterId" defaultValue={props.shelterData._id}
             />
            <FormControl
              type="text" placeholder="Enter title"
              name="title" defaultValue={props.shelterData.title}
               />
        </FormGroup>
        </div>
    <div className="col-md-6">
        <FormGroup>
          <ControlLabel>Author: </ControlLabel>
            <FormControl
              type="text"
              name="author"
               placeholder="Enter author" defaultValue={props.shelterData.author}/>
        </FormGroup>
     </div>
     <div className="col-md-6">
        <FormGroup>
          <ControlLabel>Price: </ControlLabel>
            <FormControl
              type="number"
              name="price"
              placeholder="Enter price" defaultValue={props.shelterData.price} />
          </FormGroup>
       </div>
       <div className="col-md-6">
        <FormGroup>
          <ControlLabel>Publication Year: </ControlLabel>
            <FormControl
              type="text"
              name="year"
              placeholder="Enter publication year" defaultValue={props.shelterData.year} />
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
