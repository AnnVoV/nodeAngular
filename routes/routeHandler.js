'use strict';
var express = require('express');
var router = express.Router();
var Model = require('../model/mongoDb/travelListModel');


router.get('/api/list',function(req,res){
    Model.List.find(function(err,result){
        res.send(result);
    });
});

router.get('/api/detail',function(req,res){ 
   var listId = req.query.listId;

    Model.List
        .findDetailByListId(listId,function(err,data){
            if(err)console.log(err);
            console.log('data:');
            console.log(data);
            return data;
        })
        .then(function(data){
            var detailInfo = data;
            var resultData = {};
            //人数下限
            var minNum = detailInfo.detailId.minNum;
            //人数上限
            var maxNum = detailInfo.detailId.maxNum;
            var peopleNum = [],
                j = 0;

            for(var i = minNum; i < maxNum; i++){
                peopleNum[j] = i;
                j++;
            }   

            resultData = {
                name: detailInfo.title,
                price: detailInfo.price,
                orgPrice: detailInfo.orgPrice,
                satisfy: detailInfo.satisfy,
                accounts: detailInfo.detailId.accounts,
                attention: detailInfo.detailId.attention,
                recommends: detailInfo.detailId.recommendList,
                chooseList: detailInfo.detailId.chooseList,
                peopleNum: peopleNum
            };

            res.send(resultData);
        });
});

module.exports = router;