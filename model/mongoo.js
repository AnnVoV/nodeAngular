var mongoose = require('mongoose');

exports.connect = function(request, response) {
    mongoose.connect("mongodb://127.0.0.1/model/mongoDb", function(e) {
        if(e){
            console.log('error',e);
        }else{
            console.log('connect....');
        }
    });
};

