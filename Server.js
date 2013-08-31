/*
*/

var express=require('express');
var app=express();

app.use(express.static(__dirname+'/root'));


var clientCount=0, currentid=0;
var players=new Array();


app.get('/login/*', function(request, response) {
	var msg='';

	var player=new Player();
	player.name=request.params[0];

	var checkExist=-1; // -1 = new player; anything else is the player ID
	for(var i=0; i<players.length; i++) if(players[i].name==player.name) checkExist=i;

	if(checkExist==-1) { // New player
		++clientCount;
		msg+='ok new guy\n';
		msg+=currentid++;
		response.end(msg);
		players.push(player);

		console.log(currentid+' joined'+'   ['+clientCount+' players]');
	} else { // Returning player
		msg+='ok login\n';
		msg+=checkExist;
		response.end(msg);

		console.log('         Client '+currentid+': "'+player.name+'"');
	}
});

app.get('/pos/*', function(request, response) {
	var msg='';
	var params=request.params[0].split('/'); // Split the URL into parts
	var id=Number(params[0]);


	if(id!=-1) {
		players[id].pos.x=params[1];
		players[id].pos.y=params[2];
		players[id].face=params[3];
		players[id].target=params[4];
		players[id].siegeMode=params[5];
	}

	response.end(JSON.stringify(players));
});


var Player=function() {
	this.name=''
	this.pos={ x: 0, y: 0 };
	this.face=0;
	this.target=0;
	this.siegeMode=false;
}


app.listen(80);