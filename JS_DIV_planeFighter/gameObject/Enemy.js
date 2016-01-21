//	敌机总类 v1.1
//	by chenxuan20141220

/*
====1.0====
1. 增加生命值
====1.1====
1. 增加爆炸动画
*/

var Enemy=function (world,dom){
	//	继承CXObject并绑定dom对象
	CXObject.call(this,world,dom);
	this.checkHP=function (){
		if(this.HP<=0){
			this.canHitByBullet=false;
		}
	}
	this.playDistory=function (theWorld){
		//	播放爆炸动画
		if(this.distoryMovie.canMovie){
			this.distoryMovie.canMovie=false;
			var currentFrame=this.getCurrentFrame();
			if(currentFrame>=this.distoryMovie.start&&currentFrame<this.distoryMovie.end){
				this.goToSpriteFrame();
			}else if(currentFrame==this.distoryMovie.end){
				this.alive=false;
				this.removeDomFromStage();
				this.world.otherData.main.mark+=this.mark;
			}else{
				this.goToSpriteFrame(this.distoryMovie.start);
			}
			var timer=new CXTime(theWorld);
			timer.setCount(40,(function (){
				this.distoryMovie.canMovie=true;
			}).bind(this));
			timer.start();
		}
	}

	this.height=100;	//	默认高度
	this.width=100;	//	默认宽度
	this.speed=2;	// 默认速度
	this.mark=2;	//	默认分数
	this.HP=2;	// 默认生命值
	this.canHitByBullet=true;	//	默认能够被击毁
}