class ShootGame extends eui.Component implements  eui.UIComponent {
	public knifeGroup: eui.Group;
	public targetGroup: eui.Group;
	public laLastTime: eui.Label;

    private _knife: egret.Bitmap;

    private inFly: boolean = false;

    private _runTimer: egret.Timer;
    private _rotaInterval: number = 3;

    private _knifeRotaArray: number[] = [];

    private _lastBull: egret.Bitmap[] = [];

    public level: number;
    public task: number;

	private _startTime: number = 0;
	private _lastTime: number;

    private static sound: egret.Sound;

	/** 常量 */
	public static CONS = {
		/** 圆桶直径 */
		circleRadius: 300,
		/** 圆中心点y值 */
		circleCenterY: 420,
		/** 随机角度底数 */
		randAngleBase: 360,
		/** 随机角度最小值 */
		randAngleFloor: 120,
		/** 随机时间底数 */
		randTimeBase: 2500,
		/** 随机时间最小值 */
		randTimeFloor: 600,
		/** 飞刀终点y值 */
		knifeTargetY: 530,
		/** 飞刀飞行时间 */
		knifeFlyTime: 110,
		/** 圆周角 */
		fullAngle: 360,
		/** 飞刀宽度 */
		knifeWidth: 42,
		/** 飞刀长度 */
		knifeHeight: 170,
		knifeX: 320,
		knifeY: 810,

		/** 关卡lable位置Y */
		levelLableY: 60,

	}

    public constructor(level: number, task: number) {
        super();
        this.level = level;
        this.task = task;
		this._lastTime = 35;
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
        target.width = ShootGame.CONS.circleRadius; 
        target.height = ShootGame.CONS.circleRadius;
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
        lab1.y = ShootGame.CONS.levelLableY;
        this.addChild(lab1);
    }
    
    private randomTarget() {
        this._runTimer = new egret.Timer(16, 0);
        this._runTimer.addEventListener(egret.TimerEvent.TIMER, ev => {
            let old = this.targetGroup.rotation;
            this.targetGroup.rotation = old + this._rotaInterval;
			this.timeLimitTick();
        }, this); 
        this._runTimer.start();
    }

	private timeLimitTick() {
		if (this._startTime == 0) {
			this._startTime = egret.getTimer();
			this.laLastTime.text = this._lastTime.toString();
			return;
		}
		if (this._lastTime <= 0) {
			this.newGameNotice();
			return;
		}
		let passTime = Math.floor((egret.getTimer() - this._startTime) / 1000);
		if (passTime >= 1) {
			this._startTime = egret.getTimer();
			this._lastTime = this._lastTime - 1;
			this.laLastTime.text = this._lastTime.toString();
		}
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

        let shootSound:egret.Sound = RES.getRes("shoot_mp3");
        shootSound.play(0, 1);

        egret.Tween.get(nk).to({y: ShootGame.CONS.knifeTargetY}, ShootGame.CONS.knifeFlyTime, egret.Ease.cubicIn).call(() => {
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

                let radian = rota * 2 * Math.PI / ShootGame.CONS.fullAngle;
                let line = ShootGame.CONS.knifeTargetY - ShootGame.CONS.circleCenterY;
                let x = ShootGame.CONS.circleRadius / 2 + Math.floor(line * Math.sin(radian));
                let y = ShootGame.CONS.circleRadius / 2 + Math.floor(line * Math.cos(radian));
                nk.x = x;
                nk.y = y;
                nk.rotation = 0 - this.targetGroup.rotation;
                this.targetGroup.addChildAt(nk, 0);

                let insertSound:egret.Sound = RES.getRes("insert_mp3");
                insertSound.play(0, 1);

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
        if (this.level == 3) {
            let btn1 = this.createButton("重新开始");
            SceneManager.getInstance().bgSoundChannel().stop();
            let winSound: egret.Sound = RES.getRes("win_mp3");
            let winChannel = winSound.play(0, 1);
            btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, ev => {
                //SceneManager.getInstance().setGameResult(1);
                winChannel.stop();
                SceneManager.getInstance().toGameScene(1, 7);
            }, this);
            this.addChild(btn1);
        } else {
            let btn1 = this.createButton("下一关");
            btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, ev => {
                SceneManager.getInstance().toGameScene(this.level + 1, this.task + 3);
            }, this);
            this.addChild(btn1);
        }
    }

    private checkLose(rota: number): boolean {
        let isLossed: boolean = false;
        for (let i = -10; i <= 10; i++) {
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
        SceneManager.getInstance().bgSoundChannel().stop();
        let loseSound: egret.Sound = RES.getRes("lose_mp3");
        let loseChannel = loseSound.play(0, 1);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchEventHandler, this);
        let lab1 = this.createLable("闯关失败");
        this.addChild(lab1);
        let btn1 = this.createButton("重新开始");
        btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, ev => {
            //SceneManager.getInstance().setGameResult(0);
            loseChannel.stop();
            SceneManager.getInstance().toGameScene(1, 7);
        }, this);
        this.addChild(btn1);
    }

    private createButton(text: string): eui.Button {
        let btn1 = new eui.Button();
        btn1.label = text;
        btn1.width = 140;
        btn1.height = 80;
        btn1.x = ShootGame.CONS.knifeX;
        btn1.y = ShootGame.CONS.knifeY - 30;
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
        lab1.x = ShootGame.CONS.knifeX;
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
            rota += ShootGame.CONS.fullAngle;
        }
        return rota;
    }

    private createKnife(): egret.Bitmap {
        let knife: egret.Bitmap = new egret.Bitmap();
        knife.texture = RES.getRes("knife_png");
        knife.width = ShootGame.CONS.knifeWidth; 
        knife.height = ShootGame.CONS.knifeHeight;
        knife.x = ShootGame.CONS.knifeX;
        knife.y = ShootGame.CONS.knifeY;
        knife.anchorOffsetX = ShootGame.CONS.knifeWidth / 2;
        return knife;
    }

    private createBull(index: number): egret.Bitmap {
        let knife: egret.Bitmap = new egret.Bitmap();
        knife.texture = RES.getRes("knife_png");
        knife.width = ShootGame.CONS.knifeWidth / 2; 
        knife.height = ShootGame.CONS.knifeHeight / 2;
        knife.rotation = 60;
        knife.x = 100;
        knife.y = ShootGame.CONS.knifeY + 50 - 35 * index;
        return knife;
    }
}