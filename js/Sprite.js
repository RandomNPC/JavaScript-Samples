//		Sprite Object


var Sprite=function(id) {
	this.id=id;
	this.img=document.getElementById(id);

	this.x=0;	// Position of the sprite in the world
	this.y=0;
	this.vel=1;	// Velocity at which the sprite moves

	this.sizeX=128; // Tile horizontal length [default: 128px]
	this.sizeY=128; // Tile vertical length

	this.midX=this.sizeX/2; // Mid point of the sprite
	this.midY=this.sizeY/2; // It will be centered here on canvas


	this.draw=function(ctx) {
		if(ctx==undefined) { console.log('Error: Context not passed'); return; }
		if(this.id==null) { console.log('Error: Sprite not initialized'); return; }

		ctx.drawImage(
			this.img,	// Image source
			50, 20,  	// Position to place it
			100, 200 	// Size to scale it to
		);
	}

	/*
		Make sure to view the web page as you follow along each step
	*/
}