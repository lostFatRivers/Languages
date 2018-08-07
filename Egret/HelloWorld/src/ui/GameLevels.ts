class GameLevels extends eui.Component implements  eui.UIComponent {
	// 可变大小滚动层, 放置关卡
	private scrollLevelsGroup: eui.Group;

	/** headGroup包括 roleHeadImage + roleHeadImage */
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
	}
	
}