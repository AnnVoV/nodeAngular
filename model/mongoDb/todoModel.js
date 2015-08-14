var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
    text:{
        type: String
    },
    done: Boolean
});

//定义数据表Todo 的数据模型
var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;