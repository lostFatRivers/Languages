class Welcome extends eui.Component implements  eui.UIComponent {
	public lableHead: eui.Label;

	public constructor() {
		super();
		console.log("welcome to BoomQuest!");
	}

	protected partAdded(partName:string,instance:any):void {
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void {
		super.childrenCreated();
		this.touchCircle();
	}

	private touchCircle() {
		

		let circle = new egret.Shape();
		circle.graphics.beginFill(0xff0000, 0.7);
		circle.graphics.drawCircle(25, 25, 25);
		circle.graphics.endFill();

		this.addChild(circle);

		MyTools.addTouchMoveListener(circle);
	}
	
}