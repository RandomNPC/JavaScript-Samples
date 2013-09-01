//		Tank Object


var Unit_Bullet=function(name) {
	this.name=name==undefined?'':name;

	this.trail;
	this.projectile;

	this.frozen=false;	// Is it frozen in an ice spell like state?

	this.vel=8;
	this.atDest=false; // Are we there yet?
	this._dest={ x: 0, y: 0 }; // Move to



	// Draws the projectile
	this.draw=function(ctx) {
		if(ctx==undefined) throw ('Context not passed');

		if(!this.projectile.alive) return;
		if(this.frozen) { // Don't animate if frozen
			this.trail.draw(ctx);
			this.projectile.draw(ctx);
		} else { // Animate
			this.trail.drawAni(ctx);
			this.projectile.drawAni(ctx);
		}
	}
	this.drawAni=function(ctx) {
		if(!this.projectile.alive) return;
		if(!this.frozen) this.step(); // Move the projectile if not frozen
		this.draw(ctx);
	}

	this.translate=function(x, y) {
		if(typeof x!='number') throw (this.id+': translate(x, y) parameter "x" must be a number; got a typeof('+x+')=='+typeof x);
		if(typeof y!='number') throw (this.id+': translate(x, y) parameter "y" must be a number; got a typeof('+y+')=='+typeof y);

		this.trail.translate(x, y);
		this.projectile.translate(x, y);
	}

	this.getPos=function() { return { x: this.projectile.x, y: this.projectile.y }; }

	this.getFace=function() { return this.projectile._angle; }
	this.setFace=function(angle) {
		if(typeof angle!='number') throw (this.id+': setFace(angle) parameter "angle" must be a number; got a typeof('+angle+')=='+typeof angle);

		this.tankBody._angle=angle;
	}

	// Turn the tank
	this.turn=function(x, y) { // 1 overload
		if(typeof x!='number') throw (this.id+': turn(x, y) parameter "x" must be a number; got a typeof('+x+')=='+typeof x);
		if(typeof y!='number'&&y!=undefined) throw (this.id+': turn(x, y) parameter "y" must be a number; got a typeof('+y+')=='+typeof y);

		var lastAng=this.tankBody.getAng();
		var targeted;

		if(y==undefined) { // turn(angle)
			targeted=this.tankBody.turn(x);
		} else {
			targeted=this.tankBody.turn(x, y);
		}

		var diff=this.tankBody.getAng()-lastAng;
		var angle=this.tankTurret.getAng()+diff;
		angle+=Math.PI*2;
		angle%=Math.PI*2;
		this.tankTurret.setAng(angle);
		return targeted;
	}

	// Fires a projectile from position to destination
	this.fire=function(x, y, destX, destY) {
		if(typeof x!='number') throw (this.id+': fire(x, y, destX, destY) parameter "x" must be a number; got a typeof('+x+')=='+typeof x);
		if(typeof y!='number') throw (this.id+': fire(x, y, destX, destY) parameter "y" must be a number; got a typeof('+y+')=='+typeof y);
		if(typeof destX!='number') throw (this.id+': fire(x, y, destX, destY) parameter "destX" must be a number; got a typeof('+destX+')=='+typeof destX);
		if(typeof destY!='number') throw (this.id+': fire(x, y, destX, destY) parameter "destY" must be a number; got a typeof('+destY+')=='+typeof destY);

		this.atDest=false;
		this._dest.x=destX;
		this._dest.y=destY;

		this.trail.alive=true;
		this.trail.translate(x, y);
		this.trail.face(destX, destY);

		this.projectile.alive=true;
		this.projectile.translate(x, y);
		this.projectile.face(destX, destY);
	}

	this.getAlive=function() { return this.projectile.alive; }

	// Step in the animation
	this.step=function() {
		if(!this.atDest) {
			this.projectile.move(this._dest.x, this._dest.y, this.vel);
			this.trail.translate(this.projectile.x, this.projectile.y);

			var pos=this.getPos();
			if(pos.x==this._dest.x&&pos.y==this._dest.y) {
				this.atDest=true;
				this.trail.alive=false;
				this.projectile.alive=false;
			}
		}
	}



	this._initSprites=function() {
		this.projectile=new Sprite('nyanCat');
		this.projectile.setTileSize(64, 64);
		this.projectile.setFrameTime(4);

		this.trail=new Sprite('rainbow');
		this.trail.setTileSize(64, 64);
		this.trail.setFrameTime(4);
	}



	// Constructor
	this._initSprites();
}