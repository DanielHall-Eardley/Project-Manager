
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userData = new Schema({
 id:Number,
 group:Number,
 title:String,
 start_time:Object,
 end_time:Object,
 created_at: Date,
 updated_at: Date
});

const Task = mongoose.model('/Task', userData);

module.exports = Task;