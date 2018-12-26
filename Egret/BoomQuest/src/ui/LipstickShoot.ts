class LipstickShoot extends eui.Component implements  eui.UIComponent {

	public targetGroup: eui.Group;

	private inFly: boolean = false;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void {
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void {
		super.childrenCreated();
		this.initShootTarget();
	}

	private initShootTarget() {
		let target: egret.Bitmap = new egret.Bitmap();
		target.texture = RES.getRes("bigCircle_png");
		target.width = 320; 
		target.height = 320;
		target.x = 0;
		target.y = 0;

		this.targetGroup.addChild(target);
		this.randomTarget();

		let knife: egret.Bitmap = this.createKnife();
		this.addChildAt(knife, 1);
		this.addShootEventListener(knife);
	}
	
	private randomTarget() {
		let randAngle = Math.ceil(Math.random() * 1000) + 120;
		if (Math.random() > 0.5) {
			randAngle = 0 - randAngle;
		}
		let randTime = Math.ceil(Math.random() * 4500) + 1000;

		egret.Tween.get(this.targetGroup).to({rotation: randAngle}, randTime, egret.Ease.bounceIn).call(() => this.randomTarget());
	}

	private addShootEventListener(knife: egret.Bitmap) {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, ev => {
			if (this.inFly) {
				return;
			}
			this.inFly = true;
			let nk: egret.Bitmap = this.createKnife();
			this.addChildAt(nk, 1);
			knife.visible = false;
			console.log("knife touched");
			egret.Tween.get(nk).to({y: 350}, 150, egret.Ease.cubicIn).call(() => {
				console.log("add to target a knife");
				knife.visible = true;
				this.inFly = false;
			});
		}, this);
	}

	private createKnife(): egret.Bitmap {
		let knife: egret.Bitmap = new egret.Bitmap();
		knife.texture = RES.getRes("knife_png");
		knife.width = 62; 
		knife.height = 207;
		knife.x = 289;
		knife.y = 650;
		return knife;
	}
}