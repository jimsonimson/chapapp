"use strict";

import mongoose = require('mongoose');

let HairstyleSchema = new mongoose.Schema({
  img: { type: String },
  style: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true}
});

export let Hairstyle = mongoose.model('Hairstyle', HairstyleSchema);
