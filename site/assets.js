var imgs = [
	{ix:0,name:'Tri1',path:'enemies/bushman.png'},
	{ix:1,name:'FireFly',path:'enemies/fireshooter.png'},
	{ix:2,name:'WaterBlob',path:'enemies/waterblob/0.png'},
	{ix:3,name:'Tree',path:'levelitems/tree.png'},
	{ix:4,name:'Door',path:'levelitems/door/0.png',p:1},
    {ix:5,name:'LaserBull',path:'enemies/LaserBull.png'},
    {ix:6,name:'Spike',path:'enemies/spikes.png'},
    {ix:7,name:'SandWorm',path:'enemies/sandworm/00.png'},
    {ix:8,name:'Chest',path:'levelitems/chest/0.png',p:2},
    {ix:9,name:'Sign',path:'levelitems/sign/0.png',p:3},
    {ix:10,name:'Bee',path:'enemies/bee/0.png'},
    {ix:11,name:'BigRock',path:'levelitems/bigrock.png'},
];

class Tri1 extends Sprite{
	constructor(x,y){
		super('enemies/bushman.png');
		this.speed = .5;
		this.position = new Vector(x,y);
		this.cooldown = 60;
		this.maxHealth = 40;
        this.health = this.maxHealth;
		this.md = 80 * ((Math.random() > .5) ? -1 : 1);
		enemies.push(this);
	}
	attack(){
		let x = this.pos.x;
		let y = this.pos.y;
		let d = Vector.getDir(x-player.pos.x,y-player.pos.y);
		this.direction = d;
		let pos = this.pos;
		d += this.md;
		pos.x += this.speed * Math.cos(d*Math.PI/180);
		pos.y += this.speed * Math.sin(d*Math.PI/180);
		this.position = pos;
		if(this.touches(background) || this.isTouchingLines()){
			this.md *= -1;
		}
		this.cooldown--;
		d -= this.md;
		if(this.cooldown == 0){
			this.cooldown = 60;
			let b1 = new Bullet(pos.x,pos.y,d,'enemies/thorn.png');
			let b2 = new Bullet(pos.x,pos.y,d-35,'enemies/thorn.png');
			let b3 = new Bullet(pos.x,pos.y,d+35,'enemies/thorn.png');
			bullets.push(b1,b2,b3);
		}
	}
	drop(){
		Inventory.money(10,'c');
		new Gem(this.pos.x+random(-30,30),this.pos.y+random(-30,30),'gg');
	}
}
class FireFly extends Sprite{
	constructor(x,y){
		super('enemies/fireshooter.png');
		this.speed = 4;
		this.position = new Vector(x,y);
		this.cooldown1 = 2;
		this.cooldown2 = -200;
		this.maxHealth = 40;
        this.health = this.maxHealth;
		this.md = 0 * ((Math.random() > .5) ? -1 : 1);
		enemies.push(this);
	}
	attack(){
		let x = this.pos.x;
		let y = this.pos.y;
		let pos = this.pos;
		let d = this.dir;
		pos.x += this.speed * Math.cos(d*Math.PI/180);
		pos.y += this.speed * Math.sin(d*Math.PI/180);
		this.position = pos;
		this.cooldown1--;
		this.cooldown2--;
		if(this.cooldown1 == 0 && this.cooldown2 > 0){
			this.cooldown1 = 1;
			let b1 = new Bullet(pos.x,pos.y,d+random(-10,10),'enemies/fireball.png');
			// audio.play('creek.wav',true,1);
			b1.speed = 15;
			bullets.push(b1);
		} else {
			// audio.stopAll();
		}
		if(this.cooldown2 < -300){
			this.cooldown2 = random(150,300);
			this.cooldown1 = 1;
			let d = Vector.getDir(x-player.pos.x,y-player.pos.y);
			this.direction = d;
		}
	}
	drop(){
		Inventory.money(25,'c');
		new Gem(this.pos.x+random(-10,10),this.pos.y+random(-10,10),'rg');
		new Gem(this.pos.x+random(-10,10),this.pos.y+random(-10,10),'rg');
	}
}
class WaterBlob extends Sprite{
	constructor(x,y){
		super('enemies/waterblob/0.png');
		this.speed = .5;
		this.position = new Vector(x,y);
		this.cooldown = 60;
		this.maxHealth = 35;
        this.health = this.maxHealth;
		this.md = 80 * ((Math.random() > .5) ? -1 : 1);
		this.addAnimation('enemies/waterblob/waterblob.anims').then(()=>{
			this.animation.play('idle',true);
		});
		enemies.push(this);
	}
	attack(){
		let x = this.pos.x;
		let y = this.pos.y;
		let d = Vector.getDir(x-player.pos.x,y-player.pos.y);
		// this.direction = d;
		let pos = this.pos;
		// pos.x += this.speed * Math.cos(d*Math.PI/180);
		// pos.y += this.speed * Math.sin(d*Math.PI/180);
		// this.position = pos;
		this.cooldown--;
		if(this.cooldown == 0){
			this.cooldown = 120;
            var bulletcount = random(4, 10)
			for (let i = 0; i < 360; i += 360 / bulletcount){
				let nb = new Bullet(pos.x,pos.y,i,'enemies/waterblob/waterbullet.png');
				bullets.push(nb);
			}
		}
	}
	drop(){
		Inventory.money(10,'c');
		new Gem(this.pos.x+random(-10,10),this.pos.y+random(-10,10),'bg');
	}
}
class Tree extends Sprite{
	constructor(x,y){
		super('levelitems/tree.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class Door extends Sprite{
	constructor(x,y){
		super('levelitems/door/0.png');
		this.addAnimation('levelitems/door/door.anims').then(e=>{
			this.animation.play((this.activated&&!this.touches(player))?'open':'closed',true);
			if(!this.touches(player)){
				this.playerCheck = true;
			}
		});
		this.position = new Vector(x,y);
		this.nextRoom = 'level0';
		this.activated = false;
		this.playerCheck = false;
		this.addMovement(this.check);
		sprites.push(this);
	}
	activate(){
		this.activated = true;
		this.animation.play('open',true);
	}
	check(){
		if(!this.playerCheck){
			if(!this.touches(player)){
				this.playerCheck = true;
				try{this.animation.play((this.activated)?'open':'closed',true);}catch(e){}
			} else {
				return;
			}
		}
		if(this.activated){
			if(this.touches(player)){
				let d = this.dir + 180;
				let rx = player.pos.x / (background.w/2);
				let ry = player.pos.y / (background.h/2);
				if(Math.abs(player.pos.x) > Math.abs(player.pos.y)){
					ry=0;
					rx*=.9;
				} else {
					rx=0;
					ry*=.9;
				}
				rx *= -1;
				ry *= -1;
				loadLevel(this.nextRoom,new Vector(rx,ry));
			}
		} else {
			if(enemies.length == 0){
				setTimeout(()=>{
					this.activate();
				},500);
			}
		}
	}
	loadSpecCode(spec){
		let d = spec.split(',');
		this.activated = d[0]=='1';
		this.nextRoom = d[1];
	}
}
class LaserBull extends Sprite{
    constructor(x, y) {
        super('enemies/LaserBull.png');
        this.speed = 3.5;
        this.position = new Vector(x, y);
        this.cooldown = 30;
        this.maxHealth = 30;
        this.health = this.maxHealth;
		this.md = 60 * ((Math.random() > .5) ? -1 : 1);
		this.mode = 0;
        enemies.push(this);
    }
    attack() {
        let x = this.pos.x;
        let y = this.pos.y;
        let d = Vector.getDir(x - player.pos.x, y - player.pos.y);
        this.direction = d;
		let pos = this.pos.clone();
        d += this.md;
        pos.x += this.speed * Math.cos(d * Math.PI / 180);
        pos.y += this.speed * Math.sin(d * Math.PI / 180);
        this.position = pos;
        if (this.touches(background) || this.isTouchingLines()) {
            this.md *= -1;
        }
        this.cooldown--;
		d -= this.md;
		//red laser (straight)
		if (this.cooldown == 0) {
			this.cooldown = 30;
			if (this.mode == 0) {
				let b1 = new Bullet(pos.x, pos.y, d, 'enemies/LaserRed.png');
                let b2 = new Bullet(pos.x, pos.y, d, 'enemies/LaserRed.png');
				b1.speed = 6;
				b2.speed = -1;
				this.mode = 1;
			bullets.push(b1, b2);
			} else {
				let b1 = new Bullet(pos.x, pos.y, d + 15, 'enemies/LaserRed.png');
				let b2 = new Bullet(pos.x, pos.y, d - 15, 'enemies/LaserRed.png');
                let b3 = new Bullet(pos.x, pos.y, d + 15, 'enemies/LaserRed.png');
                let b4 = new Bullet(pos.x, pos.y, d - 15, 'enemies/LaserRed.png');
                b1.speed = 6;
				b2.speed = 6;
                b3.speed = -1;
                b4.speed = -1;
				this.mode = 0;
                bullets.push(b1, b2, b3, b4);
				}
        }
    }
}
class Spike extends Sprite{
	constructor(x,y){
		super('enemies/spikes.png');
		this.position = new Vector(x,y);
		sprites.push(this);
		this.addMovement(this.stab);
		this.touchingPlayer = false;
	}
	stab(){
		if(this.touches(player)){
			if(!this.touchingPlayer) player.health--;
			this.touchingPlayer = true;
		} else {
			this.touchingPlayer = false;
		}
	}
}
class SandWorm extends Sprite{
	constructor(x,y){
		super('enemies/sandworm/00.png');
		this.position = new Vector(x,y);
		enemies.push(this);
		this.addAnimation('enemies/sandworm/sandworm.anims');
		this.inHole = true;
		this.cooldown = 300;
		this.speed = 5;
		this.maxHealth = 30;
		this.health = this.maxHealth;
		this.visible = false;
		this.doDamage = false;
		this.shouldMove = false;
		this.scale.x = .25;
		this.scale.y = .8;
	}
	attack(){
		this.cooldown--;
		if(this.shouldMove){
			let p = this.pos.clone();
			p.x += this.speed * Math.cos(this.dir*Math.PI/180);
			p.y += this.speed * Math.sin(this.dir*Math.PI/180);
			this.position = p;
		}
		if(this.touches(player) && this.doDamage){
			player.health--;
		}
		if(this.cooldown == 0){
			if(this.inHole){
				this.playAnimation();
				var pos_off = player.pos.clone();
				if(Math.random() < .5){
					this.direction = 180 * random(0,1);
					this.offset.x = (-10+this.w/2) * Math.cos(this.dir);
					this.offset.y = 0;
				} else {
					this.direction = 90 + 180 * random(0,1);
					this.offset.x = 0;
					this.offset.y = (-10+this.w/2) * Math.sin(this.dir);
				}
				this.position = Vector.getPointIn(Vector.rad(this.dir+180),150,pos_off.x,pos_off.y);
			}
		}
	}
	async playAnimation(){
		this.inHole = false;
		this.visible = true;
		await this.animation.play('show');
		this.shouldMove = true;
		// await this.animation.play('slither');
		this.doDamage = true;
		await this.animation.play('attack');
		await this.animation.play('attack');
		this.doDamage = false;
		this.shouldMove = false;
		await this.animation.play('hide');
		this.visible = false;
		this.inHole = true;
		this.cooldown = 300;
	}
	drop(){
		Inventory.money(15,'c');
		new Gem(this.pos.x+random(-10,10),this.pos.y+random(-10,10),'og');
	}
}
class Chest extends Sprite{
	constructor(x,y){
		super('levelitems/chest/0.png');
		this.addAnimation('levelitems/chest/chest.anims');
		this.position = new Vector(x,y);
		this.addMovement(this.open);
		this.open = false;
		this.treasure = 'random';
		this.setScale = new Vector(1,.7);
		lines.push(...this.lines);
		sprites.push(this);
	}
	open(){
		let dist_to_player = Vector.distance(this.pos.x,this.pos.y,player.pos.x,player.pos.y);
		if(dist_to_player < 60 && !this.open){
			this.open = true;
			this.animation.play('open').then(e=>{
				if(this.treasure){
					Inventory.addItem(this.treasure);
					this.treasure = null;
				}
			});
		} else if(this.open && dist_to_player  >= 60) {
			this.open = false;
			this.animation.play('close');
		}
	}
	loadSpecCode(spec){
		this.treasure = spec;
	}
}
class Sign extends Sprite{
	constructor(x,y){
		super('levelitems/sign/0.png');
		this.position = new Vector(x,y);
		this.message = '';
		sprites.push(this);
		this.addMovement(this.read);
	}
	read(){
		let dist_to_player = Vector.distance(this.pos.x,this.pos.y,player.pos.x,player.pos.y);
		if(dist_to_player < 60){
			Dialog.display(this.message,this.pos);
		}
	}
	loadSpecCode(spec){
		this.message = spec;
	}
}
class Gem extends Sprite{
	constructor(x,y,t){
		var types = ['rg','gg','og','bg'];
		super(`levelitems/gems/${types.indexOf(t)}.png`);
		this.type = t;
		this.position = new Vector(x,y);
		this.addMovement(this.pickup);
		sprites.push(this);
	}
	pickup(){
		if(this.touches(player)){
			sprites.splice(sprites.indexOf(this),1);
			Inventory.money(1,this.type);
		}
	}
}
class Bee extends Sprite{
	constructor(x,y){
		super("enemies/bee/0.png");
		this.addAnimation("enemies/bee/bee.anims").then(e=>{
			this.animation.play('fly-nice',true);
		})
		this.position = new Vector(x,y);
		enemies.push(this);
		this.mode = 'nice';
		this.d = 1;
		this.maxHealth = 5;
		this.health = this.maxHealth;
		this.damage = 2;
		this.speed = 4;
		this.stinging = false;
	}
	attack(){
		if(this.mode == 'nice'){
			let pos = this.pos.clone();
			if(this.touches(background)){
				this.d *= -1;
				this.transformX = this.d;
			}
			pos.x += this.d * this.speed;
			pos.y += 5 * Math.cos(pos.x/20);
			this.position = pos;
			if (Vector.distance(player.pos.x,player.pos.y,this.pos.x,this.pos.y) < 200){
				this.mode = 'evil';
				this.animation.play('fly-evil');
			}
		}else{
			let pos = this.pos.clone();
			let d = Vector.getDir(this.pos.x-player.pos.x,this.pos.y-player.pos.y);
			if(d > 90 && d < 270){
				this.transformX = -1;
			} else {
				this.transformX = 1;
			}
			pos.x += this.speed * Math.cos(Vector.rad(d));
			pos.y += this.speed * Math.sin(Vector.rad(d));
			if(this.touches(player)){
				if(!this.stinging) player.health -= this.damage;
				this.stinging = true;
				this.animation.play('sting').then(e=>{
					if(!e) return;
					this.stinging = false;
				});
			} else if(!this.stinging){
				this.animation.play('fly-evil');
				this.position = pos;
			}
		}
	}
}
class BigRock extends Sprite{
	constructor(x,y){
		super('levelitems/bigrock.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}