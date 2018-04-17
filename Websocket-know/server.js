var express=require('express'),
	wsio=require('websocket.io'),
	bodyparser=require('body-parser');
var app=express()
	.use(express.static('public'))
	.use(bodyparser)
	.post('/position',function(req,res,next){
		console.log('xxxx'+req.body.x);
	})
	.listen(3000);
var ws=wsio.attach(app);
ws.on('connection',function(socket){
	socket.on('message',function(msg){
		console.log('\033[96mgot:\033[39m '+msg);
		socket.send('pong');
	});
});
