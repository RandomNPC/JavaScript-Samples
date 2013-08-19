//		Main Code


var canvas, ctx;
var mouse={ x: 0, y: 0 };

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
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		tankBody.face(mouse.x, mouse.y);
		tankBody.drawAni(ctx);
	}, 42)

	/*
		In this example, the tank will constantly face the mouse
			cursor.  All it took was the tankBody.face() call.

		View the web page to see it.
	*/


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