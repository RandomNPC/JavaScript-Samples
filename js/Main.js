//		Main Code


var canvas, ctx;
var mouse={ x: 0, y: 0 };

var tankBody;



window.onload=function() { // Makes sure the website is loaded before running code
	canvas=document.getElementById('canvas');
	ctx=canvas.getContext('2d');

	tankBody=new Sprite('tankBody');
	tankBody.setTileSize(128, 128);
	tankBody._frameTimeMax=6;
	tankBody.x=64;
	tankBody.y=90;
	tankBody.draw(ctx);

	tankBodyB=new Sprite('tankBody');
	tankBodyB.setTileSize(128, 128);
	tankBodyB._frameTimeMax=3;
	tankBodyB.x=128;
	tankBodyB.y=90;
	tankBodyB.draw(ctx);

	tankBodyC=new Sprite('tankBody');
	tankBodyC.setTileSize(128, 128);
	tankBodyC._frameTimeMax=1;
	tankBodyC.x=192;
	tankBodyC.y=90;
	tankBodyC.draw(ctx);

	setInterval(function() {
		tankBody.drawAni(ctx);
		tankBodyB.drawAni(ctx);
		tankBodyC.drawAni(ctx);
	}, 42)


	canvas.onmouseup=function() { // On click

	}

	canvas.onmousemove=function(event) { // Mouse move
		mouse.x=event.offsetX;
		mouse.y=event.offsetY;
	}

	document.onkeyup=function(event) { // Keyboard key up
		switch(event.keyCode) {
			case 84: // T
				break;
			case 32: // Space
				break;
		}
	}
};