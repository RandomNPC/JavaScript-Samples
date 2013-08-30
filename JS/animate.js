	//This is an animate class
	//img is an Image() of a sprite sheet
	//h is the height of a single sprite clip
	//w is th width of a single sprite clip
	//r is the amount of spirte clips in a row
	//f is the amount of sprite clips total in your animation
	function animate(img, h, w, r, f, x, y){
		this.sheet = img;
		this.height = h;
		this.width = w;
		this.row =  r;
		this.frames = f;
		//rowCount remembers where you are in a row
		this.rowCount = 1;
		//frameCount remembershow many frames have been processed
		this.frameCount = 1;
		//xMarker remembers where your marker is on x axis
		this.xMarker = 0;
		//yMarker remembers where your marker is on y axis
		this.yMarker = 0;
		//the draw func takes care of everything, hopefully!
		this.xpos = x;
		this.ypos = y;
		this.draw = function() {
			//alert(this.rowCount + " " + this.frameCount);
			
			//Draw!
			context.drawImage(this.sheet, this.xMarker, this.yMarker, this.width, this.height, this.xpos, this.ypos, this.width, this.height);
			
			//Increament frames!
			this.rowCount += 1;
			this.frameCount += 1;
			this.xMarker += this.width;
			
			//Are we at the end of a row?
			if (this.rowCount > this.row)
			{
				//If so, go backto the left and go down
				this.rowCount = 1;
				this.xMarker = 0;
				this.yMarker += this.height;
			}
			//Have we gone through everything
			if (this.frameCount > this.frames)
			{
				//Restart!
				this.xMarker = 0;
				this.yMarker = 0;
				this.rowCount = 1;
				this.frameCount = 1;
			}
			
			//alert(this.rowCount + " " + this.frameCount);

		};
	}

