//		Main Code


var canvas, ctx;
var mouse={ x: 0, y: 0 };

var tankBody;



window.onload=function() { // Makes sure the website is loaded before running code
	canvas=document.getElementById('canvas');
	ctx=canvas.getContext('2d');

	tank=new Unit_Tank('Siege Tank');
	tank.translate(64, 90);


	setInterval(function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		tank.target(mouse.x, mouse.y);
		tank.drawAni(ctx);
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
				tank.fire();
				break;
		}
	}
};