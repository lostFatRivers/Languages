class Welcome extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		console.log("welcome to BoomQuest!");
	}

	protected partAdded(partName:string,instance:any):void {
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void {
		super.childrenCreated();
	}
	
}