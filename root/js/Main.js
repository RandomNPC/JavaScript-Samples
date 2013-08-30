//		Main Code


var canvas, ctx;
var mouse={ x: 0, y: 0 };

var tank;


var login=new XMLHttpRequest(), logindone, loginrecv;
var playerName='', playerID=0;
var players=new Array();


window.onload=function() { // Makes sure the website is loaded before running code
	canvas=document.getElementById('canvas');
	ctx=canvas.getContext('2d');

	tank=new Unit_Tank('tankBody');
	tank.translate(64, 90);

	while(playerName.length==0) playerName=prompt('Pick a name');
	loginsend();


	setInterval(function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if(tank.name.length!=0) {
			processTanks(); // Go to the function where we proccess all the tanks.
		} else {
			if(logindone) {
				if(loginrecv.substr(0, 2)=='ok') {
					tank.name=playerName+' [id: '+nextLine(loginrecv)+']';
					playerID=Number(nextLine(loginrecv));
				}
			} else {
				ctx.font='24px Arial';
				ctx.fillText('Logging In...', 8, 24);
			}
		}
	}, 42);


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
				break;
		}
	}
};


function processTanks(){
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
		console.log(loginrecv);
	}
};
function loginsend() {
	logindone=false;
	loginrecv='';
	login.onreadystatechange=loginget;
	login.open('get', 
		'/login/'+
		playerName+'/'+
		tank.getPos().x+'/'+
		tank.getPos().y+'/'+
		tank.getFace()+'/'+
		tank.getTarget(), true);
	login.send();
};

var posSpamLess=0;
function posget() {
	if(this.readyState==4&&this.status==200) {
		posrecv=this.responseText;
		posdone=true;
		console.log(posrecv);
	}
};
function possend() {
	if(posSpamLess++==3) { // Spams at most half the time :P
		posSpamLess=0;
		return;
	}

	posdone=false;
	posrecv='';
	pos.onreadystatechange=posget;
	pos.open('get',
		'/pos/'+
		playerID+'/'+
		tank._dest.x+'/'+
		tank._dest.y+'/'+
		tank.getFace()+'/'+
		tank.getTarget()+'/'+
		tank._siegeMode, true);
	pos.send();
};