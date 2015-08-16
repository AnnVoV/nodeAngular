var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
    picName: String,
    title: String,
    desc: String,
    price: Number,
    orgPrice: Number,
    satisfy: Number
});

//定义数据表Todo 的数据模型
var List = mongoose.model('list', listSchema);

module.exports = List;