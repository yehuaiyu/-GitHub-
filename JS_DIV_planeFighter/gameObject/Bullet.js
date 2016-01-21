//	子弹类 v1.1
//	by chenxuan20141220

/*
====1.1===
1. 子弹由一击即毁改成扣除敌机生命值
*/

var Bullet=function (world){
	//	继承CXObject并绑定dom对象
	CXObject.call(this,world,document.createElement("img"));
	this.init=function (){
		this.dom.src="src/bullet.png";

		//	设置子弹碰撞箱
		this.addAABB(1,0,3,14);
	}
	this.fly=function (theWorld){
		//	让子弹飞
		this.y+=this.speed;
		this.setPosition();
		if(this.y<-this.height||this.y>theWorld.stages.height+this.heigh){
			this.alive=false;
			this.removeDomFromStage();
		}
	}
	this.FrameDo=function (theWorld){
		this.fly(theWorld);

		//	我的子弹射谁谁死
		var allElement=theWorld.worldElements;
		var len=allElement.length;
		for(var i=0;i<len;i++){
			if(
				this!=allElement[i]&&
				allElement[i].canHitByBullet&&
				this.isHit(allElement[i])
			){
				this.alive=false;
				this.removeDomFromStage();
				allElement[i].HP-=this.damage;
				// allElement[i].alive=false;
				// allElement[i].removeDomFromStage();
				// theWorld.otherData.main.mark+=allElement[i].mark;
			}
		}
	}

	this.height=14;
	this.width=5;
	this.speed=0;
	this.damage=5;
	this.init();
}