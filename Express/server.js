// var express=require('express'),
// 	search=require('./search');
// var app=express.createServer();
// app.set('view engine','ejs');
// app.set('views',__dirname+'/views');
// app.set('view options',{layout:false});
// //配置缓存，不必每次修改重开服务器
// app.configure('production',function(){
// 	app.enable('view cache');
// });

// // app.set('view cache',true);
//  console.log("enabled:"+app.enabled('view cache'));
// // console.log("\ndisabled:"+app.disabled('view engine'));
// //路由
// app.get('/',function(req,res){
// 	console.log(res.header('content-type'));
// 	res.render('index',function(err,html){
// 		//res.send("<script>alert('hhhh');</script>"+html);
// 		res.send({hello:'sad',htil:'asidh'});
// 	});
// 	//res.render('index');
// });
// app.get('/search',function (req,res,next){
// 	search(req.query.gid,function(err,tweets){
// 		if (err) return next(err);
// 		res.render('search',{results:tweets,search:req.query.gid});
// 	});
// });

// app.listen(3000);
//----------------------
var express=require('express'),
	blog=require('./blog'),//js文件
	pages=require('./pages'),
	tags=require('./tags');
var app=express.createServer();
//路由信息
// app.get('/blog',blog.home);//exports函数
// app.get('/search',blog.search);
//------还可以使用已经定义好路由的模块
app.use('/blog',require('./blog'));//在模块路由的基础上定义前缀
