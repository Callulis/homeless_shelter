import express from 'express';
import * as  shelterController from '../controllers/shelter.server.controller';


const router = express.Router();

router.route('/')
      .get(shelterController.getShelters)
      .post(shelterController.addShelter)
      .put(shelterController.editShelter);


router.route('/:id')
      .get(shelterController.getShelterById)
      .delete(shelterController.deleteShelter);



export default router;
