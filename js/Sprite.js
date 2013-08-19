﻿//		Sprite Object


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

	this._lastSheetPos={ u: 0, v: 0 };


	// Draws to canvas only
	this.draw=function(ctx) {
		if(ctx==undefined) throw ('Context not passed');
		if(this.id==null) throw ('Sprite not initialized');

		this._lastSheetPos=this._getSheetPos();

		if(!this.hide) ctx.drawImage(
			this.img,	// Image source
			this._lastSheetPos.u, this._lastSheetPos.v,    	// Offset in sprite sheet [which tile to draw]
			this.sizeX, this.sizeY,	// Tile size
			Math.round(this.x)-this.midX, Math.round(this.y)-this.midY,  	// Position to place it
			this.sizeX, this.sizeY 	// Size to scale it to
		);
	}

	// Draws & steps the animation if applicable [commonly done]
	this.drawAni=function(ctx) {
		if(!this.idle) this.step();
		this.draw(ctx);
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

	// Sets the size of the tiles & calculates how many frames there are
	this.setTileSize=function(sizeX, sizeY) {
		this.sizeX=sizeX;
		this.sizeY=sizeY;

		this.midX=this.sizeX/2;
		this.midY=this.sizeY/2;

		this._frame=0;
		this._frameCount=Math.floor(this.img.width/this.sizeX);
	}


	// Returns the position in the sprite sheet to load
	//		the sprite from.  It has 2 parts:
	//		 u = Frame of the animation [laid out horizantal]
	//		 v = Alternate angles [laid out vertical]
	this._getSheetPos=function() {
		return { u: this.sizeX*this._frame, v: 0 };
	}
}