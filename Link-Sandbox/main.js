var canvasMain = document.getElementById('main');
var ctxMain = canvasMain.getContext('2d');

var gameWidth = canvasMain.width;
var gameHeight = canvasMain.height;

var btnPlay = new Button(148,591,159,302);

var mouseX = 0;
var mouseY = 0;

var menu = new Image();
menu.src = 'images/menu.png';
menu.addEventListener('load',init,false);

//main
function init(){
	drawMenu();
	document.addEventListener('click',mouseClicked,false);
}

//menu
function drawMenu(){
	ctxMain.drawImage(menu,0,0,gameWidth,gameHeight,0,0,gameWidth,gameHeight);
}

//Button
function Button(xL,xR,yT,yB){
    this.xLeft = xL;
    this.xRight = xR;
    this.yTop = yT;
    this.yBottom = yB;
}

Button.prototype.checkClicked = function() {
    if (this.xLeft <= mouseX && mouseX <= this.xRight && this.yTop <= mouseY && mouseY <= this.yBottom) return true;
};

//event
function mouseClicked(e) {
    mouseX = e.pageX - canvasMain.offsetLeft;
    mouseY = e.pageY - canvasMain.offsetTop;
    if (btnPlay.checkClicked()) alert('play game');
}