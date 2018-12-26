class ElementCube extends eui.Component implements  eui.UIComponent {
	public cubeImage: eui.Image;
	private texture: egret.Texture;

	public cx: number;
	public cy: number;

	public colorIndex: number;

	public constructor(cubeTexture: egret.Texture, cx: number, cy: number, color: number) {
		super();
		this.texture = cubeTexture;
		this.cx = cx;
		this.cy = cy;
		this.colorIndex = color;
	}

	protected partAdded(partName:string,instance:any):void {
		super.partAdded(partName,instance);
	}

	protected childrenCreated():void {
		super.childrenCreated();
		this.cubeImage.texture = this.texture;
	}
	
}