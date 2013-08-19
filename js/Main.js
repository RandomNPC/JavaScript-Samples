//		Main Code


var canvas, ctx;

var tankBody;



window.onload=function() { // Makes sure the website is loaded before running code
	canvas=document.getElementById('canvas');
	ctx=canvas.getContext('2d');

	tankBody=new Sprite('tankBody');
	tankBody.setTileSize(128, 128);
	tankBody.x=64;
	tankBody.y=90;
	tankBody.draw(ctx);
};