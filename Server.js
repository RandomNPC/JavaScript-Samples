/*
*/

var express=require('express');
var app=express();

app.use(express.static(__dirname+'/root'));


var clientCount=0, currentid=0;
var players=new Array();


app.get('/login', function(request, response) {
	var msg='';
	msg+='ok login\n';
	msg+='id '+(currentid++);
	response.end(msg);

	console.log('   Client '+currentid+', "'+'Player Name'+'", connected   [## of players: '+(++clientCount)+']');
});


app.listen(80);