"use strict";
import mongoose = require('mongoose');

let AppointmentSchema = new mongoose.Schema({
  customerName: { type: String },
  hairstyle: { type: mongoose.Schema.Types.ObjectId, ref: 'Hairstyle', requirement: true }
});

export let Appointment = mongoose.model('Appointment', AppointmentSchema);
