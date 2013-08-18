// JavaScript goes in this

window.onload=function() {
	canvas=document.getElementById('canvas');
	ctx=canvas.getContext('2d');

	ballPic=document.getElementById('ball'); // Pulls the pic from the page
	ballX=0; // Position of the ball
	ballY=3; // ^

	vel=2; // Direction & speed to move in

	setInterval(gameLoop, 24);
}

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	ballX+=vel; // Make the ball constantly move
	if(ballX<=0) vel=2;             // Turns the ball around to keep it sorta in the canvas
	if(canvas.width<=ballX) vel=-2; // ^

	ctx.drawImage(ballPic, ballX, ballY); // Draws to the canvas
}