var request=require('superagent');
request.get('http://data.dev.1fenda.com/api/article')
	.query({
		gid:3,
		_format:'json',
		page:0
	})
	.end(function(err,res){
			//console.log(JSON.parse(res));
			console.log(res.body);
			// if(res.body&&Array.isArray(res.body.results)) {
			// 	return fn(null,res.body.results);
			// }
			// fn(new Error('Bad twitter response'));
	});