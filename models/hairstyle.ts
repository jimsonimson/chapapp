"use strict";

import mongoose = require('mongoose');

let HaircutSchema = new mongoose.Schema({
  img: { type: String },
  style: { type: String, required: true },
  description: { type: String },
  price: { type: Number }
});
