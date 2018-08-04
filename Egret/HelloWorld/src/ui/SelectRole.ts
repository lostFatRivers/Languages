class SelectRole extends eui.Component implements  eui.UIComponent {

	private confirmButton: eui.Button;
	private roleNameInput: eui.TextInput;
	private leftSlideButton: eui.Button;
	private rightSlideButton: eui.Button;
	
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void {
		super.partAdded(partName,instance);
	}

	protected childrenCreated():void {
		super.childrenCreated();
		
	}

	private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
	
}