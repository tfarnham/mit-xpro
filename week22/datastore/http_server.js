const express   = require('express');
const app       = express();
const low       = require('lowdb');
const fs        = require('lowdb/adapters/FileSync');
const adapter   = new fs('db.json');
const db        = low(adapter);
//const faker     = require('faker');
const cors      = require('cors');


// use CORS for cross-origin
app.use(cors());

// initialize the data store
db.defaults({ users:[]}).write();

// setup serving static pages
app.use(express.static('public'));

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

// add user
app.post('/add', function(req,res){
    var user = {
        'name'          : req.body.name,
        'dob'           : req.body.dob,
        'email'         : req.body.email,
        'username'      : req.body.username,
        'password'      : req.body.password,
        'phone'         : req.body.phone,
        'streetaddress' : req.body.streetaddress,
        'citystatezip'  : req.body.citystatezip,
        'latitude'      : req.body.latitude,
        'longitude'     : req.body.longitude,
        'avatar'        : req.body.avatar
    };
    db.get('users').push(user).write();
    console.log(db.get('users').value());
    res.send(db.get('users').value());
});
// starter server
app.listen(3000,function(){
    console.log('Running on port 3000!');
});