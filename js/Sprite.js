﻿//		Sprite Object


var Sprite=function(id) {
	this.id=id;
	this.img=document.getElementById(id);

	this.x=0;	// Position of the sprite in the world
	this.y=0;
	this.vel=1;	// Velocity at which the sprite moves
	this.angVel=Math.PI/16; // Radians per frame of rotation

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
	this._frameTime=0;
	this._frameTimeMax=4;
	this._alt=0;			// < Alternate views [different angles]
	this._altCount=0;
	this._ang=0;

	this._lastSheetPos={ u: 0, v: 0 };

	this._stepped=0; // DEBUG: Help coders catch unecessary calls to step() before a draw()


	this.Sprite=function(id) { // Constructor
		this.id=id;
		this.img=document.getElementById(id);

		if(this.img!=null) {
			this.setTileSize(this.sizeX, this.sizeY);
		} else {
			var id=this.id;
			this.id=null;
			throw ('ID "'+id+'" not found.  Not initializing');
		}
	}


	// Draws to canvas only
	this.draw=function(ctx) {
		if(ctx==undefined) throw ('Context not passed');
		if(this.id==null) throw ('Sprite not initialized');

		this._stepped=0;

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
		this._lastSheetPos=this._getSheetPos();
		if(!this.idle) this.step();
		this.draw(ctx);
	}

	// Translates the object to this cord [basically teleport]
	this.translate=function(x, y) {
		this.x=x;
		this.y=y;
	}

	// Moves a small amout to the specified direction.
	// This steps in the animation.
	this.move=function(x, y, v) {
		if(v==undefined) v=this.vel;
		else this.vel=v;

		// Offsets
		var cx, cy, vx, vy, moved;
		cx=(x-this.x);
		cy=(y-this.y);
		moved=(cx!=0||cy!=0);

		if(this.idle&&moved) this.step();

		// If the place to travel is less than a pixel, stop
		if(-1<cx&&cx<1) {
			cx=0;
			this.x=x;
		}
		if(-1<cy&&cy<1) {
			cy=0;
			this.y=y;
		}

		// Gonna have to do some math to make diagonal movement smooth
		if(cx==0) vx=0;
		else vx=(cx<0?-1:1)*this.vel*Math.cos(Math.atan(cy/cx));
		if(cy==0) vy=0;
		else vy=(cy<0?-1:1)*Math.sqrt(this.vel*this.vel-vx*vx);
		// If math isn't for you, don't worry about this.  :P

		this.x+=vx;
		this.y+=vy;

		return !moved; // Return true if destination reached
	}

	// Face the sprite in a direction
	this.face=function(x, y) {
		var destAng=0;
		x=x-this.x;
		y=y-this.y;

		if(x!=0||y!=0) {
			if(y==0) {
				destAng=Math.PI/2;
				if(x<0) destAng+=Math.PI;
			} else {
				destAng=Math.atan(x/y);
				if(y<0) destAng+=Math.PI;
			}
			destAng+=Math.PI*3/2; // Prevents negative values
			destAng%=Math.PI*2;

			this._ang=destAng;
			this._alt=this._getAngleIndex(destAng);
		}
	}

	// Animate a turn towards a direction
	this.turn=function(x, y) {
		var destAng=0;
		x=x-this.x;
		y=y-this.y;

		if(x!=0||y!=0) {
			if(y==0) {
				destAng=Math.PI/2;
				if(x<0) destAng+=Math.PI;
			} else {
				destAng=Math.atan(x/y);
				if(y<0) destAng+=Math.PI;
			}
			destAng+=Math.PI*3/2; // Prevents negative values
			destAng%=Math.PI*2;

			/*
				Above is the normal stuff.
				Here is where it gets super complicated.
			*/

			var diff=destAng-this._ang; // Get the difference in angle
			if(diff<0) diff+=Math.PI*2;

			if(destAng<this._ang) destAng+=Math.PI*2; // Adjust to get a difference [related to unit circle]
			if(Math.PI<diff) diff-=Math.PI*2; // Adjust to make it from -π to π

			if(Math.abs(diff)<=this.angVel) this._ang=destAng; // Snap to destination
			else this._ang+=diff<0?-this.angVel:this.angVel; // Turn towards the destination

			this._ang=(this._ang+Math.PI*2)%(Math.PI*2);
			this._alt=this._getAngleIndex(this._ang);

			return (this._ang==destAng);
		}

		return true;
	}

	// This steps in the animation
	this.step=function() {
		if(this.pause) return;

		var step=false; // Whether to step in the animation

		if(this.loop) { // In looped mode, always step
			step=true;
		} else { // In non-looped, only step if not the end of the animation
			if(!this.isEnd()) step=true;
		}

		if(step) {
			if(0<this._stepped) console.log(this.id+' stepped '+(this._stepped+1)+' times since last draw.')
			if(this._frameTimeMax<=(++this._frameTime)) { // Makes a frame last some amount of time
				this._frameTime=0;

				if(this.reverse) { // In reverse, if (frame<0), restart animation
					if((--this._frame)<0) this._frame=this._frameCount-1;
				} else { // Normally, if (frameCount<frame), restart animation
					if(this._frameCount<=(++this._frame)) this._frame=0;
				}
			}
			this._stepped++;
		}
	}

	// True if the animation is not looped & the end is reached
	this.isEnd=function() {
		if(!this.loop) {
			if(this.reverse) {
				if(this._frame==0) return true;
			} else {
				if(this._frame+1==this._frameCount) return true;
			}
		}
		return false;
	}


	// Sets the size of the tiles & calculates how many frames there are
	this.setTileSize=function(sizeX, sizeY) {
		this.sizeX=sizeX;
		this.sizeY=sizeY;

		this.midX=this.sizeX/2;
		this.midY=this.sizeY/2;

		this._frame=0;
		this._frameTime=0;
		this._frameCount=Math.floor(this.img.width/this.sizeX);

		this._alt=0;
		this._altCount=Math.floor(this.img.height/this.sizeY);
	}



	// Return an index from the angle
	this._getAngleIndex=function(angle) {
		// Debug to catch out of bound angles
		if(angle<0) throw (this.id+' call to _getAngleIndex(), angle < 0');
		if(Math.PI*2<angle) throw (this.id+' call to _getAngleIndex(), 2π < angle');

		angle=-angle+Math.PI*5/2;
		return Math.round(angle/(Math.PI*2/this._altCount))%this._altCount;
	}

	// Returns the position in the sprite sheet to load
	//		the sprite from.  It has 2 parts:
	//		 u = Frame of the animation [laid out horizontal]
	//		 v = Alternate angles [laid out vertical]
	this._getSheetPos=function() {
		return { u: this.sizeX*this._frame, v: this.sizeY*this._alt };
	}



	// Constructor
	this.Sprite(id);
}