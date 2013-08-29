//		Tank Object


/*
	Now I will make a multi-layered sprite.
	
	It will have a body & a head, a transformation animation of
		both parts, & the transformed version of both. [6 sprites]

	This tank is not suppose to be able to drive when transformed.
*/

var Unit_Tank=function() {
	this.tankBody;			// There are 6 sprites
	this.siegeBody;
	this.siegeBodyTrans;
	this.tankTurret;
	this.siegeTurret;
	this.siegeTurretTrans;

	

	// Draws the tank
	this.draw=function(ctx) {
		if(ctx==undefined) { console.log('Error: Context not passed'); return; }

		this.siegeBodyTrans.drawAni(ctx);
		this.tankBody.drawAni(ctx);
		this.siegeBody.drawAni(ctx);

		this.siegeTurretTrans.drawAni(ctx);
		this.tankTurret.drawAni(ctx);
		this.siegeTurret.drawAni(ctx);
	}

	this.translate=function(x, y) {
		this.tankBody.translate(x, y);
		this.tankBody.translate(x, y);
		this.siegeBody.translate(x, y);

		this.siegeTurretTrans.translate(x, y);
		this.tankTurret.translate(x, y);
		this.siegeTurret.translate(x, y);
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