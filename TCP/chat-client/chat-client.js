var net=require('net');
// net.connect(3000,'localhost');
// client.on('connenct',function(){});
// net.connect(3000,'localhost',function(){});
var client=net.connect(7070,'irc.gpbeta.com');
client.setEncoding('utf-8');
client.on('connect',function(){
	client.write('NICK mynick\r\n');
	client.write('USER mynick 0 * :realname\r\n');
	client.write('JOIN #http-bind\r\n');
});