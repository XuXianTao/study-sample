// io.sockets.on('connection',function(socket){
// 	socket.send('a');
// 	socket.on('message',function (msg){
// 		console.log(msg);
// 	});
// });
//html客户端使用
//var socket=io.connect();socket.on
var express=require('express');
var sio=require('socket.io');
var app=express()
	//.use(require('body-parser'))
	.use(express.static('public'))
	.listen(3000);
var io=sio.listen(app,{log:true});
io.sockets.on('connection',function(socket){
	console.log('Someone connected');
	socket.on('join',function (name){
		socket.nickname=name;//那个发起连接的单独的客户端
		socket.broadcast.emit('announcement',name+' joined the chat.');
	});
	socket.on('text',function(msg,callback){
		socket.broadcast.emit('text',socket.nickname,msg);
		callback(Date.now());
	});
});
