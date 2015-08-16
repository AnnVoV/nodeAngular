var express = require('express');
var router = express.Router();
var travelListModel = require('../model/mongoDb/travelListModel');


router.get('/api/list',function(req,res){
    travelListModel.find(function(err,result){
        res.send(result);
        console.log(result);
    });
});




module.exports = router;