class SceneManager {
    private static instance: SceneManager;

    // 舞台
    private rootStage: egret.DisplayObjectContainer;

    // 当前显示的场景
	private currentScene: eui.Component;

    public constructor() {
    }

    public static getInstance(): SceneManager {
        if (!this.instance) {
            this.instance = new SceneManager();
        }
        return this.instance;
    }

    public setRootStage(stage: egret.DisplayObjectContainer) {
		this.rootStage = stage;
	}

    public toWelcomeScene() {
        this.toTargetScene(new Welcome());
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
}