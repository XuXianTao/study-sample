var express=require('express');
var sio=require('socket.io');

var app=express()
	.use(express.static('public'))
	.listen(3000);
var io=sio.listen(app);
var currentSong,dj;
function elect (socket){
	dj=socket;
	io.sockets.emit('announcement',socket.nickname+' is the new dj');
	socket.emit('elected');
	socket.dj=true;
	socket.on('disconnect',function(){
		dj=null;
		io.sockets.emit('annoucement','the dj left - next one to join becomes dj');
	});
}
io.sockets.on('connection',function (socket){
	socket.on('join',function(name){
		socket.nickname=name;
		socket.broadcast.emit('announcement',name+' joined the chat.');
		if(!dj){
			elect(socket);
		}else{
			socket.emit('song',currentSong);
		}
	});
});