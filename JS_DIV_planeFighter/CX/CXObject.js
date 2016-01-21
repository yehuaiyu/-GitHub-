//	游戏单位类 v1.1
//	by chenxuan20141206

/*
====1.1====
1. 增加游戏sprite功能
*/

var CXObject=function (world,dom,WH){
	this.init=function (world,dom,WH){
		if((typeof dom)=="string"||(dom instanceof Array)){
			var domS=dom;
			dom=this.createSpriteDom();
		}

		this.dom=dom;
		if((typeof domS)=="string"){
			this.addInSprite(domS);
		}
		if(WH){
			this.setSize(WH.w,WH.h);
		}
		if((domS instanceof Array)){
			var len=domS.length;
			for(var i=0;i<len;i++){
				this.addInSprite(domS[i]);
			}
		}
		this.world=world;
		this.setDomAbs();
	}
	this.setSize=function (width,height){
		//	设置长宽
		this.width=(typeof width==="undefined")?this.width:width;
		this.height=(typeof height==="undefined")?this.height:height;
		this.setDomSize();
	}
	this.setDomSize=function (){
		//	设置该dom的长宽
		this.dom.style.width=this.width+"px";
		this.dom.style.height=this.height+"px";
	}
	this.createSpriteDom=function (){
		//	创建有精灵效果的div
		var box=document.createElement("div");
		box.style.width="100px";
		box.style.height="100px";
		box.style.overflow="hidden";
		this.width=100;
		this.height=100;
		box.style.position="absolute";
		var layer=document.createElement("div");
		layer.style.height="100%";
		box.appendChild(layer);
		box.layer=layer;
		box.layerWidth=0;
		box.nowFrame=0;
		box.frameLength=0;
		return box;
	}
	this.goToSpriteFrame=function (_frame){
		//	跳转游戏精灵中的帧
		var isEnd=false;
		if((typeof _frame)!="undefined"){
			if(_frame>this.dom.frameLength-1){
				_frame=this.dom.frameLength-1;
			}
			if(_frame<0){
				_frame=0;
			}
			this.dom.nowFrame=_frame;
			this.dom.layer.style.marginLeft="-"+(_frame*this.width)+"px";
		}else{
			this.dom.nowFrame++;
			if(this.dom.nowFrame>this.dom.frameLength-1){
				this.dom.nowFrame=this.dom.frameLength-1;
				isEnd=true;
			}
			this.dom.layer.style.marginLeft="-"+(this.dom.nowFrame*this.width)+"px";
		}
		return isEnd;
	}
	this.addInSprite=function (imgSrc){
		//	添加一个图片作为游戏精灵的下一帧
		var img=document.createElement("img");
		img.src=imgSrc;
		img.style.width=this.width+"px";
		img.style.height=this.height+"px";
		img.style.cssFloat="left";
		this.dom.layer.appendChild(img);
		this.dom.layerWidth+=this.width;
		this.dom.layer.style.width=this.dom.layerWidth+"px";
		this.dom.frameLength++;
	}
	this.getCurrentFrame=function (){
		//	获得当前播放的帧
		return this.dom.nowFrame;
	}
	this.setDomAbs=function (){
		//	设置dom对象为绝对定位
		this.dom.style.position="absolute";
		this.setDomXY();
	}
	this.setDomXY=function (){
		//	设置dom对象的left和top位置
		this.dom.style.left=this.x+"px";
		this.dom.style.top=this.y+"px";
	}
	this.setPosition=function (_x,_y){
		//	设置x,y坐标
		this.x=(typeof _x==="undefined")?this.x:_x;
		this.y=(typeof _y==="undefined")?this.y:_y;
		this.setDomXY();
	}
	this.worldFrameDo=function (world){
		//	游戏世界被运行时调用该函数
		this.resetAABB();
		this.FrameDo(world);
	}
	this.FrameDo=function (world){
		//	游戏世界刷新时也刷新该函数
		//	继承CXObject需要重写该函数
	}
	this.addAABB=function (_iX,_iY,_width,_height){
		//	添加一个碰撞箱
		var oneAABB=new AABB(this.x,this.y,_width,_height);
		oneAABB.insideX=_iX;
		oneAABB.insideY=_iY;
		this.AABBs.push(oneAABB);
	}
	this.resetAABB=function (){
		//	更新碰撞箱位置
		var len=this.AABBs.length;
		for(var i=0;i<len;i++){
			this.AABBs[i].x=this.x;
			this.AABBs[i].y=this.y;
		}
	}
	this.isHit=function (_obj){
		//	检测CXObject碰撞
		var len=this.AABBs.length;
		if(!_obj.AABBs){
			return false;
		}
		var lenObj=_obj.AABBs.length;
		// console.log(len,lenObj);
		for(var i=0;i<len;i++){
			for(var j=0;j<lenObj;j++){
				if(this.AABBs[i].checkHit(_obj.AABBs[j])){
					return true;
				}
			}
		}
		return false;
	}
	this.addDomToStage=function (_stage){
		//	添加到HTML文档
		_stage.appendChild(this.dom);
	}
	this.addIn=function (){
		//	添加到游戏世界和HTML文档中
		this.world.add(this);
		this.addDomToStage(this.world.stages.stage);
	}
	this.removeDomFromStage=function (){
		//	把CXObject由html文档中移除
		try{
			this.dom.parentNode.removeChild(this.dom);
		}catch(e){}
	}

	this.x=0;
	this.y=0;
	this.width=100;
	this.height=100;
	this.alive=true;
	this.dom=null;
	this.AABBs=[];
	this.world=null;
	this.init(world,dom,WH);
}