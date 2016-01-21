//	敌机2 v1.0
//	by chenxuan20141220

var Enemy_2=function (world){
	//	继承Enemy
	Enemy.call(
		this,
		world,
		[
			"src/enemy_2.png",
			"src/explode_1.png",
			"src/explode_2.png",
			"src/explode_3.png",
		],
		{
			w:150,
			h:150
		}
	);
	this.init=function (){
		this.initAABB();
	}
	this.initAABB=function(){
		this.addAABB(64,14,27,130);
		this.addAABB(23,98,102,18);
		this.addAABB(3,74,142,15);
	}
	this.fly=function(theWorld){
		//	让敌机飞
		if(!this.canHitByBullet){
			//	被击毁时就不能飞了
			return;
		}
		this.y+=this.speed;
		this.setPosition();
		if(this.y>theWorld.stages.height+this.height){
			this.alive=false;
			this.removeDomFromStage();
		}
	}
	
	this.FrameDo=function (theWorld){
		//	每帧动作
		this.fly(theWorld);
		this.checkHP();
		if(!this.canHitByBullet){
			this.playDistory(theWorld);
		}
	}

	this.HP=15;
	this.distoryMovie={
		//	设置爆炸动画开始结束帧段
		start:1,
		end:3,
		canMovie:true
	};

	this.init();
}