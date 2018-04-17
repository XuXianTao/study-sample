var http=require('http');
var fs=require('fs');

var server=http.createServer(function (req,res){
	console.log(req.url);
	if ('GET'==req.method&&'/images'==req.url.substr(0,7)&&'.jpg'==req.url.substr(-4)){
		fs.stat(__dirname+req.url,function(err,stat){
			if(err||!stat.isFile()){
				res.writeHead(404);
				res.end('Not Fount');
				return;
			}else serve(__dirname+req.url,'application/jpg');
		})
	}else if ('GET'==req.method&&'/'==req.url){
		serve(__dirname+'/index.html','text/html');
	}else{
		res.writeHead(404);
		res.end('Not Found');
	}
	function serve(path,type){
		res.writeHead(200,{'Content-type':type});
		fs.createReadStream(path).pipe(res);
	}
});


server.listen(3000);
