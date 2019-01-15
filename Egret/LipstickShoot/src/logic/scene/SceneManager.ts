class SceneManager {
	private static instance: SceneManager;

    // 舞台
    private rootStage: egret.DisplayObjectContainer;

    // 当前显示的场景
	private currentScene: eui.Component;

    private wx: any;

    private sound: egret.Sound;

    public constructor() {
    }

    public static getInstance(): SceneManager {
        if (!this.instance) {
            this.instance = new SceneManager();
            this.instance.wxConfig();
            this.instance.bgSoundPlay();
        }
        return this.instance;
    }

    private bgSoundPlay() {
        if (!this.sound) {
            this.sound = RES.getRes("bgm_mp3");
            let soundChannel: egret.SoundChannel = this.sound.play();
            soundChannel.volume = 0.2;
        }
    }

    private wxConfig() {
        this.wx = window["wx"];
        this.wx.config({miniProgram: ["redirectTo"]});
        this.wx.error(function() {
            console.log("接口验证失败");
        });
        this.wx.ready(function() {
            console.log("接口验证成功");
        });
        console.log("init wx config");
    }

    public setRootStage(stage: egret.DisplayObjectContainer) {
		this.rootStage = stage;
	}

    public toGameScene(level: number, task: number) {
        this.toTargetScene(new ShootGame(level, task));
    }

    private toTargetScene(targetScene: eui.Component) {
		if (targetScene.parent) {
			return;
		}
		this.rootStage.addChild(targetScene);
		if (this.currentScene) {
			this.rootStage.removeChild(this.currentScene);
		}
		this.currentScene = targetScene;
	}

	/** 游戏结果: 1: 成功, 0: 失败 */
	public setGameResult(result: number) {
        if (result == 1) {
            this.wx.miniProgram.redirectTo({url: "/pages/settlement/settlement?stat=win"})
        } else {
            this.wx.miniProgram.redirectTo({url: "/pages/settlement/settlement?stat=loss"})
        }
	}

}