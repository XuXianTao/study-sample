// var http=require('http');
// http.createServer(function (req,res){
// 	res.writeHead(200,{'Content-Type':'text/html'});
// 	res.end('<h1>hellow world</h1>');
// }).listen(3000);
var net=require('net');
var count=0;
var users={};
//服务端每次新建连接都触发函数
var server=net.createServer(function (conn){
	var nickname;
	conn.setEncoding('utf8');
	console.log('\033[90m new connection!!\033[39m');
	conn.write(
		'\r\n > welcme to node-chat!'+
		'\r\n > ' + count + ' other people are connected at this time.'+
		'\r\n > please write your name and press enter: ');
	count++;
	function broadcast(msg,excptMyself){
		for(var i in users){
			if (!excptMyself||i!=nickname){
				users[i].write(msg);
			}
		}
	}
	var temp='';
	conn.on('data',function(data){
		process.stdout.write(data);
		temp=temp+data;
		if (!nickname&&data=='\r\n'){
			data=temp;
			data=data.replace('\r\n','');
			temp='';
			if (users[data]){
				conn.write('\r\n>'+data+' already used. try again:\r\n');
				return;
			}else{
				nickname=data;
				users[nickname]=conn;
				broadcast('\r\n> '+nickname+' joined the room\r\n');
			}
			conn.write('\r\n>'+nickname+':');
		}else if (data=='\r\n') {
			conn.write(data);
			data=temp;
			data=data.replace('\r\n','');
			temp='';
			broadcast('\r\n> '+nickname+': '+data+'\r\n');
		}
	});
	conn.on('close',function(){
		count--;
		delete users[nickname];
		broadcast(nickname+' has left the room ~~\r\n');
	});
});
//监听得端口，在开启监听时执行函数
server.listen(3000,function(){
	console.log('\033[96m   server listening on *:3000\033[39m');
});
