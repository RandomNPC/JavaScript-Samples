//		Main Code


var canvas, ctx;
var mouse={ x: 0, y: 0 };

var tank;


var login=new XMLHttpRequest(), logindone, loginrecv;
var playerName='', playerID=-1;

var pos=new XMLHttpRequest(), posdone=true, posrecv='{}';
var players=new Array(); // players is the array of Sprites of everyone
var roster; // roster the updated list of everyone's state


window.onload=function() { // Makes sure the website is loaded before running code
	canvas=document.getElementById('canvas');
	ctx=canvas.getContext('2d');

	tank=new Unit_Tank();

	while(playerName.length==0) playerName=prompt('Pick a name');
	if(playerName==null) return;
	loginsend();


	setInterval(function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if(tank.name.length!=0) {
			processTanks(); // Go to the function where we proccess all the tanks.
		} else {
			if(logindone) {
				if(loginrecv.substr(0, 2)=='ok') {
					if(posdone) {
						processTanks(); // Get the list of players
						if(0<players.length) {
							playerID=Number(nextLine(loginrecv));
							tank=players[playerID];
						} else { // If download fails
							//loginsend();
						}
					} else {
						ctx.font='24px Arial';
						ctx.fillText('Getting data...', 8, 24);
					}
				}
			} else {
				ctx.font='24px Arial';
				ctx.fillText('Logging In...', 8, 24);
			}
		}
	}, 16);


	canvas.onmouseup=function() { // On click
		tank.setDest(mouse.x, mouse.y);
	}

	canvas.onmousemove=function(event) { // Mouse move
		mouse.x=event.offsetX;
		mouse.y=event.offsetY;
	}

	document.onkeyup=function(event) { // Keyboard key up
		switch(event.keyCode) {
			case 84: // T
				tank.changeMode();
				break;
			case 32: // Space
				tank.fire();
				break;
		}
	}
};


function processTanks() {
	if(posdone) {
		roster=JSON.parse(posrecv);

		while(players.length<roster.length) { // Populate tank array with new guys
			var newTank=new Unit_Tank();

			var i=players.length;
			newTank.name=roster[i].name;
			newTank.translate(Number(roster[i].pos.x), Number(roster[i].pos.y));
			newTank.setFace(Number(roster[i].face));
			newTank.setTarget(Number(roster[i].target));
			newTank.changeMode(eval(roster[i].siegeMode));

			players.push(newTank);
			console.log(players);
		}

		possend();
	}

	for(var i=0; i<players.length; ++i) { // Draw everyone to the playing field
		if(i==playerID) continue; // Except yourself

		// Update that player's states
		players[i].setDest(Number(roster[i].pos.x), Number(roster[i].pos.y));
		players[i].target(Number(roster[i].target));
		players[i].changeMode(eval(roster[i].siegeMode));

		players[i].drawAni(ctx); // Draw that player
	}

	tank.target(mouse.x, mouse.y);
	tank.drawAni(ctx);

	var playerPos=tank.getPos();
}

// Grab the next lines from a string
function nextLine(str) { return str.substr(str.search('\n')+1); }

function loginget() {
	if(this.readyState==4&&this.status==200) {
		loginrecv=this.responseText;
		logindone=true;
		//console.log(loginrecv);
	}
};
function loginsend() {
	logindone=false;
	loginrecv='';
	login.onreadystatechange=loginget;
	login.open('get', '/login/'+playerName, true);
	login.send();
};

function posget() {
	if(this.readyState==4&&this.status==200) {
		posrecv=this.responseText;
		posdone=true;
		//console.log(posrecv);
	}
};
function possend() {
	var x=tank.atDest?tank.getPos().x:tank._dest.x;
	var y=tank.atDest?tank.getPos().y:tank._dest.y;

	posdone=false;
	posrecv='';
	pos.onreadystatechange=posget;
	pos.open('get',
		'/pos/'+
		playerID+'/'+
		x+'/'+
		y+'/'+
		tank.getFace()+'/'+
		tank.getTarget()+'/'+
		tank._siegeMode, true);
	pos.send();
};