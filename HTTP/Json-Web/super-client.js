var request=require('superagent');
request.get('data.dev.1fenda.com/api/app/6/config?_format=json')
	//.send(参数)
	.end(function(res){console.log(res.body);});