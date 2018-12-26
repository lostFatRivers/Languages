class LipstickShoot extends eui.Component implements  eui.UIComponent {

    public targetGroup: eui.Group;
    public knifeGroup: eui.Group;

    private inFly: boolean = false;

    private static _radius: number = 105;

	/** 常量 */
	private static CONS = {
		/** 圆桶直径 */
		circleRadius: 300,
		/** 圆中心点y值 */
		circleCenterY: 265,
		/** 随机角度底数 */
		randAngleBase: 800,
		/** 随机角度最小值 */
		randAngleFloor: 120,
		/** 随机时间底数 */
		randTimeBase: 2500,
		/** 随机时间最小值 */
		randTimeFloor: 1000,
		/** 飞刀终点y值 */
		knifeTargetY: 370,
		/** 飞刀飞行时间 */
		knifeFlyTime: 150,
		/** 圆周角 */
		fullAngle: 360,
		/** 飞刀宽度 */
		knifeWidth: 50,
		/** 飞刀长度 */
		knifeHeight: 120,
		knifeX: 320,
		knifeY: 650,
	}

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
        target.width = LipstickShoot.CONS.circleRadius; 
        target.height = LipstickShoot.CONS.circleRadius;
        target.x = 0;
        target.y = 0;

        this.targetGroup.addChild(target);
        this.randomTarget();

        let knife: egret.Bitmap = this.createKnife();
        this.knifeGroup.addChildAt(knife, 1);
        this.addShootEventListener(knife);
    }
    
    private randomTarget() {
        let randAngle = Math.ceil(Math.random() * LipstickShoot.CONS.randAngleBase) + LipstickShoot.CONS.randAngleFloor;
        if (Math.random() > 0.5) {
         randAngle = 0 - randAngle;
        }
        let randTime = Math.ceil(Math.random() * LipstickShoot.CONS.randTimeBase) + LipstickShoot.CONS.randTimeFloor;
        egret.Tween.get(this.targetGroup).to({rotation: randAngle}, randTime, egret.Ease.bounceIn).call(() => this.randomTarget());
    }

    private addShootEventListener(knife: egret.Bitmap) {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, ev => {
            if (this.inFly) {
                return;
            }
            this.inFly = true;
            let nk: egret.Bitmap = this.createKnife();
            this.knifeGroup.addChildAt(nk, 1);
            knife.visible = false;
            egret.Tween.get(nk).to({y: LipstickShoot.CONS.knifeTargetY}, LipstickShoot.CONS.knifeFlyTime, egret.Ease.cubicIn).call(() => {
                knife.visible = true;
                this.inFly = false;
                this.knifeGroup.removeChild(nk);

                let rota = Math.floor(this.targetGroup.rotation);
                if (rota < 0) {
                    rota += LipstickShoot.CONS.fullAngle;
                }
                console.log("now target rotation:", rota);
                
                let radian = rota * 2 * Math.PI / LipstickShoot.CONS.fullAngle;
				let line = LipstickShoot.CONS.knifeTargetY - LipstickShoot.CONS.circleCenterY;
                let x = LipstickShoot.CONS.circleRadius / 2 + Math.floor(line * Math.sin(radian));
                let y = LipstickShoot.CONS.circleRadius / 2 + Math.floor(line * Math.cos(radian));
                nk.x = x;
                nk.y = y;
                nk.rotation = 0 - this.targetGroup.rotation;
                console.log("now knife: (", x, ",", y, "), rotation:", nk.rotation);
                this.targetGroup.addChildAt(nk, 0);
            });
        }, this);
    }

    private createKnife(): egret.Bitmap {
        let knife: egret.Bitmap = new egret.Bitmap();
        knife.texture = RES.getRes("knife_png");
        knife.width = LipstickShoot.CONS.knifeWidth; 
        knife.height = LipstickShoot.CONS.knifeHeight;
        knife.x = LipstickShoot.CONS.knifeX;
        knife.y = LipstickShoot.CONS.knifeY;
        knife.anchorOffsetX = LipstickShoot.CONS.knifeWidth / 2;
        return knife;
    }
}