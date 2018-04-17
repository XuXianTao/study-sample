var connect=require('connect');
var time=require('./request-time');
var server=connect();
server.use(connect.logger('dev'))
	.use(connect.query());
server.use(time({time:500}));
server.use(function(req,res,next){
	if('/a'==req.url){
		res.writeHead(200);
		res.end('Fast!');
	}else next();
});
server.use(function(req,res,next){
	if('/b'==req.url.substr(0,2)){
		setTimeout(function(){
			res.writeHead(200);
			res.end('Slow!');
		},1000);
		console.log(req.query);
	}else next();
});
server.listen(3000);
