/* This file defines our schema and model interface for the account data.

   We first import mongoose into the file. Mongoose is our tool for
   interacting with our mongo database.
*/
const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

/* Our schema defines the data we will store. A username (string of alphanumeric
   characters), a password (actually the hashed version of the password created
   by bcrypt), and the created date.
*/
const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  age: {
    type: Number,
    min: 0,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// Converts a doc to something we can store in redis later on.
DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
});

const DomoModel = mongoose.model('Domo', DomoSchema);
module.exports = DomoModel;
