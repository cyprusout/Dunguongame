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
    {ix:12,name:'BigSandWall',path:'levelitems/bigsandwall.png'},
    {ix:13,name:'BigSpike',path:'levelitems/bigspike.png'},
    {ix:14,name:'BigTree',path:'levelitems/bigtree.png'},
    {ix:15,name:'Bush1',path:'levelitems/bush1.png'},
    {ix:16,name:'Bush2',path:'levelitems/bush2.png'},
    {ix:17,name:'Bushline',path:'levelitems/bushline.png'},
    {ix:18,name:'bushpath',path:'levelitems/bushpath.png'},
    {ix:19,name:'cactus',path:'levelitems/cactus.png'},
    {ix:20,name:'cobblepath',path:'levelitems/cobblepath.png'},
    {ix:21,name:'fence',path:'levelitems/fence.png'},
    {ix:22,name:'fenceside',path:'levelitems/fenceside.png'},
    {ix:23,name:'flowercactus',path:'levelitems/flowercactus.png'},
    {ix:24,name:'grass1',path:'levelitems/grass1.png'},
    {ix:25,name:'grass2',path:'levelitems/grass2.png'},
    {ix:26,name:'plant',path:'levelitems/plant.png'},
    {ix:27,name:'palm1',path:'levelitems/palm1.png'},
    {ix:28,name:'palm2',path:'levelitems/palm2.png'},
    {ix:29,name:'rails',path:'levelitems/rails.png'},
    {ix:30,name:'rock',path:'levelitems/rock.png'},
    {ix:31,name:'sandwall',path:'levelitems/sandwall.png'},
    {ix:32,name:'sandwall2',path:'levelitems/sandwall2.png'},
    {ix:33,name:'shortgrass1',path:'levelitems/shortgrass1.png'},
    {ix:34,name:'shortgrass2',path:'levelitems/shortgrass2.png'},
    {ix:35,name:'smallcactus',path:'levelitems/smallcactus.png'},
    {ix:36,name:'spike',path:'levelitems/spike.png'},
    {ix:37,name:'stonealter',path:'levelitems/stonealter.png'},
    {ix:38,name:'stonewall',path:'levelitems/stonewall.png'},
    {ix:39,name:'torch',path:'levelitems/torch.png'},
    {ix:40,name:'woodbridge',path:'levelitems/woodbridge.png'},
    {ix:41,name:'house',path:'levelitems/house/house.png'},
    {ix:42,name:'houseflip',path:'levelitems/house/houseflip.png'},
	{ix:43,name:'church',path:'structures/church.png'},
	{ix:44,name:'WaterPuddle',path:'enemies/waterpuddle/0.png'},
	{ix:45,name:'inside',path:'structures/inside.png'},
	{ix:46,name:'Demon',path:'enemies/Demon.png'},
	{ix:47,name:'Villager',path:'villager/00.png'},
	{ix:48,name:'house2',path:'levelitems/house/house2.png'},
	{ix:49,name:'fountain',path:'levelitems/fountain/0.png'},
	{ix:50,name:'castle',path:'structures/castle.png'},
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
		if(this.touches(background) || this.isTouchingBlines()){
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
		this.addAnimation('enemies/fireshooter/fire.anims').then(e=>{
			this.animation.play('fly',true);
		});
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
        if (this.touches(background) || this.isTouchingBlines()) {
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
		this.maxHealth = 15;
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
		this.cooldown = 100;
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
			this.cooldown--;
			if (this.cooldown <= 0 && Vector.distance(player.pos.x,player.pos.y,this.pos.x,this.pos.y) < 200){
				this.mode = 'evil';
				this.animation.play('fly-evil');
				setTimeout(()=>{
					this.mode = 'nice';
					this.cooldown = 1000;
					this.animation.play('fly-nice');
					this.direction = this.d;
				},10*1000);
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
				this.animation?.play('sting').then(e=>{
					if(!e) return;
					this.stinging = false;
				});
			} else if(!this.stinging){
				this.animation?.play('fly-evil');
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
class BigSandWall extends Sprite{
	constructor(x,y){
		super('levelitems/bigsandwall.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class BigSpike extends Sprite{
	constructor(x,y){
		super('levelitems/bigspike.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class BigTree extends Sprite{
	constructor(x,y){
		super('levelitems/bigtree.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class Bush1 extends Sprite{
	constructor(x,y){
		super('levelitems/bush1.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class Bush2 extends Sprite{
	constructor(x,y){
		super('levelitems/bush2.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class Bushline extends Sprite{
	constructor(x,y){
		super('levelitems/bushline.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class bushpath extends Sprite{
	constructor(x,y){
		super('levelitems/bushpath.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class cactus extends Sprite{
	constructor(x,y){
		super('levelitems/cactus.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class cobblepath extends Sprite{
	constructor(x,y){
		super('levelitems/cobblepath.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class fence extends Sprite{
	constructor(x,y){
		super('levelitems/fence.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class fenceside extends Sprite{
	constructor(x,y){
		super('levelitems/fenceside.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class flowercactus extends Sprite{
	constructor(x,y){
		super('levelitems/flowercactus.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class grass1 extends Sprite{
	constructor(x,y){
		super('levelitems/grass1.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class grass2 extends Sprite{
	constructor(x,y){
		super('levelitems/grass2.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class plant extends Sprite{
	constructor(x,y){
		super('levelitems/plant.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class palm1 extends Sprite{
	constructor(x,y){
		super('levelitems/palm1.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class palm2 extends Sprite{
	constructor(x,y){
		super('levelitems/palm2.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class rails extends Sprite{
	constructor(x,y){
		super('levelitems/rails.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class rock extends Sprite{
	constructor(x,y){
		super('levelitems/rock.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class sandwall extends Sprite{
	constructor(x,y){
		super('levelitems/sandwall.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class sandwall2 extends Sprite{
	constructor(x,y){
		super('levelitems/sandwall2.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class shortgrass1 extends Sprite{
	constructor(x,y){
		super('levelitems/shortgrass1.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class shortgrass2 extends Sprite{
	constructor(x,y){
		super('levelitems/shortgrass2.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class smallcactus extends Sprite{
	constructor(x,y){
		super('levelitems/smallcactus.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class spike extends Sprite{
	constructor(x,y){
		super('levelitems/spike.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class stonealter extends Sprite{
	constructor(x,y){
		super('levelitems/stonealter.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class stonewall extends Sprite{
	constructor(x,y){
		super('levelitems/stonewall.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class torch extends Sprite{
	constructor(x,y){
		super('levelitems/torch.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class woodbridge extends Sprite{
	constructor(x,y){
		super('levelitems/woodbridge.png');
		this.position = new Vector(x,y);
		sprites.push(this);
	}
}
class house extends Sprite{
	constructor(x,y){
		super('levelitems/house/house.png');
		this.position = new Vector(x,y);
		sprites.push(this);
		this.addMovement(this.enter);
		this.alpha = 1;
	}
	enter(){
		let d = this.distanceTo(player);
		if(d < this.w/2){
			this.alpha = Math.max((this.alpha - .05),0);
		} else {
			this.alpha = Math.min((this.alpha + .05),1);
		}
	}
}
class houseflip extends Sprite{
	constructor(x,y){
		super('levelitems/house/house.png');
		this.position = new Vector(x,y);
		sprites.push(this);
		this.addMovement(this.enter);
		this.alpha = 1;
		this.transformX = -1;
	}
	enter(){
		let d = this.distanceTo(player);
		if(d < this.w/2){
			this.alpha = Math.max((this.alpha - .05),0);
		} else {
			this.alpha = Math.min((this.alpha + .05),1);
		}
	}
}
class church extends Sprite{
	constructor(x,y){
		super('structures/church.png');
		this.position = new Vector(x,y);
		structures.push(this);
	}
}
class WaterPuddle extends Sprite {
	constructor(x, y) {
		super('enemies/waterpuddle/0.png');
		this.speed = .5;
		this.position = new Vector(x, y);
		this.cooldown = 60;
		this.maxHealth = 20;
		this.health = this.maxHealth;
		this.md = 80 * ((Math.random() > .5) ? -1 : 1);
		this.addAnimation('enemies/waterpuddle/water.anims').then(() => {
			this.animation.play('idle', true);
		});
		this.spindir = 1;
		enemies.push(this);
	}
	attack() {
		let x = this.pos.x;
		let y = this.pos.y;
		let d = Vector.getDir(x - player.pos.x, y - player.pos.y);
		// this.direction = d;
		let pos = this.pos;
		// pos.x += this.speed * Math.cos(d*Math.PI/180);
		// pos.y += this.speed * Math.sin(d*Math.PI/180);
		// this.position = pos;
		this.cooldown--;
		if (this.cooldown == 0) {
			this.cooldown = 120;
			this.spindir *= -1;
			var bulletcount = random(6, 12)
			for (let i = 0; i < 360; i += 360 / bulletcount) {
				let nb = new TurnBullet(pos.x, pos.y, i, 'enemies/waterpuddle/waterturnbullet.png');
				nb.rot = this.spindir;
				bullets.push(nb);
			}
		}
	}
	drop() {
		Inventory.money(10, 'c');
		new Gem(this.pos.x + random(-10, 10), this.pos.y + random(-10, 10), 'bg');
	}
}
class inside extends Sprite{
	constructor(x,y){
		super('structures/inside.png');
		this.position = new Vector(x,y);
		structures.push(this);
	}
}


class Demon extends Sprite{
	constructor(x,y){
		super('enemies/Demon.png');
		this.position = new Vector(x,y);
		this.speed = 2;
		this.maxHealth = 35;
		this.health = this.maxHealth;
		this.cooldown = 45;
		this.a_dir = 0;
		enemies.push(this);
		// audio.play('sfx/S2.mp3');
	}
	attack(){
		let pos = this.pos;
		this.cooldown--;
		if(this.cooldown == 0){
			let npos = Vector.getPointIn(Vector.rad(this.a_dir),50,pos.x,pos.y);
			this.a_dir+=4;
			this.cooldown = 6;
			for(let i=0;i<360;i+=90){
				let nb = new TurnBullet(npos.x,npos.y,i+this.a_dir,'enemies/plasmaball.png');
				nb.rot = 4;
				nb.speed = 13;
				bullets.push(nb);
			}
		}
	}
}



class Villager extends Sprite{
	constructor(x,y){
		super('villager/00.png');
		this.position = new Vector(x,y);
		this.speed = 2;
		this.maxHealth = 35;
		this.health = this.maxHealth;
		this.a_dir = 0;
		sprites.push(this);		
		this.addAnimation('villager/villager.anims').then(() => {
			this.animation.play('idle', true);
		});
	}
}

class house2 extends Sprite {
	constructor(x, y) {
		super('levelitems/house/house2.png');
		this.position = new Vector(x, y);
		sprites.push(this);
		this.addMovement(this.enter);
		this.alpha = 1;
	}
	enter() {
		let d = this.distanceTo(player);
		if (d < this.w / 2) {
			this.alpha = Math.max((this.alpha - .05), 0);
		} else {
			this.alpha = Math.min((this.alpha + .05), 1);
		}
	}
}

class fountain extends Sprite {
	constructor(x, y) {
		super('levelitems/fountain/0.png');
		this.position = new Vector(x, y);
		sprites.push(this);
		this.addAnimation('levelitems/fountain/fountain.anims').then(() => {
			this.animation.play('idle', true);
		});
	}
}

class castle extends Sprite {
	constructor(x, y) {
		super('structures/castle.png');
		this.position = new Vector(x, y);
		structures.push(this);
	}
}