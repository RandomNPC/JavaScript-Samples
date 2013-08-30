/*
*/

var express=require('express');
var app=express();

app.use(express.static(__dirname+'/root'));


var clientCount=0, currentid=0;
var players=new Array();


app.get('/login/*', function(request, response) {
	var msg='';
	msg+='ok login\n';
	msg+=currentid++;
	response.end(msg);

	var player=new Player();
	var params=request.params[0].split('/'); // Split the URL into parts
	player.name=params[0];
	player.pos.x=params[1];
	player.pos.y=params[2];
	player.facing=params[3];
	player.targeting=params[4];


	players.push(player);

	//console.log('   Connected: '+JSON.stringify(player));
	console.log('   Client '+currentid+', "'+player.name+'", connected   [## of players: '+(++clientCount)+']');
});

app.get('/pos/*', function(request, response) {
	var msg='';
	var params=request.params[0].split('/'); // Split the URL into parts
	var id=Number(params[0]);

	players[id].pos.x=params[1];
	players[id].pos.y=params[2];
	players[id].facing=params[3];
	players[id].targeting=params[4];
	players[id].siegeMode=params[5];

	response.end(JSON.stringify(players));
});


var Player=function() {
	this.name=''
	this.pos={ x: 0, y: 0 };
	this.facing=0;
	this.targeting=0;
	this.siegeMode=false;
}


app.listen(80);