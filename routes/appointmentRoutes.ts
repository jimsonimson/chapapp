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
router.post('/', auth, (req, res, next) => {
  let newAppointment = new Appointment(req.body);
  // newAppointment.created = Date.now();
  newAppointment.createdBy = req['payload']._id;
  console.log("on post call made by: " + newAppointment.createdBy);
  newAppointment.save((err, appointment)=>{
    console.log("entered save function");
    if (err) {
      if (err.name === 'ValidationError') {
        res.status(422).send(err);
      }
      else {
        res.status(400).send(err);
      };
    };  
    User.update({_id: req['payload']._id}, { $push: {'appointment': appointment._id}}, (err, results) =>{
        if (err) next(err);
        res.send(appointment);
    });
  });
});

//GET: /api/v1/appointments
router.get('/', (req,res, next) => {
  Appointment.find({})
  .populate('createdBy', 'username')
  .exec((err, appointments)=>{
    if (err) return next(err);
    res.json(appointments);
  });
});

export = router;
