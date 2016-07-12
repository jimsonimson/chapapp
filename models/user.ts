"use strict";
import mongoose = require('mongoose');
import crypto = require('crypto');
import jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, unique: true },
  email: { type: String, unique: true, lowercase: true, require: true },
  passwordHash: String,
  firstName: { type: String },
  lastName: { type: String },
  joined: { type: Date, default: Date.now },
  avatar: { type: String },
  about: { type: String },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  hairstyles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hairstyle'}],
  availability: [{ type: String }],
  tags: [{ type: String }]
})

UserSchema.method('setPassword', function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
})

UserSchema.method('validatePassword', function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return (hash === this.password);
});

UserSchema.method('generateJWT', function(){
  return jwt.sign({
    id: this._id,
    username: this.username,
    email: this.email
  }, 'SecretKey');
});

export let User = mongoose.model("User", UserSchema);
