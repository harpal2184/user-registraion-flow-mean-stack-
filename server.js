var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 3000;
var mongoose = require('mongoose');
var userModel = require('./models/registration_model');
var USER = mongoose.model('USER');

//connect to mongodb
mongoose.connect('mongodb://localhost/Harpaldb',{useMongoClient:true}, function(err){
    if(err)
        console.log(err);
    console.log('connected to databse.......');
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client'));

app.get('/', function(req,res){
    res.redirect('/client/index.html');
});

app.post('/api/signup', function(req,res){
    USER.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, function(err, data){
        if(err)
            res.send(err);
        res.json(data);
    });
});

app.get('/api/users', function(req,res){
    USER.find({}, function(err, data){
        if(err)
            res.send(err);
        res.json(data);
    });
});
app.delete('/api/users/:id', function(req,res){
    USER.remove({_id:req.params.id},function(err, data){
        if(err)
            res.send(err);
        res.json(data);
    });
});

app.put('/api/users/:id', function(req,res){
    USER.findOneAndUpdate({_id:req.params.id}, req.body, {new:true}, function(err, data){
        if(err)
            res.send(err);
        res.json(data);
    });
});

app.listen(port, function(){
    console.log('Server running at ' + port);
});

