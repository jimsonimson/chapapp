'use strict';
import express = require('express');
import jwt = require('express-jwt');
let mongoose = require('mongoose');
let router = express.Router();
let Hairstyle = mongoose.model('Hairstyle');
let User = mongoose.model('User');
let auth = jwt({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});

//POST: /api/v1/hairstyles
router.post('/', auth, (req, res, next) => {
  let newHairstyle = new Hairstyle(req.body);
  newHairstyle.createdBy = req['payload']._id;
  console.log("on post call" + newHairstyle.createdBy);
  newHairstyle.save((err, hairstyle)=>{
    if(err) return next(err);
    User.update({_id: req['payload']._id}, { $push: {'hairstyle': hairstyle._id}}, (err, results) =>{
        if (err) next(err);
        res.send(hairstyle);
    });
  });
});

//GET: /api/v1/hairstyles
router.get('/', (req,res, next) => {
  Hairstyle.find({})
  .populate('createdBy', 'username')
  .exec((err, hairstyles)=>{
    if (err) return next(err);
    res.json(hairstyles);
  });
});

//DELETE: /api/v1/hairstyles/:id
router.delete('/', (req,res,next) => {
  console.log(req.query._id);
  if (!req.query._id) return next({ status: 404, message: 'Please include an ID'});
  Hairstyle.remove({ _id: req.query._id }, (err, result) =>{
    if (err) return next(err);
    res.send({ message: 'deleted the hairstyle'});
  });
});

export = router;
