var connect = require('connect');
var fs=require('fs');
var server = connect()
	.use(connect.bodyParser())
    .use(connect.static('static'))
    .use(connect.logger())
    .use(
        function(req, res, next) {
            if ('POST' == req.method && req.files) {
            	fs.readFile(req.files.hello.path,'utf-8',function(err,data){
            		if(err){
            			res.writeHead(500);
            			res.end('Error!!');
            			return;
            		}
            		res.writeHead(200,{'Content-Type':'text/html'});
            		res.end([
            			'<h3>FIle: '+req.files.hello.name+'</h3>',
            			'<h4>Type: '+req.files.hello.type+'</h4>',
            			'<h4>Contents:</h4><pre>'+data+'</pre>'
            			].join(''));
            	});
            	// console.log('---body---');
             //    console.log(req.body);
             //    console.log('---files---');
             //    console.log(req.file);
            }else { next(); }
        }
    );
server.listen(3000);