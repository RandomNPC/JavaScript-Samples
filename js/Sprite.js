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

	/*
		Some nice features to have in our animation:
			   Loop = Restart the animation when it hits the end
			Reverse = Play the animation backwards
			  Pause = Pause the animation
			   Idle = Only play the animation while in motion
			           ^ Cars don't animate until moving, but people do
	*/
	this.hide=false;
	this.loop=true;
	this.reverse=false;
	this.pause=false;
	this.idle=false;


	this.draw=function(ctx) {
		if(ctx==undefined) throw ('Context not passed');
		if(this.id==null) throw ('Sprite not initialized');

		if(!this.hide) ctx.drawImage(
			this.img,	// Image source
			0, 0,    	// Offset in sprite sheet [which tile to draw]
			this.sizeX, this.sizeY,	// Tile size
			Math.round(this.x)-this.midX, Math.round(this.y)-this.midY,  	// Position to place it
			this.sizeX, this.sizeY 	// Size to scale it to
		);
	}
}