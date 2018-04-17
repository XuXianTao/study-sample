var express = require('express'),
    bodyparser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
		mongoose = require('mongoose');

app = express();

app.use(bodyparser())
	.use(cookieParser())
	.use(session({secret: 'my secret'}))
  .use(function (req, res, next) {
		console.log('进入了中间件');
		if (req.session.loggedIn) {
			res.locals.authenticated = true;
			User.findById(req.session.loggedIn, function (err, doc) {
				if (err) return next(err);
				res.locals.me = doc;
				next();
			});
		} else {
			console.log('before:'+res.locals.authenticated);
			res.locals.authenticated = false;
			console.log('after:'+res.locals.authenticated);
			next();
		}
	});
app.set('view engine', 'jade');
app.set('view options', {layout:false});
app.get('/', function(req,res) {
	console.log(res.locals.authenticated);
	res.render('index');
});
app.get('/login/:signupEmail?',function (req,res) {
	res.render('login',{signupEmail:req.params.signupEmail});
});
app.get('/signup',function(req, res) {
	res.render('signup');
});
app.post('/login', function (req,res) {
	User.findOne({ email: req.body.user.email, password: req.body.user.password },
		function (err, doc) {
			if (err) return next(err);
			if (!doc) return res.send('<p>User not found. Go back and try again');
			req.session.loggedIn = doc._id.toString();
			res.redirect('/');
		})
})
app.post('/signup', function (req,res,next) {
	var user = new User(req.body.user).save(function (err, doc) {
		if (err) return next(err);
		res.redirect('/login'+doc.email);
	});
});

mongoose.connect('mongodb://localhost/my-website');
var Schema = mongoose.Schema;
var User = mongoose.model('User', new Schema({
	first: String,
	last: String,
	email: {type: String, unique: true},
	password: {type: String, index: true}
}));
app.listen(3000, function () {
	console.log('\033[96m + \033[39m app listening on *:3000');
});

