//		Main Code


var canvas, ctx;



window.onload=function() { // Makes sure the website is loaded before running code
	canvas=document.getElementById('canvas');
	ctx=canvas.getContext('2d');

	/*
		I will be making something called a class.  It will store
			information relevant to the sprite in 1 place, & the
			sprite will take care of itself when we need something
			done [like transitioning in an animation].

		It's like a person has all their possessions in their own
			backpack. All the information [papers, technology, etc]
			is handled by that 1 person.

		If an object can handle itself, then I wont have to do
			extra work to handle it.



		Before I make this "class", lets see how I would handle
			3 simple tanks.
	*/

	// Declaring all of the crap each tank needs [theres more if this wasnt a simple sample]
	var tank1id='Player 1 Tank';
	var tank1img;
	var tank1x;
	var tank1y;
	var tank2id='Player 2 Tank';
	var tank2img;
	var tank2x;
	var tank2y;
	var tank3id='Player 3 Tank';
	var tank3img;
	var tank3x;
	var tank3y;

	// Setting the data
	tank1img=document.getElementById('siegeBody');
	tank1x=0;
	tank1y=0;
	tank2img=document.getElementById('siegeBody');
	tank2x=200;
	tank2y=100;
	tank3img=document.getElementById('siegeBody');
	tank3x=100;
	tank3y=150;

	i=0; dir=1; // This is for a simple animation
	setInterval(function() { // ^
		tank2x+=dir;
		tank3y+=dir;

		// Draw each tank
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(tank1img, tank1x, tank1y);
		ctx.drawImage(tank2img, tank2x, tank2y);
		ctx.drawImage(tank3img, tank3x, tank3y);

		if(50<++i) { i=0; dir*=-1; } // For animation
	}, 42);

	/*
		That is a lot for drawing 3 tanks.  Now just imagine
			doing that for 20 tanks.

		In the next commit, I will reduce this down into a class.
	*/
};