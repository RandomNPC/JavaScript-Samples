//		Sprite Object


var Sprite=function(id) {
	this.id=id;
	this.img;

	this.x=0;
	this.y=0;

	this.draw=function(ctx) {
		ctx.drawImage(this.img, this.x, this.y);
	}
}