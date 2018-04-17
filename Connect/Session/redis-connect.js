var connect=require('connect');
var RedisStore=require('connect-redis')(connect);
var server=connect();
server.use(
	connect.cookieParser(),
	connect.session({store:new RedisStore,secret:'my secret!'}),
	function(req,res,next){
		if (req.session.test)
			console.log('before:'+req.session.test);
		req.session.test='woc!!!';
		console.log('after:'+req.session.test);
	}
	);
server.listen(3000);