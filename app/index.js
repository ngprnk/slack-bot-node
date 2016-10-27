var express = require('express');
var app = express();
var request = require('request');
var mongoose = require('mongoose');
var cron = require('node-cron');

var jsonParser = require('./custom-functions/jsonParser');
var dbPath = require('./db-config');
var Event = require('./models/event.js');
var bot = require('./config/botConfig');
var fbConfig = require('./config/fbConfig');
//mongoose configuration
mongoose.Promise = global.Promise;
mongoose.connect(dbPath.dbPath);
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){console.log("Mongodb Database connected");});
var params = {
    icon_emoji: ':cat:'
};

function makeRequest(){
    request(fbConfig.url+"search?"+"q="+fbConfig.query+"&"+"type="+fbConfig.type+"&"+"access_token="+fbConfig.access_token, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var parsedData=jsonParser.extractData(body);
          parsedData.forEach(function(event){
              Event.findOne({id: event.id}, function(err, foundEvent){
                if (err) return console.error(err);
                  if (!foundEvent){
                    Event.create(event, function(err, event){
                      if (err) return console.log(err);
                      bot.postMessageToChannel('bot-testing', event.name,event.place, params);
                    });
                  }
              });
          })

        }
    });
};

cron.schedule('*/1 * * * *',function(){
    makeRequest();
});

bot.on('start', function() {
    var params = {
        icon_emoji: ':cat:'
    };
});

app.get('/hello',function(req,res){
  res.send("hello world");
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
