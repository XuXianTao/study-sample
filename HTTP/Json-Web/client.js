var qs=require('querystring');
var http=require('http');
//node-0,client-1,---2~slice(2)选择2下标元素及其之后的元素,join放字符串,trim去掉首尾空格
var search =process.argv.slice(2).join(' ').trim();
if (!search.length){
	return console.log('\n Usage:node tweets <search term>\n');
}
console.log('\n searching for:\033[96m'+search+'\033[39m\n');
http.request({
	host:'data.dev.1fenda.com',
	//method:'GET',
	path:'/api/app/6/config?_format=json'//+qs.stringify({q:search}),
	//path:('/users/'+search),
	//header:{
	//	'Content-type':'*/*'
	//}
},function (res){
	//console.log(this.getRequest().getRealPath());
	var body='';
	res.setEncoding('utf-8');
	res.on('data',function(chunk){
		body+=chunk;
	});
	res.on('end',function(){
		if(body){
			body.trim();
			console.log('hhhh:'+body);
			var obj=JSON.parse(body);
			console.log(obj);
			obj.members.forEach(function (tweet){
			console.log(' \033[90m'+tweet.avatar+'\033[39m');
			console.log(' \033[94m'+tweet.name+'\033[39m');
			console.log('--');
			});
		}else console.log('Error!!!');
	});
}).end();
// http.get({
// 	host:...,
// 	path:...
// },function(res){});不必再调用end

