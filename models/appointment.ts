"use strict";
import mongoose = require('mongoose');

let AppointmentSchema = new mongoose.Schema({
  customerName: { type: String },
  hairstyle: { type: mongoose.Schema.Types.ObjectId, ref: 'Hairstyle', requirement: true },
  appointmentDate: { type: Date }
});

export let Appointment = mongoose.model('Appointment', AppointmentSchema);
