var express = require("express");
var mongoose = require("mongoose");
const { response } = require("../app");
var schema = mongoose.Schema;
var router = express.Router();

var studschema = new schema(
    {
        sid: String,
        // sname: String,
        // sname: { type: String, trim: true, required: true },
        fees: String,
     //   marks:Array

    }
);

var Stud = mongoose.model("student", studschema, "student");

router.get("/student", function (req, res) {
    Stud.find().exec(function (err, data) {
        if (err) {
            res.status(500).send("No data found");
        }
        else {
            console.log(data);
            res.send(data);
        }
    })

});


router.post("/student", function (req, res) {
    var sob = new Stud({ sid: req.body.sid, 
        // sname: req.body.sname,marks:req.body.marks,
         fees: req.body.fees });
    sob.save(function (err, data) {
        if (err) {
            res.status(500).send("Failed");
        }
        else {
            res.send(data);
        }
    })
});

router.get("/student/:sid", function (req, res) {
    Stud.findOne({sid:req.params.sid}).exec(function(err,data){
        if(err){
            res.send("Failed");
        }
        else{
            res.send(data);
        }
    });
})

router.delete("/student/:sid",function(req,res){
    Stud.remove({sid:req.params.sid},function(err,doc){
        if(err){
            res.send("Err");
        }
            res.send("Successfull");
    })
})



router.put("/student/:sid",function(req,res){
    Stud.findOne({sid:req.params.sid},function(err,doc){
        if(err){ 
            res.send("Error occured");
        }else{
            doc.sid=req.body.sid,
            doc.sname=req.body.sname,
            doc.fees=req.body.fees;
            doc.marks=req.body.marks;
            doc.save(function(data){
               res.send(doc);
            })
        }
    })
})

module.exports = router;