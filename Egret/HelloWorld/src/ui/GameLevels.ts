class GameLevels extends eui.Component implements  eui.UIComponent {
	// 可变大小滚动层, 放置关卡
	private scrollLevelsGroup: eui.Group;

	/** headGroup包括 roleHeadImage + roleHeadImage + roleNickName */
	private roleHeadGroup: eui.Group;

	private btPackage: eui.Button;
	private btForge: eui.Button;
	private btShop: eui.Button;
	private btMore: eui.Button;
	
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void {
		super.partAdded(partName,instance);
	}

	protected childrenCreated():void {
		super.childrenCreated();
		this.initRoleData();
	}
	
	private initRoleData() {
		let roleData: PlayerRole = RoleManager.getInstance().getPlayerRole();
		let profIndex: number = roleData.profIndex;
		let nickName: string = roleData.roleName;

		let headImage = <eui.Image> this.roleHeadGroup.$children[0];
		let headFrame = <eui.Image> this.roleHeadGroup.$children[1];
		let nameLable = <eui.Label> this.roleHeadGroup.$children[2];

		let prosTemps = TempleteManager.getInstance().getProfessions();
		let prossesion = prosTemps[profIndex];
		headImage.source = prossesion.profMiniIcon;
		nameLable.text = nickName;
		if (roleData.roleLevel > 30) {
			headFrame.source = "headFrameNice_png";
		}
	}
}