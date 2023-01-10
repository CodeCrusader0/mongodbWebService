var express = require("express");
var app = express();
var mongoose = require("mongoose");
var path = require("path");
var bodyparser = require("body-parser");
var routes=require("./routers/routes.js")

mongoose.Promise = global.Promise;

const url = "mongodb://0.0.0.0:27017/test";

//middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,"public")));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });
  
  

//mongo connection 
mongoose.connect(url, (err, result) => {
    if (err) {
        console.log("'t data");
    }
    else {
        console.log("connection done");
    }
})

app.use("/",routes);

app.listen(4000, () => { console.log("Server running on 4000") });
module.exports=app;