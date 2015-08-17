var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
    picName: String,
    title: String,
    desc: String,
    price: Number,
    orgPrice: Number,
    satisfy: Number
});

var detailSchema = new mongoose.Schema({
    //将这张表detail表的listid 与list表相互关联
    listid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'list'
    },
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


detailSchema.statics = {
    findById: function(id,callback){
        return this.findOne({_id:id}).populate('listid')
               .exec(callback);
    }
};


//定义数据表的数据模型
var list = mongoose.model('list', listSchema);
var detail = mongoose.model('detail',detailSchema);





module.exports.List = list;
module.exports.Detail = detail;