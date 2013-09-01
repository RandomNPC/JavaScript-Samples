//		Tank Object


var Unit_Bullet=function(name) {
	this.name=name==undefined?'':name;

	this.trail=new Array();
	this.projectile=new Array();

	this.frozen=false;	// Is it frozen in an ice spell like state?
	this.siegeMode=false;

	this.vel=8;
	this._dest=new Array(); // Move to



	// Draws the projectile
	this.draw=function(ctx) {
		if(ctx==undefined) throw ('Context not passed');

		for(var i=0; i<8; ++i) {
			if(!this.projectile[i].alive) continue;
			if(this.frozen) { // Don't animate if frozen
				this.trail[i].draw(ctx);
				this.projectile[i].draw(ctx);
			} else { // Animate
				this.trail[i].drawAni(ctx);
				this.projectile[i].drawAni(ctx);
			}
		}
	}
	this.drawAni=function(ctx) {
		if(!this.frozen) this.step(); // Move the projectile if not frozen
		this.draw(ctx);
	}

	this.translate=function(x, y) {
		if(typeof x!='number') throw (this.id+': translate(x, y) parameter "x" must be a number; got a typeof('+x+')=='+typeof x);
		if(typeof y!='number') throw (this.id+': translate(x, y) parameter "y" must be a number; got a typeof('+y+')=='+typeof y);

		var oldX=this.projectile[0].x;
		var oldY=this.projectile[0].y;

		this.trail[0].translate(x, y);
		this.projectile[0].translate(x, y);

		for(var i=1, e=this.siegeMode?8:1; i<e; ++i) {
			this.trail[i].translate(x, y);
			this.projectile[i].translate(x, y);
		}
	}

	this.getPos=function(i) {
		if(typeof i!='number') throw (this.id+': getPos(i) parameter "i" must be a number; got a typeof('+i+')=='+typeof i);

		return { x: this.projectile[i].x, y: this.projectile[i].y };
	}

	this.getFace=function() { return this.projectile[0]._angle; }
	this.setFace=function(angle) {
		if(typeof angle!='number') throw (this.id+': setFace(angle) parameter "angle" must be a number; got a typeof('+angle+')=='+typeof angle);

		this.tankBody._angle=angle;
	}

	// Fires a projectile from position to destination
	//		This returns information on all projectiles for servers to reproduce
	this.fire=function(x, y, angle, distance, vel) {
		if(typeof x!='number') throw (this.id+': fire(x, y, angle, distance, vel) parameter "x" must be a number; got a typeof('+x+')=='+typeof x);
		if(typeof y!='number') throw (this.id+': fire(x, y, angle, distance, vel) parameter "y" must be a number; got a typeof('+y+')=='+typeof y);
		if(typeof angle!='number') throw (this.id+': fire(x, y, angle, distance, vel) parameter "angle" must be a number; got a typeof('+angle+')=='+typeof angle);
		if(typeof distance!='number') throw (this.id+': fire(x, y, angle, distance, vel) parameter "distance" must be a number; got a typeof('+distance+')=='+typeof distance);
		if(typeof vel!='number'&&vel!=undefined) throw (this.id+': fire(x, y, angle, distance, vel) parameter "vel" must be a number; got a typeof('+vel+')=='+typeof vel);

		var multiPlayData=new Array();

		if(vel==undefined) vel=this.vel;
		else this.vel=vel;

		if(this.siegeMode) distance=distance/2;

		for(var i=0, e=this.siegeMode?8:1; i<e; ++i) {
			var angle; // Each bullet has it's own angle
			if(i==0) {
				this.trail[i].translate(x, y);
				this.projectile[i].translate(x, y);

				this._dest[i].x=x+distance*Math.cos(angle);
				this._dest[i].y=y+distance*-Math.sin(angle);

				this.trail[i].alive=true;
				this.projectile[i].alive=true;

				multiPlayData.push([distance, vel]);
			} else {
				angle=Math.random()*2*Math.PI;

				var x=this._dest[0].x;
				var y=this._dest[0].y;

				this.trail[i].translate(x, y);
				this.projectile[i].translate(x, y);

				this._dest[i].x=x+(distance*2)*Math.cos(angle);
				this._dest[i].y=y+(distance*2)*-Math.sin(angle);
			}

			this.trail[i].face(this._dest[i].x, this._dest[i].y);
			this.projectile[i].face(this._dest[i].x, this._dest[i].y);
		}
		return multiPlayData;
	}

	this.getAlive=function() {
		for(var i=0; i<8; ++i) if(this.projectile[i].alive) return true;
		return false;
	}

	// Step in the animation
	this.step=function() {
		if(this.getAlive()) {
			for(var i=0; i<8; ++i) {
				if(this.projectile[i].alive) {
					this.projectile[i].move(this._dest[i].x, this._dest[i].y, this.vel);
					this.trail[i].translate(this.projectile[i].x, this.projectile[i].y);
				}

				var pos=this.getPos(i);
				if(this.projectile[i].alive&&pos.x==this._dest[i].x&&pos.y==this._dest[i].y) {
					this.trail[i].alive=false;
					this.projectile[i].alive=false;

					if(this.siegeMode&&i==0) for(var i=1; i<8; ++i) {
						this.trail[i].alive=true;
						this.projectile[i].alive=true;
					}
				}
			}
		}
	}



	this._initSprites=function() {
		for(var i=0; i<8; ++i) {
			this._dest[i]={ x: 0, y: 0 };

			this.projectile.push(new Sprite('nyanCat'));
			this.projectile[i].setTileSize(64, 64);
			this.projectile[i].setFrameTime(4);

			this.trail.push(new Sprite('rainbow'));
			this.trail[i].setTileSize(64, 64);
			this.trail[i].setFrameTime(4);
		}
	}



	// Constructor
	this._initSprites();
}