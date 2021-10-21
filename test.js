const express = require("express");
const app= express();
var request=require("request");
const https=require("https");
const bodyParser=require("body-parser");



// var assert = require('assert');


// describe('Unit testing', () => {
//  it('should return 2', () => {
//         assert.equal(1 + 1, 2);
//     });
//  it('should return 9', () => {
//         assert.equal(3 * 3, 9);
//     });
// });


// var expect  = require('chai').expect;




app.use(bodyParser.urlencoded({extended:true}));



   

app.get("/",function(req,res){

res.sendFile(__dirname+"/index.html");

 })






app.post("/ss",function(req,res){

var cc=req.body.category;
var co=req.body.country;
console.log(cc);





const url="https://newsapi.org/v2/top-headlines?"+"category="+ cc+"&"+"country="+ co+"&apiKey=3ca308b6706e48aa97d98cbfc8b217ee";


request(url, function (err, response, body) {
  if(err){
    console.log("something went wrong");
  } else {



res.write("<h1  style=color:#d9534f;>News from "+cc +" category and from "+co+" country</h1>");

for(var i=0;i<5;i++)
{
    var title =JSON.parse(body).articles[i].title;
    var img =JSON.parse(body).articles[i].urlToImage;
    var desc = JSON.parse(body).articles[i].description;
     var link =JSON.parse(body).articles[i].url;


res.write("<h2>"+title+"</h2>");
res.write("<img src="+img+" alt=image_not_provided_by_site width=500 height=300>");
res.write("<h3>"+desc+"</h3>");
res.write("<h3><a href=" + link +" target=_blank >For more information about the news click me</a></h3>" );

res.write("<hr>");
}

res.send();




  }
});




})





app.listen(3000,function (req , res){

	console.log("Server is running on prot 3000");

})