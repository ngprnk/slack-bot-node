keywords=["ruby","javscript","design","rails","ruby on rails","python","php","blogging","blog","jekyll","sinatra", "everest"];

var jsonParser = function(){
};


jsonParser.extractData = function(body){
  var data = JSON.parse(body);
  var final_data = data.data;
  // console.log(final_data[0]);

// final_data.forEach(function(data){
//   var splitted=data.name.split('');
//   for(var i=0;i<keywords.length-1;i++){
//     for(var j=0;j<splitted.length-1;j++){
//       if(keywords[i].toLowerCase()==splitted[j].toLowerCase()){
//         console.log(data.name);
//       }
//
//     }
//
// }});
// };

var d = final_data.filter((data)=>data.name.split(" ").map((a)=>a.toLowerCase()).filter((r)=>keywords.findIndex(a=>a==r)!=-1).length>0);
// console.log(final_data.length, d.length);
d.map((r)=>console.log(r.name));
};



module.exports = jsonParser;
