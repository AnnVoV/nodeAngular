var express = require('express');
var router = express.Router();
var todoModel = require('../model/mongoDb/todoModel');


router.get('/api/todos',function(req,res){
    todoModel.find(function(err, todos) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err){
                res.send(err)
            }

            res.json(todos); // return all todos in JSON format
    });
});

// create todo and send back all todos after creation
router.post('/api/todos', function(req, res) {
    var formData = {
        text: req.body.text,
        done: false
    };

    todoModel.create(formData,function(err,todo){
        if(err){
            res.send(err);
        }
        todoModel.find(function(err,result){
            if(err)
                res.send(err);
            res.json(result);
        });
    });
      
});

router.delete('/api/todos/:todo_id', function(req, res){
    todoModel.remove({
            _id : req.params.todo_id
    },function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log(result);
            todoModel.find(function(err,result){
                if(err)
                    res.send(err);
                    res.json(result);
            });
        }   
    });
});

module.exports = router;