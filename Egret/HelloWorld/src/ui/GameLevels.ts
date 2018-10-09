class GameLevels extends eui.Component implements eui.UIComponent {
	public static LEVEL_KEY: string = "player_level";

	public static LEFT_X: number = 80;
	public static RIGHT_X: number = 448;
	public static BOTTOM_MARGIN: number = 430;
	public static BOX_INTERVAL: number = 200;

	// 可变大小滚动层, 放置关卡
	private scrollLevelsGroup: eui.Group;

	/** headGroup包括 roleHeadImage + roleHeadImage + roleNickName */
	private roleHeadGroup: eui.Group;

	private btPackage: eui.Button;
	private btForge: eui.Button;
	private btShop: eui.Button;
	private btMore: eui.Button;

	private levelIndex: number;

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.initRoleData();
		this.initLevels();
		this.registerButtonEvent();
	}

	private initRoleData() {
		let roleData: PlayerRole = RoleManager.getInstance().getPlayerRole();
		let profIndex: number = roleData.profIndex;
		let nickName: string = roleData.roleName;

		let headImage = <eui.Image>this.roleHeadGroup.$children[0];
		let headFrame = <eui.Image>this.roleHeadGroup.$children[1];
		let nameLable = <eui.Label>this.roleHeadGroup.$children[2];

		let prosTemps = TempleteManager.getInstance().getProfessions();
		let prossesion = prosTemps[profIndex];
		headImage.source = prossesion.profMiniIcon;
		nameLable.text = nickName;
		if (roleData.roleLevel > 30) {
			headFrame.source = "headFrameNice_png";
		}
	}

	private initLevels() {
		let levelIndexStr = egret.localStorage.getItem(GameLevels.LEVEL_KEY);
		if (levelIndexStr == null || levelIndexStr == undefined) {
			this.levelIndex = 0;
			this.updateLevelData();
		} else {
			this.levelIndex = parseInt(levelIndexStr);
		}
		console.log("Level index:" + this.levelIndex);
		let content: egret.DisplayObjectContainer = this.createLevels();
		let scrollView = new egret.ScrollView();
		scrollView.width = this.scrollLevelsGroup.width;
		scrollView.height = this.scrollLevelsGroup.height;
		scrollView.x = 0;
		scrollView.y = 0;
		scrollView.anchorOffsetX = 0;
		scrollView.anchorOffsetY = 0;
		scrollView.setContent(content);
		scrollView.verticalScrollPolicy = "on";
		scrollView.horizontalScrollPolicy = "off";
		this.scrollLevelsGroup.addChild(scrollView);
	}

	// 希望动态创建玩家的关卡列表, 当前只有显示20关, 上下滑动时, 动态添加和删除
	private createLevels(): egret.DisplayObjectContainer {
		let levelContent: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
		let contentWidth = 720;
		let contentHeight = 1280;
		for (let i = 1; i <= this.levelIndex + 5; i ++) {
			let eachLevel: eui.Image = new eui.Image();
			eachLevel.width = 192;
			eachLevel.height = 192;
			if (i > this.levelIndex) {
				if (i % 2 == 0) {
					eachLevel.source = "levelRightLocked_png";
				} else {
					eachLevel.source = "levelLeftLocked_png";
				}
			} else {
				if (i % 2 == 0) {
					eachLevel.source = "levelRightOpen_png";
				} else {
					eachLevel.source = "levelLeftOpen_png";
				}
			}
			if (i % 2 == 0) {
				eachLevel.x = GameLevels.RIGHT_X;
			} else {
				eachLevel.x = GameLevels.LEFT_X;
			}
			let yPos: number = contentHeight - (GameLevels.BOTTOM_MARGIN + GameLevels.BOX_INTERVAL * (i - 1));
			if (yPos < 0) {
				break;
			}
			eachLevel.y = yPos;
			eachLevel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onLevelTouch, this);
			levelContent.addChild(eachLevel);
		}
		levelContent.width = contentWidth;
		levelContent.height = contentHeight;
		return levelContent;
	}

	private updateLevelData() {
		egret.localStorage.setItem(GameLevels.LEVEL_KEY, String(this.levelIndex));
	}

	private registerButtonEvent() {
		this.btMore.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ev => {
			console.log("delete player role");
			RoleManager.getInstance().deleteRole();
			SceneManager.getInstance().toLaunchScene();
		}, this);
	}

	private onLevelTouch(ev: egret.TouchEvent) {
		console.log("level touched, index:" + ev.target);
	}
}