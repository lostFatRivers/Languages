class LipstickShoot extends eui.Component implements  eui.UIComponent {

    public targetGroup: eui.Group;
    public knifeGroup: eui.Group;
    private _knife: egret.Bitmap;

    private inFly: boolean = false;

    private _runTimer: egret.Timer;
    private _rotaInterval: number = 3;

    private _knifeRotaArray: number[] = [];

    private _lastBull: egret.Bitmap[] = [];

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
		knifeWidth: 60,
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

        for (let i = 0; i < this.task; i++) {
            let bull = this.createBull(i);
            this._lastBull.push(bull)
            this.addChild(bull);
        }

        let lab1 = this.createLable(`第 ${this.level} 关`);
        lab1.y = 40;
        this.addChild(lab1);

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

            let isLossed: boolean = this.checkLose(rota);

            if (isLossed) {
                this.newGameNotice();
            } else {
                this._knifeRotaArray.push(rota);
                let kraSize = this._knifeRotaArray.length;
                let bullSize = this._lastBull.length;
                if (bullSize >= kraSize) {
                    let bull = this._lastBull[bullSize - kraSize];
                    bull.alpha = 0.5;
                }
                
                this.knifeGroup.removeChild(nk);

                let radian = rota * 2 * Math.PI / LipstickShoot.CONS.fullAngle;
                let line = LipstickShoot.CONS.knifeTargetY - LipstickShoot.CONS.circleCenterY;
                let x = LipstickShoot.CONS.circleRadius / 2 + Math.floor(line * Math.sin(radian));
                let y = LipstickShoot.CONS.circleRadius / 2 + Math.floor(line * Math.cos(radian));
                nk.x = x;
                nk.y = y;
                nk.rotation = 0 - this.targetGroup.rotation;
                this.targetGroup.addChildAt(nk, 0);

                if (kraSize == bullSize) {
                    this.passLevel();
                    return;
                }

                if (this.level >= 1) {
                    egret.setTimeout(this.randomInterval, this, Math.floor(Math.random() * 500) + 200);
                }
                if (this.level >= 2) {
                    egret.setTimeout(this.randomInterval, this, Math.floor(Math.random() * 500) + 600);
                }
                if (this.level >= 3) {
                    egret.setTimeout(this.randomInterval, this, Math.floor(Math.random() * 1000) + 800);
                }
            }
            
        });
    }

    private passLevel() {
        this._runTimer.stop();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventHandler, this);
        let lab1 = this.createLable(`闯关成功`);
        this.addChild(lab1);
        let btn1 = this.createButton("下一关");
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

    private checkLose(rota: number): boolean {
        let isLossed: boolean = false;
        for (let i = -8; i <= 8; i++) {
            let rangeRota = rota + i;
            if (rangeRota < 0) {
                rangeRota += 360
            }
            if (rangeRota >= 360) {
                rangeRota -= 360;
            }
            if (this._knifeRotaArray.indexOf(rangeRota) >= 0) {
                console.log("have rota:", rota);
                return true;
            }
        }
        return false;
    }

    private newGameNotice() {
        this._runTimer.stop();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventHandler, this);
        let lab1 = this.createLable("闯关失败");
        this.addChild(lab1);
        let btn1 = this.createButton("重新开始");
        btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, ev => {
            let parent = <Welcome>this.parent;
            if (parent) {
                let lipst = new LipstickShoot(1, 6);
                lipst.x = 0;
				lipst.y = 0;
                parent.addChild(lipst);
                parent.setLipst(lipst);
                parent.removeChild(this);
            }
        }, this);
        this.addChild(btn1);
    }

    private createButton(text: string): eui.Button {
        let btn1 = new eui.Button();
        btn1.label = text;
        btn1.width = 140;
        btn1.height = 80;
        btn1.x = LipstickShoot.CONS.knifeX;
        btn1.y = LipstickShoot.CONS.knifeY - 30;
        btn1.anchorOffsetX = 70;
        btn1.anchorOffsetY = 50;
        return btn1;
    }

    private createLable(text: string): eui.Label {
        let lab1 = new eui.Label();
        lab1.width = 300;
        lab1.height = 70;
        lab1.size = 50;
        lab1.fontFamily = "Microsoft YaHei";
        lab1.text = text;
        lab1.x = LipstickShoot.CONS.knifeX;
        lab1.y = 400;
        lab1.strokeColor = 0x0000ff;   //描边颜色
        lab1.stroke = 2;               //描边宽度
        lab1.textAlign = egret.HorizontalAlign.CENTER;
        lab1.anchorOffsetX = 150;
        return lab1;
    }

    private randomInterval() {
        let newI = Math.floor(Math.random() * 2) + 2
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

    private createBull(index: number): egret.Bitmap {
        let knife: egret.Bitmap = new egret.Bitmap();
        knife.texture = RES.getRes("knife_png");
        knife.width = LipstickShoot.CONS.knifeWidth / 2; 
        knife.height = LipstickShoot.CONS.knifeHeight / 2;
        knife.rotation = 60;
        knife.x = 100;
        knife.y = 740 - 35 * index;
        return knife;
    }
}