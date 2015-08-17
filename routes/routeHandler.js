var express = require('express');
var router = express.Router();
var Model = require('../model/mongoDb/travelListModel');


router.get('/api/list',function(req,res){
    Model.List.find(function(err,result){
        res.send(result);
        //console.log(result);
    });
});

router.get('/api/detail',function(req,res){
    Model.Detail.findById('55cec240b590aaf3b3000001',function(err,data){
        if(err)console.log(err);
        console.log('result:');
        console.log(data);
    })

    /*Model.Detail.findOne(
        {_id:"55cec7aca55a2a203426f706"}
        ).populate('listid')
         .exec(function(err,data){
            if(err){
                console.log('err');
            }else{
                console.log(data);
            }
         });*/
});

module.exports = router;