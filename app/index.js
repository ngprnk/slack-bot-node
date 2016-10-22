var express = require('express');
var app = express();
var request = require('request');
var jsonParser = require('./custom-functions/jsonParser');
var mongoose = require('mongoose');
var dbPath = require('./db-config');
var Event = require('./models/event.js');
var botConfig = require('./config/botConfig');
var Slackbok = require('slackbots');

var bot = new Slackbok({
  token: botConfig.token,
  name: botConfig.name
});

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_emoji: ':cat:'
    };

    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    bot.postMessageToChannel('bot-testing', 'https://www.facebook.com/events/1131952436816496', params);


});

//connect to mongodb database
mongoose.Promise = global.Promise;
mongoose.connect(dbPath.dbPath);
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){console.log("Mongodb Database connected");});


var url = "https://graph.facebook.com/";
config = {access_token: "EAAE5XHGdEBMBAGJmVL8oGCx78dBaHqjXX5WneMW4erMRKXXTkojM5Oh4KcyMijmoJNNLl2ZChnFl1ExRH34ggLK0M5fiJX0yDkjSdn5cxlUGGLRA9JkN6qnHIhoyzfg5f2mOY9BZBouA91cWZBQugVvo55cBIgZD"};
parameters = {q: "Nepal", type: "event"};



app.get('/hello',function(req,res){
  res.send("hello world");
  request(url+"search?"+"q="+parameters.q+"&"+"type="+parameters.type+"&"+"access_token="+config.access_token, function (error, response, body) {
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
