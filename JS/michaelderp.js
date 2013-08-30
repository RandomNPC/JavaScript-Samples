var FPS = 1000/30;
var canvas = document.getElementById("screen");
var context = canvas.getContext("2d");

canvas.addEventListener('mousemove', setWhere, false);
document.addEventListener('keydown', addBAdger, false);


//data for the state ofthe app
//images
var badgerIM = new Image();
var mushroomIM = new Image();
var snakeIM = new Image();
var BGIM = new Image();
badgerIM.src = "badgers.png";
mushroomIM.src = "shroom.png";
snakeIM.src = "snake.png";
BGIM.src = "background.jpeg";

var badgerAnim = new Array();
var numBadgers = 0;

var whereX = 0;
var whereY = 0;

function setWhere(evt){
	whereX = evt.offsetX;
	whereY = evt.offsetY;
}

function addBAdger(){
	badgerAnim[numBadgers++] = new animate(badgerIM,270,340/2,2,2,whereX, whereY);	
}
function removeBadgers(){
	numBadgers = 0;
}
function draw(){
	context.clearRect(0,0,canvas.width, canvas.height);
	context.drawImage(BGIM,0,0,canvas.width, canvas.height);
	for(var i = 0; i<numBadgers; i++){
		badgerAnim[i].draw();
	}
}
function update(){

}
function GAME(){
	update();
	draw();
}

var game = setInterval(GAME, FPS);