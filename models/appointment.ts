"use strict";
import mongoose = require('mongoose');

let AppointmentSchema = new mongoose.Schema({
  customerName: { type: String },
  hairstyle: { type: mongoose.Schema.Types.ObjectId, ref: 'Hairstyle', requirement: true },
  phone: {type: Number},
  appointmentDate: { type: Date },
  appointmentTime: { type: Date},
  message: { type: String }
});

export let Appointment = mongoose.model('Appointment', AppointmentSchema);
