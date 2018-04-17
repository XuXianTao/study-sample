// exports.home=function(req,res,next){};
// exports.search=function(req,res,next){};
//-----------还可以直接路由信息写好
var app=module.exports=express.createServer();
app.get('/',function(req,res,next){});
app.get('/categories',function(req,res,next){});
