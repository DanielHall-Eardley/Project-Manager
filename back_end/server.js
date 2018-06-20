const express = require('express')
const app = express()
const bodyParser =  require('body-parser')
const mongoose = require('mongoose');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser())

mongoose.connect('mongodb://localhost/users');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log("Connected to db at /data/db/")
});

const User = require('./models/Users')
const Project = require('./models/Project')
const Task = require('./models/Tasks')

app.post("/User", (req, res)=>{
User({type:req.body[0].type,
    email: req.body[1].email,
    password: req.body[2].password}).save()
    .then(()=>{
    User.find({})
       .then((user)=>{
        res.send(user)
            })
         })
       .catch(err => {
        console.log(err);
      })
    })

app.post("/Project", (req, res)=>{
console.log(req.body)
  Project({text:req.body[0].text,
          start: req.body[1].start,
          end: req.body[2].end}).save()
    .then(()=>{
     Project.find({})
    .then((user)=>{
     res.send(user)
    })
  })
    .catch(err => {
    console.log(err);
    })
})

app.post("/Task", (req, res)=>{
  Task({
    id: 1,
    group: 1,
    title:req.body[0].text,
    start_time: req.body[1].start,
    end_time:req.body[2].end,
       }).save()
    .then(()=>{
     Task.find({})
    .then((user)=>{
     res.send(user)
    })
  })
    .catch(err => {
    console.log(err);
    })
})


app.get('/Project', (req, res)=>{
  Project.find({})
    .then(list => {
     res.send(list)
  })
})

app.get('/User', (req, res)=>{
  User.find({})
    .then(list => {
     res.send(list)
  })
})

app.get('/Task', (req, res)=>{
  Task.find({})
    .then(list => {
     res.send(list)
  })
})

app.put("/List/:objectId", (req, res)=>{
let query = {"_id" : req.params.objectId}

  List.findOneAndUpdate(query, {complete: true}, {new:true, runValidators:true})
   .then((object) =>{ 
    object.save()
  List.find({})
    .then((object)=>{
    res.send(object)
    })
  })
 
  .catch(err =>{
   res.json(console.log(err))
  })
})

app.delete('/List', (req, res)=>{
  List.remove({complete: true},(err, result)=>{
       if(err){console.log(err)}
    else{res.send(List)}
  })
 })

app.listen(8080, ()=>{
  console.log('Listening')
})