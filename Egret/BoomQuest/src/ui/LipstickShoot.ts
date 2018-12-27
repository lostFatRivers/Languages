class LipstickShoot extends eui.Component implements  eui.UIComponent {

    public targetGroup: eui.Group;
    public knifeGroup: eui.Group;
    private _knife: egret.Bitmap;

    private inFly: boolean = false;

    private _runTimer: egret.Timer;
    private _rotaInterval: number = 3;

    private _knifeRotaArray: number[] = [];

    public level: number;
    public task: number;

	/** 常量 */
	private static CONS = {
		/** 圆桶直径 */
		circleRadius: 300,
		/** 圆中心点y值 */
		circleCenterY: 315,
		/** 随机角度底数 */
		randAngleBase: 360,
		/** 随机角度最小值 */
		randAngleFloor: 120,
		/** 随机时间底数 */
		randTimeBase: 2500,
		/** 随机时间最小值 */
		randTimeFloor: 600,
		/** 飞刀终点y值 */
		knifeTargetY: 420,
		/** 飞刀飞行时间 */
		knifeFlyTime: 110,
		/** 圆周角 */
		fullAngle: 360,
		/** 飞刀宽度 */
		knifeWidth: 50,
		/** 飞刀长度 */
		knifeHeight: 120,
		knifeX: 320,
		knifeY: 670,
	}

    public constructor(level: number, task: number) {
        super();
        this.level = level;
        this.task = task;
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

        this._knife = this.createKnife();
        this.knifeGroup.addChildAt(this._knife, 1);
        this.addShootEventListener();
    }
    
    private randomTarget() {
        this._runTimer = new egret.Timer(16, 0);
        this._runTimer.addEventListener(egret.TimerEvent.TIMER, ev => {
            let old = this.targetGroup.rotation;
            this.targetGroup.rotation = old + this._rotaInterval;
        }, this); 
        this._runTimer.start();
    }

    private addShootEventListener() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventHandler, this);
    }

    private touchEventHandler(event: egret.TouchEvent) {
        if (this.inFly) {
            return;
        }
        this.inFly = true;
        let nk: egret.Bitmap = this.createKnife();
        this.knifeGroup.addChildAt(nk, 1);
        this._knife.visible = false;

        egret.Tween.get(nk).to({y: LipstickShoot.CONS.knifeTargetY}, LipstickShoot.CONS.knifeFlyTime, egret.Ease.cubicIn).call(() => {
            this._knife.visible = true;
            this.inFly = false;

            let rota = this.transRota(this.targetGroup.rotation);

            let isLossed: boolean = false;
            for (let i = -6; i <= 6; i++) {
                let rangeRota = rota + i;
                if (rangeRota < 0) {
                    rangeRota += 360
                }
                if (rangeRota >= 360) {
                    rangeRota -= 360;
                }
                
                if (this._knifeRotaArray.indexOf(rangeRota) >= 0) {
                    console.log("have rota:", rota);
                    isLossed = true;
                    break;
                }
            }

            if (isLossed) {
                //egret.Tween.get(nk).to({y: LipstickShoot.CONS.knifeTargetY + 30}, LipstickShoot.CONS.knifeFlyTime, egret.Ease.bounceIn);
                this._runTimer.stop();
                this.newGameNotice();
            } else {
                this._knifeRotaArray.push(rota);
                
                this.knifeGroup.removeChild(nk);

                let radian = rota * 2 * Math.PI / LipstickShoot.CONS.fullAngle;
                let line = LipstickShoot.CONS.knifeTargetY - LipstickShoot.CONS.circleCenterY;
                let x = LipstickShoot.CONS.circleRadius / 2 + Math.floor(line * Math.sin(radian));
                let y = LipstickShoot.CONS.circleRadius / 2 + Math.floor(line * Math.cos(radian));
                nk.x = x;
                nk.y = y;
                nk.rotation = 0 - this.targetGroup.rotation;
                this.targetGroup.addChildAt(nk, 0);
                egret.setTimeout(this.randomInterval, this, 500);
                egret.setTimeout(this.randomInterval, this, 100);
            }
            
        });
    }

    private newGameNotice() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventHandler, this);
        let btn1 = new eui.Button();
        btn1.label = "重新开始";
        btn1.width = 200;
        btn1.height = 100;
        btn1.x = LipstickShoot.CONS.knifeX;
        btn1.y = LipstickShoot.CONS.knifeY - 30;
        btn1.anchorOffsetX = 100;
        btn1.anchorOffsetY = 50;
        btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, ev => {
            let parent = <Welcome>this.parent;
            if (parent) {
                let lipst = new LipstickShoot(this.level + 1, this.task + 5);
                lipst.x = 0;
				lipst.y = 0;
                parent.addChild(lipst);
                parent.setLipst(lipst);
                parent.removeChild(this);
            }
        }, this);
        this.addChild(btn1);
    }

    private randomInterval() {
        let newI = Math.floor(Math.random() * 3) + 2
        if (Math.random() > 0.7) {
            newI = 0 - newI;
        }
        this._rotaInterval = newI;
    }

    private transRota(rotation: number): number {
        let rota = Math.floor(rotation);
        if (rota < 0) {
            rota += LipstickShoot.CONS.fullAngle;
        }
        return rota;
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