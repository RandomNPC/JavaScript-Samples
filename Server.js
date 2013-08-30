﻿/*
*/

var express=require('express');
var app=express();

app.use(express.static(__dirname+'/root'));


var clientCount=0, currentid=0;
var players=new Array();


app.get('/login/*', function(request, response) {
	var msg='';
	msg+='ok login\n';
	msg+='id '+(currentid++);
	response.end(msg);

	var player=new Player();
	var params=request.params[0].split('/'); // Split the URL into parts
	player.name=params[0];
	player.pos.x=params[1];
	player.pos.y=params[2];
	player.facing=params[3];
	player.targeting=params[4];


	players.push(player);

	console.log('   Connected: '+JSON.stringify(player));
	console.log('   Client '+currentid+', "'+player.name+'", connected   [## of players: '+(++clientCount)+']');
});


var Player=function() {
	this.name=''
	this.pos={ x: 0, y: 0 };
	this.facing=0;
	this.targeting=0;
	this.siegeMode=false;
}


app.listen(80);