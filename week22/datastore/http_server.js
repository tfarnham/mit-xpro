const express   = require('express');
const app       = express();
const low       = require('lowdb');
const fs        = require('lowdb/adapters/FileSync');
const adapter   = new fs('db.json');
const db        = low(adapter);

// initialize the data store
db.defaults({ users:[]}).write();

// data parser - used to parse post data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// return all users
app.get('/data/', function(req, res){
    res.send(db.get('users').value());
});

// test post route
app.post('/test', function(req, res){
    console.log(req.body.username, req.body.password);
    res.send(req.body.username + ":" + req.body.password);
})

// starter server
app.listen(3000,function(){
    console.log('Running on port 3000!');
});