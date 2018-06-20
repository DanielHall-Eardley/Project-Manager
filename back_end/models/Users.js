// Require mongoose in this file.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const userData = new Schema({
 type: String,
 email: String,
 password: String,
 created_at: Date,
 updated_at: Date
});

// Create a model using schema.
const Users = mongoose.model('/Users', userData);

// Make this available to our Node applications.
module.exports = Users;