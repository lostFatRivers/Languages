class BgGrid extends egret.Shape {
	public constructor(bgWidth: number, bgHeight: number) {
		super();
		this.drawGrid(bgWidth, bgHeight);
	}

	private drawGrid(bgWidth: number, bgHeight: number) {
		this.graphics.beginFill(0xcdcdcd);
        this.graphics.drawRect(0, 0, bgWidth, bgHeight);
		this.graphics.endFill();
	}

}