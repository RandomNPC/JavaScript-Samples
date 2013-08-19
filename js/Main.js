//		Main Code


var canvas, ctx;



window.onload=function() { // Makes sure the website is loaded before running code
	canvas=document.getElementById('canvas');
	ctx=canvas.getContext('2d');

	/*
		I made a class called "Sprite" in the file "js/Sprite.js".
			If you look at it, there are the 4 parts I used in the
			last commit: id, img, x, y.  Each tank remembers which
			parts belong to it
	*/

	// Declaring 3 Sprites
	var tank1=new Sprite('Player 1 Tank');
	var tank2=new Sprite('Player 2 Tank');
	var tank3=new Sprite('Player 3 Tank');

	// Setting the data
	tank1.img=document.getElementById('siegeBody');
	tank1.x=0;
	tank1.y=0;
	tank2.img=document.getElementById('siegeBody');
	tank2.x=200;
	tank2.y=100;
	tank3.img=document.getElementById('siegeBody');
	tank3.x=100;
	tank3.y=150;

	i=0; dir=1; // This is for a simple animation
	setInterval(function() { // ^
		tank2.x+=dir;
		tank3.y+=dir;

		// Draw each tank
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		tank1.draw(ctx);
		tank2.draw(ctx);
		tank3.draw(ctx);

		if(50<++i) { i=0; dir*=-1; } // For animation
	}, 42);

	/*
		As you can see, to access a tank's part, I use the
			dot operator [period].
			
		To access a tank's X position, I use: "tank2.x"
	*/
};