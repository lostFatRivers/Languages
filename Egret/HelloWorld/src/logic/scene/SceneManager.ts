/**
 * 场景管理器;
 */
class SceneManager {
	private rootStage: egret.DisplayObjectContainer;

	private launchScene: GameOrigin;
	private createRoleScene: SelectRole;

	private static sceneManager: SceneManager;

	public constructor() {
		this.launchScene = new GameOrigin();
		this.createRoleScene = new SelectRole();
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
		if (this.launchScene.parent) {
			return;
		}
		this.rootStage.addChild(this.launchScene);
	}

	public toCreateRoleScene() {
		if (this.createRoleScene.parent) {
			return;
		}
		this.rootStage.addChild(this.createRoleScene);
		this.rootStage.removeChild(this.launchScene);
	}
}