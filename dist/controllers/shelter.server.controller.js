'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editShelter = exports.deleteShelter = exports.getShelterById = exports.getShelters = exports.addShelter = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _shelterServer = require('../models/shelter.server.model');

var _shelterServer2 = _interopRequireDefault(_shelterServer);

var _favouriteServer = require('../models/favourite.server.model');

var _favouriteServer2 = _interopRequireDefault(_favouriteServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addShelter = exports.addShelter = (req, res) => {
  
      console.log(req.body);
      //Create a new instance of Shelter model
      const newShelter = new _shelterServer2.default(req.body);
      newShelter.save((err, shelter) => {
        if (err) {
          return res.json({ 'success': false, 'message': 'Some Error' });
        }

        return res.json({ 'success': true, 'message': 'Shelter added successfully', shelter });
      });
}

const getShelters = exports.getShelters = (req, res, next) => {
  _shelterServer2.default.find().exec((err, shelters) => {
    if (err) {
      return res.json({ 'message': 'Some Error' });
    }

    return res.json({ 'message': 'Shelters fetched successfully', shelters });
  });
};

const getShelterById = exports.getShelterById = (req, res) => {
  _shelterServer2.default.find({ _id: req.params.id }).exec((err, shelter) => {
    if (err) {
      return res.json({ 'success': false, 'message': 'Some Error' });
    }
    if (shelter.length) {
      return res.json({ 'success': true, 'message': 'Shelter fetched by id successfully', shelter });
    } else {
      return res.json({ 'success': false, 'message': 'Shelter with the given id not found' });
    }
  });
};

const deleteShelter = exports.deleteShelter = (req, res) => {
  _shelterServer2.default.findByIdAndRemove(req.params.id, (err, shelter) => {
    if (err) {
      return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
    }
    _favouriteServer2.default.remove({ 'shelter': req.params.id }, err => {
      if (err) {
        return res.json({ 'success': false, 'message': 'Some error', 'error': err });
      }
      return res.json({ 'success': true, 'message': shelter.name + ' deleted successfully' });
    });
  });
};

const editShelter = exports.editShelter = (req, res) => {
      console.log('id:' + req.body._id);
      _shelterServer2.default.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, shelter) => {
        if (err) {
          return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
        }
        console.log(shelter);
        return res.json({ 'success': true, 'message': 'Updated successfully', shelter });
      });
    }
//# sourceMappingURL=shelter.server.controller.js.map