var express = require('express');
var app = express();
var request = require('request');
var jsonParser = require('./custom-functions/jsonParser');



var url = "https://graph.facebook.com/";
config = {access_token: "EAAE5XHGdEBMBAGJmVL8oGCx78dBaHqjXX5WneMW4erMRKXXTkojM5Oh4KcyMijmoJNNLl2ZChnFl1ExRH34ggLK0M5fiJX0yDkjSdn5cxlUGGLRA9JkN6qnHIhoyzfg5f2mOY9BZBouA91cWZBQugVvo55cBIgZD"};
parameters = {q: "Nepal", type: "event"};

app.get('/hello',function(req,res){
  res.send("hello world");
  request(url+"search?"+"q="+parameters.q+"&"+"type="+parameters.type+"&"+"access_token="+config.access_token, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    // console.log(body);
    jsonParser.extractData(body);
  }
  else{
    console.log(response);
  }
});
});


app.listen(3000,function(){
  console.log("App running on port 3000");
});
