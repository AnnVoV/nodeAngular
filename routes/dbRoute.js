var express = require('express');
var router = express.Router();
var mongooConnect = require('../model/mongoo');


router.get('/connect',function(req,res,next){
    mongooConnect.connect(req,res);
    next();
});  

module.exports = router;

