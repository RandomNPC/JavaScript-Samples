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


	setInterval(function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		tankBody.drawAni(ctx);
	}, 42);

	/*
		With the crap ton of code in Sprite.js, we can now do
			fancy things with few lines of code here.  I simply
			defined the tank above, then called drawAni() on
			the tank body.

		Take a look at the web page to see it run.
	*/
};