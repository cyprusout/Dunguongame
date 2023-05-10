class Bar{
	constructor(x,y,w,h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.osy = 0;
		this.color = 'green';
		this.bcolor = 'gray';
		this.padding = 3;
		this.pert = .5;
	}
	draw(x=this.x,y=this.y){
		this.x = x;
		this.y = y;
		let lx = this.x - this.w/2;
		// OUTER BAR
		ctx.beginPath();
		ctx.fillStyle = this.bcolor;
		ctx.arc(lx,this.y+this.osy,this.h/2,0,Math.PI*2);
		ctx.rect(lx,this.y+this.osy-this.h/2,this.w,this.h);
		ctx.arc(this.x+this.w/2,this.y+this.osy,this.h/2,0,Math.PI*2);
		ctx.fill();
		// INNER BAR
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(lx,this.y+this.osy,(this.h-this.padding)/2,0,Math.PI*2);
		ctx.rect(lx,this.y+this.osy-(this.h-this.padding)/2,this.w*this.pert,(this.h-this.padding));
		ctx.arc(this.x-this.w/2+this.w*this.pert,this.y+this.osy,(this.h-this.padding)/2,0,Math.PI*2);
		ctx.fill();
	}
}