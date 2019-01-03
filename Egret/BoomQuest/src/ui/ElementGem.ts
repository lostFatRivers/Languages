class ElementGem extends eui.Component implements  eui.UIComponent {
	public imgGem: eui.Image;

	private texture: egret.Texture;

	public cx: number;
	public cy: number;

	public gemType: number;

	public constructor(cubeTexture: egret.Texture, cx: number, cy: number, type: number) {
		super();
		this.texture = cubeTexture;
		this.cx = cx;
		this.cy = cy;
		this.gemType = type;
	}

	protected partAdded(partName:string,instance:any):void {
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void {
		super.childrenCreated();
		this.imgGem.texture = this.texture;
	}
	
}