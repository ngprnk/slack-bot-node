var express = require('express');
var app = express();
var request = require('request');
var mongoose = require('mongoose');

var jsonParser = require('./custom-functions/jsonParser');
var dbPath = require('./db-config');
var Event = require('./models/event.js');
var bot = require('./config/botConfig');
var fbConfig = require('./config/fbConfig');

mongoose.Promise = global.Promise;
mongoose.connect(dbPath.dbPath);
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){console.log("Mongodb Database connected");});

bot.on('start', function() {
    var params = {
        icon_emoji: ':cat:'
    };
    bot.postMessageToChannel('bot-testing', 'moved db config upper', params);
});

app.get('/hello',function(req,res){
  res.send("hello world");
  request(fbConfig.url+"search?"+"q="+fbConfig.query+"&"+"type="+fbConfig.type+"&"+"access_token="+fbConfig.access_token, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var length = jsonParser.extractData(body).length;
      for(i=0;i<(length-1);i++){
        var name = jsonParser.extractData(body)[i].name;
        var eventId = jsonParser.extractData(body)[i].id;
        Event.findById(eventId,function(err,event){
          if(err){
            console.log("not found");
          }
          if (!event) {
            event=new Event();
            event._id=eventId;
            event.name= name;
            console.log(event.name+"***");
            event.save(function(err,data){
              if(err){
                console.log(err);
              }
              console.log({message: 'event successfully created'});
                console.log("event created"+ data);
              });
          }
          console.log(event ,"event already exists");
        });
      }
    }
  });
});

app.get('/events',function(req,res){
    console.log("User: "+ req);

    Event.find(function(err,products){
        if(err){
            console.log(err);
        }
        res.send(products);
    });

});

app.listen(3000,function(){
  console.log("App running on port 3000");
});
