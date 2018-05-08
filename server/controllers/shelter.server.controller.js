import mongoose from 'mongoose';
import multer from 'multer';
import fs from 'fs';
//import models
import  Shelter from '../models/shelter.server.model';
import  Favourite from '../models/favourite.server.model';

//set multer storage
let storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, './uploads');
  },
  filename: (req,file,cb) => {
    const date = Date.now();
    const yourfilename = file.originalname.split('.')[file.originalname.split('.').length - 2].replace(/ /g, '_');
    cb(null, file.fieldname + '-' + date + '_'+ yourfilename + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});

const Upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
            if (file.mimetype === 'application/pdf') {
                cb(null, true);
            } else {
                cb(new Error('Only pdf allowed'), false);
            }
        }
}).single('file');


export const addShelter = (req,res) => {
        Upload(req,res,(err) => {
          if(err){
            console.log('ERROR:'+err);
            return res.json({'success':false,'message':'Failed. Only pdf allowed',err});;
          }
          else{
            console.log(req.body);
            //Create a new instance of Shelter model
            const newShelter = new Shelter(req.body);
            newShelter.filePath = req.file.path;
            newShelter.fileName = req.file.filename;
            newShelter.save((err,shelter) => {
              if(err){
              return res.json({'success':false,'message':'Some Error'});
              }

              return res.json({'success':true,'message':'Shelter added successfully',shelter});
            })
          }
        });


}

 export const getShelters = (req,res,next) => {
         Shelter.find().exec((err,shelters) => {
           if(err){
           return res.json({'message':'Some Error'});
           }

           return res.json({'message':'Shelters fetched successfully',shelters});
         })
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
  })
}

export const deleteShelter = (req,res) => {
  Shelter.findByIdAndRemove(req.params.id,(err,shelter) => {
    if(err){
    return res.json({'success':false,'message':'Some Error','error':err});
    }
    fs.unlink(shelter.filePath);
    Favourite.remove({'shelter':req.params.id},(err) => {
      if(err){
        return res.json({'success':false,'message':'Some error','error':err});
      }
      return res.json({'success':true,'message':shelter.title+' deleted successfully'});
    })

  })
}

export const editShelter = (req,res) => {
  Upload(req,res, (err) => {
    if(err){
      console.log('ERROR:'+err);
      return res.json({'success':false,'message':'Failed. Only pdf allowed',err});;
    }
    else{
      console.log('id:'+req.body._id);
      fs.unlink(req.body.filePath);
      req.body.filePath = req.file.path;
      req.body.fileName = req.file.filename;
      Shelter.findOneAndUpdate({_id:req.body._id}, req.body, { new: true }, (err,shelter) => {
        if(err){
        return res.json({'success':false,'message':'Some Error','error':err});
        }
        console.log(shelter);
        return res.json({'success':true,'message':'Updated successfully',shelter});
      })
    }
  })
}
