var mongoose = require('mongoose');

//我们将会通过detailId的值去查询到具体的detail信息
var listSchema = new mongoose.Schema({
    picName: String,
    title: String,
    desc: String,
    price: Number,
    orgPrice: Number,
    satisfy: Number,
    detailId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'detail'
    }
});

var detailSchema = new mongoose.Schema({
    perMonth: Number,
    accounts: Number,
    attention: Number,
    food: String,
    travel: String,
    recommends: Array,
    chooseList: Array,
    costList: Array,
    childrenCostList: Array,
    minNum: Number,
    maxNum: Number,
    recommendList: Array,
    recommendDesc: Array,
});


listSchema.statics = {
    findDetailByListId: function(listId, callback){
        return this
               .findOne({_id: listId}).populate('detailId')
               .exec(callback);
    },
    findListById: function(listId,callback){
        return this.findOne({_id: listId})
               .exec(callback);
    }
};

//定义数据表的数据模型
var list = mongoose.model('list', listSchema);
var detail = mongoose.model('detail',detailSchema);


module.exports.List = list;
module.exports.Detail = detail;
