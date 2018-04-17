var fs=require('fs');
var stdin=process.stdin,stdout=process.stdout;
// fs.readdir(__dirname,function (err,files){
// 	console.log(files);
// });//异步执行官
// process.stdout.write('sdaisd');//process-stdin stdout stderr(stream)
//cwd() 是当前执行node命令时候的文件夹地址 
// __dirname 是被执行的js 文件的地址
fs.readdir(process.cwd(),function (err,files){
	console.log('');
	if(!files.length){
		return console.log('  \033[31m No files to show!\033[39m\n');
	}
	console.log('  select which file or directory you want ot see \n');
	var stats=[];
	function file(i){
		var filename=files[i];
		fs.stat(__dirname+'/'+filename,function(err,stat){
			stats[i]=stat;
			if(stat.isDirectory()){
				console.log('    '+i+'    \033[36m'+filename+'/\033[39m');
			}else{
				console.log('    '+i+'    \033[90m'+filename+'\033[39m');
			}
			i++;
			if(i==files.length){
				read();
			}else file(i);
		});
	}
	function read(){
		console.log('');
		stdout.write('   \033[33mEnter your choice:  \033[39m');
		stdin.resume();
		stdin.setEncoding('utf8');
		stdin.on('data',option);
	}
	function option(data){
		var filename=files[Number(data)];
		if(!files[Number(data)]){
			stdout.write('   \033[31mEnter your choic:   \033[39m');
		}else {
			stdin.pause();
			fs.readFile(__dirname+'/'+filename,'utf-8',function (err,data){
				console.log('');
				console.log('\033[90m'+data.replace(/(.*)/g,'     $1')+'\033[39m');
			});
		}
	}
	file(0);
});