var FPS = 1000/30;
var canvas = document.getElementById("screen");
var context = canvas.getContext("2d");

canvas.addEventListener('mousemove', setWhere, false);
document.addEventListener('keydown', addBadger, false);


//data for the state ofthe app
//images
var badgerIM = new Image();
var mushroomIM = new Image();
var snakeIM = new Image();
var BGIM = new Image();
badgerIM.src = "Pics/badgers.png";
mushroomIM.src = "Pics/shroom.png";
snakeIM.src = "Pics/snake.png";
BGIM.src = "Pics/background.jpeg";

//audio
var mainTheme = new Audio();
var badgerTom = new Array();
badgerTom[0] = new Audio("Sounds/Tom/Badger 1.wav");
badgerTom[1] = new Audio("Sounds/Tom/Badger 2.wav");
badgerTom[2] = new Audio("Sounds/Tom/Badger 3.wav");
var shroomMike = new Audio("Sounds/Michial/Mushroom.wav");
var snakuYirong = new Audio("Sounds/Yirong/Snake.wav");


//badger data
var badgerAnim = new Array();
var numBadgers = 0;

//shroom data
var stretchX = 100;
var stretchY = 100;

var whereX = 0;
var whereY = 0;

var timer = 0;

//scene switch data
var gotoShroom = true;
var gotoSnake = false;
//current scene data
var atBadgerScene = true;
var atShroomScene = false;
var atSnakeScene = false;

//function is called by mousemove event. this changes the value of whereX/whereY to
//track mouse
function setWhere(evt){
	whereX = evt.offsetX-83;
	whereY = evt.offsetY-115;
}

//adds a badger to the array of badgers to draw
function addBadger(e){
	if(atBadgerScene){
		if (e.keyCode == 66){
			if(numBadgers >= 12){
				numBadgers = 0;
				atBadgerScene = false;
				if(gotoShroom){atShroomScene = true; shroomMike.play();}
				else{atSnakeScene = true; snakuYirong.play();}
			}
			else{
			badgerTom[Math.floor(Math.random()*3)].play();
			badgerAnim[numBadgers++] = new animate(badgerIM,270,340/2,2,2,whereX, whereY);
			}	
		}
	else if(atShroomScene){
		
		
		
	}
	else if(atSnakeScene){
			
	}
	}
}
//changes the number of badgers to zero.
function removeBadgers(){
	numBadgers = 0;
}
//draws what needs to be drawn to the canvas' context
function draw(){
	context.clearRect(0,0,canvas.width, canvas.height);
	context.drawImage(BGIM,0,0,canvas.width, canvas.height);
	if(atBadgerScene){
	for(var i = 0; i<numBadgers; i++){
			badgerAnim[i].draw();
		}
	}
	else if(atShroomScene){
		context.drawImage(mushroomIM, 20,25,stretchX, stretchY);
	}
	else if(atSnakeScene){
		context.drawImage(snakeIM, 200, 100);
	}
}
//do i need it? update is usually for games
function update(){
	if(atShroomScene){ 
		stretchX+=4;;stretchY+=4;
		timer++;
		if(timer>= 60){
			atShroomScene = false; atBadgerScene = true; gotoShroom = false;
			gotoSnake=true; timer = 0;
		}
	}
	else if(atSnakeScene){
		timer ++;
		if(timer>=240){timer = 0; gotoSnake = false; gotoShroom = true;
			atSnakeScene=false; atBadgerScene =true;}
	}
}
function GAME(){
	update();
	draw();
}

var game = setInterval(GAME, FPS);