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

	this._frame=0;			// < Current frame of an animation
	this._frameCount=0;	// < Number of frames in an animation


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

	// This steps in the animation
	this.step=function() {
		var step=false; // Whether to step in the animation

		if(this.loop) { // In looped mode, always step
			step=true;
		} else { // In non-looped, only step if not the end of the animation
			if(!this.isEnd()) step=true;
		}

		if(step) {
			if(this.reverse) { // In reverse, if (frame<0), restart animation
				if((--this._frame)<0) this._frame=this._frameCount-1;
			} else { // Normally, if (frameCount<frame), restart animation
				if(this._frameCount<=(++this._frame)) this._frame=0;
			}
		}
	}
}