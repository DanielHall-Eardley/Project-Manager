// Require mongoose in this file.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const userData = new Schema({
 text:String,
 start:Object,
 end:Object,
 created_at: Date,
 updated_at: Date
});

// Create a model using schema.
const Project = mongoose.model('/Project', userData);

// Make this available to our Node applications.
module.exports = Project;