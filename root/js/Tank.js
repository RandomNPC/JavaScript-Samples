//		Tank Object


var Unit_Tank=function() {
	this.name='';

	this.tankBody;			// There are 6 sprites
	this.siegeBody;
	this.siegeBodyTrans;
	this.tankTurret;
	this.siegeTurret;
	this.siegeTurretTrans;

	this.alive=true;		// Is this tank not blown up?
	this.frozen=false;	// Is it frozen in an ice spell like state?

	this._movable=true;	// The tank cant drive when transformed
	this._siegeMode=false;	// Which mode is it transforming to?
	this._siegeLock=false;	// Is it locked because of transformation?

	this.atDest=false; // Are we there yet?
	this._dest={ x: 0, y: 0 }; // Move to



	// Draws the tank
	this.draw=function(ctx) {
		if(ctx==undefined) throw ('Context not passed');

		this._transform();


		ctx.font='16px Arial';
		ctx.fillText(this.name, this.tankBody.x-40, this.tankBody.y+40);

		// Draw all sprites
		if(this.frozen) { // Don't animate the parts if frozen
			this.siegeBodyTrans.draw(ctx);
			this.tankBody.draw(ctx);
			this.siegeBody.draw(ctx);

			this.siegeTurretTrans.draw(ctx);
			this.tankTurret.draw(ctx);
			this.siegeTurret.draw(ctx);
		} else { // Animate the parts
			this.siegeBodyTrans.drawAni(ctx);
			this.tankBody.drawAni(ctx);
			this.siegeBody.drawAni(ctx);

			this.siegeTurretTrans.drawAni(ctx);
			this.tankTurret.drawAni(ctx);
			this.siegeTurret.drawAni(ctx);
		}
		//
	}
	this.drawAni=function(ctx) {
		if(!this.frozen) this.step(); // Move the tank & stuffs if not frozen
		this.draw(ctx);
	}

	this.translate=function(x, y) {
		this.siegeBodyTrans.translate(x, y);
		this.tankBody.translate(x, y);
		this.siegeBody.translate(x, y);

		this.siegeTurretTrans.translate(x, y);
		this.tankTurret.translate(x, y);
		this.siegeTurret.translate(x, y);
	}

	this.getPos=function() { return { x: this.tankBody.x, y: this.tankBody.y }; }
	this.setDest=function(x, y) {
		this._dest.x=x;
		this._dest.y=y;
		this.atDest=false;
	}

	this.getFace=function() { return this.tankBody._ang; }
	this.setFace=function(ang) { this.tankBody._ang=ang; }
	this.getTarget=function() { return (this._siegeMode?this.siegeTurret._ang:this.tankTurret._ang); }
	this.setTarget=function(ang) { this.siegeTurret._ang=this.tankTurret._ang=ang; }

	// Point the turret
	this.target=function(x, y) {
		if(this._siegeLock) return false; // Prevent lockups during transform
		var targeted;

		// Have the turrets in both modes rotate at different speeds
		if(this._siegeMode) this.siegeTurret.turn(x, y);
		else targeted=this.tankTurret.turn(x, y);
		return targeted;
	}

	// Turn the tank
	this.turn=function(x, y) {
		var lastAng=this.tankBody.getAng();
		var targeted=this.tankBody.turn(x, y);
		var diff=this.tankBody.getAng()-lastAng;
		var ang=this.tankTurret.getAng()+diff;
		ang+=Math.PI*2;
		ang%=Math.PI*2;
		this.tankTurret.setAng(ang);
		return targeted;
	}

	// For transformation between the 2 modes
	this.changeMode=function(mode) {
		if(mode==undefined||this._siegeMode!=mode) {
			this._siegeMode=!this._siegeMode;
			this._siegeLock=true;
			this._movable=false;
		}
	}
	this._transform=function() {
		var turned=true;
		if(this._siegeLock&&!this._movable) {
			turned&=this.tankBody.turn(this.tankBody.x+2, this.tankBody.y+2);
			turned&=this.tankTurret.turn(this.tankTurret.x-2, this.tankTurret.y-2);
			turned&=this.siegeTurret.turn(this.tankTurret.x-2, this.tankTurret.y-2);

			if(!turned) return false;

			// Tons of goop to make the animation beautiful.
			// It is a lot to read & soak in.  You don't have to try too hard.
			if(this._siegeMode) { // Transforming to siege mode
				this.tankBody.hide=true;
				this.siegeBodyTrans.hide=false; // Show body transform

				this.siegeBodyTrans.reverse=false;
				if(this.siegeBodyTrans.isEnd()) {
					this.tankTurret.hide=true;
					this.siegeBodyTrans.hide=true; // Show turret transform

					this.siegeBody.hide=false;
					this.siegeTurretTrans.hide=false; // Show siege body

					this.siegeTurretTrans.reverse=false;
					if(this.siegeTurretTrans.isEnd()) {
						this.siegeTurretTrans.hide=true; // Show siege turret

						this.siegeTurret.hide=false;

						this._siegeLock=false; // Unlock tank

						return true;
					}
				}
			} else { // Transforming to tank mode
				this.siegeTurret.hide=true;

				this.siegeTurretTrans.hide=false; // Show turret transform

				this.siegeTurretTrans.reverse=true;
				if(this.siegeTurretTrans.isEnd()) {
					this.siegeBody.hide=true;
					this.siegeBodyTrans.hide=false; // Show body transform

					this.siegeBodyTrans.reverse=true;
					if(this.siegeBodyTrans.isEnd()) {
						this.siegeBodyTrans.hide=true;
						this.siegeTurretTrans.hide=true;

						this.tankBody.hide=false;
						this.tankTurret.hide=false; // Show turret & body

						this._siegeLock=false; // Unlock tank
						this._movable=true; // Also drivable now

						return true;
					}
				}
			}
		}
		return false;
	}

	this.getAlive=function() { return alive; }
	this.kill=function() {
		this.alive=false;
		if(this.alive==false) {
			// Play some explosion animation & delete self
		}
	}

	// Step in the animation
	this.step=function() {
		if(this._movable) {
			if(!this.atDest) {
				var turned=this.turn(this._dest.x, this._dest.y);

				if(turned) {
					this.tankBody.move(this._dest.x, this._dest.y, 1.5);

					var pos=this.getPos();
					if(pos.x==this._dest.x&&pos.y==this._dest.y) {
						this.atDest=true;
					} else {
						// Just snap the rest of the sprites to the body
						this.siegeBody.translate(pos.x, pos.y);
						this.siegeBodyTrans.translate(pos.x, pos.y);
						this.tankTurret.translate(pos.x, pos.y);
						this.siegeTurret.translate(pos.x, pos.y);
						this.siegeTurretTrans.translate(pos.x, pos.y);
					}
				}
			}
		} else {
			this.atDest=true;
		}
	}



	// Example of initializing many sprites
	this._initSprites=function() {
		// Sprite for tank's body
		this.tankBody=new Sprite('tankBody');
		this.tankBody.idle=true; // Overriding to make it stop animating when idle

		// Sprite for tank's turret
		this.tankTurret=new Sprite('tankTurret');
		this.tankTurret.midY+=12; // Changing the midpoint of the picture to be lower
		this.tankTurret.idle=true;
		this.tankTurret.angVel=Math.PI/8;

		// Sprite for siege tank's body
		this.siegeBody=new Sprite('siegeBody');
		this.siegeBody.hide=true;

		// Sprite for siege tank's turret
		this.siegeTurret=new Sprite('siegeTurret');
		this.siegeTurret.midY+=12;
		this.siegeTurret.hide=true;

		// Sprite for the body's transformation 
		this.siegeBodyTrans=new Sprite('siegeBodyTransform');
		this.siegeBodyTrans.frameTimeMax=8;
		this.siegeBodyTrans.loop=false; // Prevent the animation from looping
		this.siegeBodyTrans.reverse=true;
		this.siegeBodyTrans.hide=true;

		// Sprite for the turret's transformation
		this.siegeTurretTrans=new Sprite('siegeTurretTransform');
		this.siegeTurretTrans.midY+=12;
		this.siegeTurretTrans.frameTimeMax=8;
		this.siegeTurretTrans.loop=false;
		this.siegeTurretTrans.reverse=true;
		this.siegeTurretTrans.hide=true;
	}



	// Constructor
	this._initSprites();
}