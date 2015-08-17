var express = require('express');
var router = express.Router();
var Model = require('../model/mongoDb/travelListModel');


router.get('/api/list',function(req,res){
    Model.List.find(function(err,result){
        res.send(result);
    });
});

router.get('/api/detail/:id',function(req,res){  
   console.log(req.body);  
   Model.List.findDetailByListId('55cec240b590aaf3b3000001',function(err,data){
        if(err)console.log(err);
        //console.log('data:',data);
   });
});

module.exports = router;