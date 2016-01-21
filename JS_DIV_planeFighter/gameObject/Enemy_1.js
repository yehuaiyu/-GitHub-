//	敌机1 v1.1
//	by chenxuan20141220

/*
====1.1====
1. 增加生命值
2. 增加爆炸动画
*/

var Enemy_1=function (world){
	//	继承Enemy
	Enemy.call(
		this,
		world,
		[
			"src/enemy_1.png",
			"src/explode_1.png",
			"src/explode_2.png",
			"src/explode_3.png",
		],
		{
			w:100,
			h:100
		}
	);
	this.init=function (){
		this.initAABB();
	}
	this.initAABB=function(){
		this.addAABB(16,26,12,10);
		this.addAABB(70,26,10,11);
		this.addAABB(5,34,86,17);
		this.addAABB(39,12,20,58);
		this.addAABB(47,82,9,12);
		this.addAABB(41,70,19,13);
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

	this.HP=5;
	this.distoryMovie={
		//	设置爆炸动画开始结束帧段
		start:1,
		end:3,
		canMovie:true
	};

	this.init();
}