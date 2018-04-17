var connect=require('connect');
var server=connect();
server.use(connect.static(__dirname+'/website'));
server.listen(3000);
//
