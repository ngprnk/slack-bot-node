keywords=["ruby","javscript","design","rails","ruby on rails","python","php","blogging","blog","jekyll","sinatra", "everest","cycle","trek","trekking","cycling","everest","react","reactjs","tihar","corporate","coffee","mun","tihar"];
var events=[];
var jsonParser = function(){
};


jsonParser.extractData = function(body){
  var data = JSON.parse(body);
  var final_data = data.data;
  var d = final_data.filter((data)=>data.name.split(" ").map((a)=>a.toLowerCase()).filter((r)=>keywords.findIndex(a=>a==r)!=-1).length>0);
  // console.log(final_data.length, d.length);
  d.map((r)=>events.push({name: r.name, id: r.id}));

  // console.log("from json parser ***********"+JSON.stringify(events));
  console.log(data.data);
  return events;



};



module.exports = jsonParser;
