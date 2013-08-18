// JavaScript goes in this

window.onload=function() {
	canvas=document.getElementById('canvas');
	ctx=canvas.getContext('2d');

	ballPic=document.getElementById('ball'); // Pulls the pic from the page

	ctx.drawImage(ballPic, 8, 2); // Draws to the canvas
}