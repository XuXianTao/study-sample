var mongoose = require('mongoose');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
mongoose.connect('mongodb://localhost/my_database');
var PostSchema = new Schema({
	author : {type: ObjectId, ref: 'Author' }, //自动生成键
	title : {type: String, default: 'Untitled'},
	body : {type: String, default: 'No body'},
	date: Date
});
//自动新建集合BlogPosts!! 注册模型
var Post = mongoose.model('BlogPost', PostSchema);

//获取模型
var Post = mongoose.model('BlogPost');
new Post({title: 'Mt title'}).save(function (err) {
	console.log('that was easy!');
});

//查询
Post.find({title:'Mt title'})
	// .where('title', 'My title')
	.populate('author')
	.sort({'body':-1}) //排序
	.limit(5)
	//.select('field1','field2') //所需要的键值
	//.skip(10) //跳过制定数量的文档数据，配合Model#count适合做分页
	// .run(function(err, post) {})
	;

//分页
Post.count(function (err, totalPosts) {
	var numPages = Math.ceil(totalPosts/10);

})