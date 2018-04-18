window.onload=function(){
	var socket=io.connect();
	socket.on('connect',function(){
		socket.emit('join',prompt('What is your nickname?'),function(data) {
			document.getElementById('people-counts').innerHTML=data;
		});
		document.getElementById('chat').style.display='block';
	});
	socket.on('announcement',function(data){
		var li=document.createElement('li');
		li.className='announcement';
		li.innerHTML=data.msg;
		document.getElementById('messages').appendChild(li);
		document.getElementById('people-counts').innerHTML=data.num;
	});
	var input=document.getElementById('input');
	document.getElementById('form').onsubmit=function(){
		var li=addMessage('me',input.value);
		socket.emit('text',input.value,function (date){//回调函数的使用
			li.className='confirmed';
			li.title=date;
		});
		input.value='';
		input.focus();
		return false;
	};
	socket.on('text',addMessage);
	function addMessage(from,text){
		var li=document.createElement('li');
		li.className='message';
		li.innerHTML='<b>'+from+'</b>'+text;
		document.getElementById('messages').appendChild(li);
		return li;
	}
	socket.on('disconnect',function() {
		socket.emit('disconnect');
	})
}
