process.stdin.resume();
process.stdin.setEncoding('ascii');
var connect=require('connect');
var server=connect();
server.use(
	connect.basicAuth(function (user,pass,fn){
		process.stdout.write('Allow user \033[96m'+user+'\033[39m '
			+'with pass \033[90m'+pass +'\033[39m ? [y/n]: ');
		process.stdin.once('data',function (data){
			if(data[0]=='y') fn(null,{username:user});
			else fn(new Error('Unauthorized'));
		});
	})
);
server.use(
	function (req,res){
		res.writeHead(200);
		res.end('Welcome to the protected area,'+req.remoteUser.username);
	});
server.listen(3000);