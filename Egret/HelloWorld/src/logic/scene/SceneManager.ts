/**
 * 场景管理器;
 */
class SceneManager {
	private rootStage: egret.DisplayObjectContainer;

	// 启动场景
	private launchScene: GameOrigin;
	// 角色创建场景
	private createRoleScene: SelectRole;
	// 游戏主场景
	private gameMainScene: GameLevels;

	// 当前显示的场景
	private currentScene: eui.Component;

	private static sceneManager: SceneManager;

	public constructor() {
		this.launchScene = new GameOrigin();
		this.createRoleScene = new SelectRole();
		this.gameMainScene = new GameLevels();
	}

	public static getInstance(): SceneManager {
		if (!this.sceneManager) {
			this.sceneManager = new SceneManager();
		}
		return this.sceneManager;
	}

	public setRootStage(stage: egret.DisplayObjectContainer) {
		this.rootStage = stage;
	}

	public toLaunchScene() {
		this.toTargetScene(this.launchScene);
	}

	public toCreateRoleScene() {
		this.toTargetScene(this.createRoleScene);
	}

	public toGameLevelScene() {
		this.toTargetScene(this.gameMainScene);
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