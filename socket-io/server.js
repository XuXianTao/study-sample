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
	var sname="";
	console.log('Someone connected');
	socket.on('join',function (name,callback){
		sname=name;
		socket.nickname=name;//那个发起连接的单独的客户端
		let num = Object.keys(io.sockets.sockets).length;
		socket.broadcast.emit('announcement',{msg:name+'&nbsp;joined the chat.',num:num});
		console.log('%s joined the chat',sname);
		console.log('the numbers:'+num);
		callback(num);
	});
	socket.on('text',function(msg,callback){
		socket.broadcast.emit('text',socket.nickname,msg);
		var date=new Date();
		callback(date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+"\n"
			+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
	});
	socket.on('disconnect', function(){
		let num = Object.keys(io.sockets.sockets).length;
		socket.broadcast.emit('announcement',{msg:socket.nickname+'&nbsp;leave the room.',num:num});
	  console.log('%s leaved the chat',sname);
	  console.log('the numbers:'+num);
	});
});
