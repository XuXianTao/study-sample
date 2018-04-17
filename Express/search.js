var request=require('superagent');
module.exports=function search(query,fn){
	request.get('http://data.dev.1fenda.com/api/article')
	.query({
		gid:query,
		_format:'json',
		page:'0'
	})
	.end(function(err,res){
		console.log(res.body);
		console.log('hhhh\n'+JSON.stringify(res.body.list));
			if(res.body&&Array.isArray(res.body.list)) {
				return fn(null,res.body.list);
			}
			fn(new Error('Bad twitter response'));
		});
};