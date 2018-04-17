var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    express_locals = require('express-locals'),
    bodyparser = require('body-parser');
var mongoose = require('mongoose');
// var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
app = express();

app.use(bodyparser())
    .use(cookieParser())
    .use(session({ secret: 'my secret' }));
/*
	* 身份验证中间件
	*/

	app.use(function (req, res, next) {
		console.log("进入了中间件");
		if (req.session.loggedIn) {
			res.locals.authenticated=true;
			console.log(JSON.stringify(express_locals));
			app.users.findOne(function(err,doc) {
				if (err) return next(err);
			});
			app.users.findOne({ _id:  mongoose.Types.ObjectId(req.session.loggedIn)  }, function (err,doc) {
				if (err) return next(err);
				console.log("已登录");
				console.log(doc);
				console.log(doc.ops);
				res.locals.me=doc;
				next();
			});
		}else {
			res.locals.authenticated=false;
			console.log(JSON.stringify(express_locals));
			next();
		}
	});
app.set('view engine', 'jade');
app.set('view options', {layout:false});
//默认'views'模板引擎位置就是views文件夹

app.get('/', function(req, res) {
    res.render('index');
});




/*
* 登录路由
*/

app.get('/login', function(req, res) {
	res.render('login');
});

app.get('/login/:signupEmail',function (req,res) {
	res.render('login',{signupEmail:req.params.signupEmail});
})

/*
* 注册路由
*/

app.get('/signup',function(req, res) {
	res.render('signup');
});


/*
 *Mongo
* my-website 数据库名，不存在则Mongo自动创建
× users 集合
*
*/
const url = 'mongodb://localhost:27017';
const dbname = 'my-website';

MongoClient.connect(url,function (err, client) {
	if (err) throw err;
	console.log('\033[96m + \033[39m connected to mongodb');
	//数据库连接
	const db=client.db(dbname);
	//集合(表table)连接
	app.users = db.collection('users');

	/*
	* 处理路由
	*/
	//注册提交结果
	app.post('/signup',function(req,res) {
		app.users.insertOne(req.body.user, function (err,doc) {
			// console.log(JSON.stringify(req.body.user));
			// console.log(doc);
			if (err) {
				console.log(err);
				return next(err);
			}
			res.redirect('/login/'+doc.ops[0].email);
		});

	});
	//登录提交结果
	app.post('/login', function(req,res) {
		app.users.findOne({email: req.body.user.email, pw: req.body.user.pw}, function(err,doc) {
			if (err) return next(err);
			if (!doc) return res.send('<p>User not found. Go back and try again</p>');
			req.session.loggedIn = doc._id.toString();
			console.log(req.session.loggedIn);
			res.redirect('/');
		})
	})
	//登出
	app.get('/logout',function (req,res) {
		req.session.loggedIn = null;
		res.redirect('/');
	})
	/*
	* 启动索引
	* 监听
	*/
	const indexCollection = function(db, callback) {
	  db.collection('users').createIndex(
	    { "email": 1 , "pw": 1 },
	      null,
	      function(err, results) {
	        console.log(results);
	        callback();
	    }
	  );
	};
	indexCollection(db, function() {
		app.listen(3000,function() {
			console.log('\033[96m + \033[39m app listening on *:3000');
		});
	});




	// client.close();
});
