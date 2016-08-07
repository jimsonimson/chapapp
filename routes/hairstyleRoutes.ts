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
  newHairstyle.createBy = req['payload']._id;
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
  .exec((err, hairstyles)=>{
    if (err) return next(err);
    res.json(hairstyles);
  });
});

export = router;
