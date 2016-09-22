'use strict';
import express = require('express');
import jwt = require('express-jwt');
let mongoose = require('mongoose');
let router = express.Router();
let Appointment = mongoose.model('Appointment');
let User = mongoose.model('User');
let auth = jwt({
  userProperty: 'payload',
  secret: process.env.JWT_SECRET
});

//POST: /api/v1/appointments
//Saving appointment | first find if barber exists
router.post('/', auth, (req, res, next) =>{
  User.findOne({ _id: req.body.barber })
  .exec((err, user)=>{
    if(err) return next(err);
    if (!user) return next({ status: 404, message: 'No user found'});
    req['user'] = user;
    next();
  });
});

//When user exists, post appointment
router.post('/', auth, (req, res, next) =>{
  let appointment = new Appointment(req.body);
  appointment.save((err, appt)=>{
    if (err) return next(err);
    if (!appt) return next({ message: 'Error saving appointment.'});
    req['user'].appointments.push(appt._id);
    req['user'].save();
    res.send(appt);
  })
})


//GET: User's appointments
router.get('/', auth, (req,res, next) => {
  Appointment.find({ barber: req['payload']._id })
  .populate('hairstyle', 'style')
  .exec((err, appointments)=>{
    if (err) return next(err);
    res.json(appointments);
  });
});

export = router;
