var express=require('express'),
	wsio=require('websocket.io');

var app=express()
.use(express.static('public'))
.listen(3000);
var ws=wsio.attach(app);

var positions={},
	total=0;
ws.on('connection',function(socket){
	socket.id=++total;
	socket.send(JSON.stringify(positions));

	socket.on('message',function(msg){
		console.log('socket.id:'+socket.id);
		console.log('ws.clients.length'+ws.clients.length);
		// try{
			var pos=JSON.parse(msg);
			broadcast(JSON.stringify({type:'position',pos:pos,id:socket.id}));
			console.log('send:'+JSON.stringify({type:'position',pos:pos,id:socket.id}));
		// }catch(e){
			// return;
		// }
		positions[socket.id]=pos;
		console.log('position:'+JSON.stringify(positions));
	});
	socket.on('close',function(){
		delete positions[socket.id];
		broadcast(JSON.stringify({type:'disconnect',id:socket.id}));
	});
	function broadcast(msg){
		for(var i=0,l=ws.clients.length;i<l;i++){
			if(ws.clients[i] && socket.id!=ws.clients[i].id){
				ws.clients[i].send(msg);
			}
		}
	}
});
