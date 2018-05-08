import mongoose from 'mongoose';
import multer from 'multer';
import fs from 'fs';
//import models
import  Shelter from '../models/shelter.server.model';
import  Favourite from '../models/favourite.server.model';


export const addShelter = (req,res) => {
            console.log(req.body);
            //Create a new instance of Shelter model
            const newShelter = new Shelter(req.body);
            newShelter.save((err,shelter) => {
              if(err){
              return res.json({'success':false,'message':'Some Error'});
              }

              return res.json({'success':true,'message':'Shelter added successfully',shelter});
            });
    }


 export const getShelters = (req,res,next) => {
         Shelter.find().exec((err,shelters) => {
           if(err){
           return res.json({'message':'Some Error'});
           }

           return res.json({'message':'Shelters fetched successfully',shelters});
         });
}

export const getShelterById = (req,res) => {
  Shelter.find({_id:req.params.id}).exec((err,shelter) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
    if(shelter.length){
      return res.json({'success':true,'message':'Shelter fetched by id successfully',shelter});
    }
    else{
      return res.json({'success':false,'message':'Shelter with the given id not found'});
    }
  });
}

export const deleteShelter = (req,res) => {
  Shelter.findByIdAndRemove(req.params.id,(err,shelter) => {
    if(err){
    return res.json({'success':false,'message':'Some Error','error':err});
    }
    Favourite.remove({'shelter':req.params.id},(err) => {
      if(err){
        return res.json({'success':false,'message':'Some error','error':err});
      }
      return res.json({'success':true,'message':shelter.title+' deleted successfully'});
    });

  });
}

export const editShelter = (req,res) => {
  
      console.log('id:'+req.body._id);
      Shelter.findOneAndUpdate({_id:req.body._id}, req.body, { new: true }, (err,shelter) => {
        if(err){
        return res.json({'success':false,'message':'Some Error','error':err});
        }
        console.log(shelter);
        return res.json({'success':true,'message':'Updated successfully',shelter});
      });
}

