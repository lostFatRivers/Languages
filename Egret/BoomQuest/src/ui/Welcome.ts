class Welcome extends eui.Component implements  eui.UIComponent {
	public lableHead: eui.Label;
	public btChangeState: eui.Button;
	
	public cubeBox: eui.Group;
	public btSwitchGame: eui.Button;

	private _lipst: LipstickShoot;

	public static CUBE_BOX_SIZE = 8;
	public static CUBE_LENGTH = 75;
	public static CUBE_TYPE_SIZE = 6;
	
	private _textureArray = [];

	private _canTouch: boolean = true;
	private _tickTime: number = 0;
	private _tickable: boolean = true;

	private _cubeMap = {};

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
		this.initCubeBox();
	}

	private touchCircle() {
		let person: egret.Bitmap = new egret.Bitmap();
		person.texture = RES.getRes("p0" + 1 + "_png");
		person.width *= 2; 
		person.height *= 2;
		person.x = 70;
		person.y = 930;

		// 添加人物动画
		let picIndex = 1;
		let personRun = ts => {
			if (!this._tickable) {
				return;
			}
			if ((ts - this._tickTime) < 200) {
				return false;
			}
			this._tickTime = ts;
			let pn = picIndex % 4 + 1;
			person.texture = RES.getRes("p0" + pn + "_png");
			picIndex ++;
			return true;
		};

		let changeStage = () => {
			if (this._tickable) {
				this.btChangeState.label = "停止";
			} else {
				this.btChangeState.label = "行动";
			}
		}
		changeStage();

		// 添加按钮控制
		this.btChangeState.addEventListener(egret.TouchEvent.TOUCH_TAP, ev => {
			this._tickable = !this._tickable;
			changeStage();
		}, this);

		egret.startTick(personRun, this);

		this.addChild(person);

		
		this.btSwitchGame.addEventListener(egret.TouchEvent.TOUCH_TAP, ev => {
			if (this._lipst == undefined) {
				this._lipst = new LipstickShoot(1, 6);
				this._lipst.x = 0;
				this._lipst.y = 0;
				this.addChild(this._lipst);
			} else {
				this.removeChild(this._lipst);
				this._lipst = undefined;
			}
		}, this);
	}

	public setLipst(newLips: LipstickShoot) {
		this._lipst = newLips;
	}

	private initCubeBox() {
		let size = Welcome.CUBE_BOX_SIZE;
		let cubeLength = Welcome.CUBE_LENGTH;
		let sourceSize = Welcome.CUBE_TYPE_SIZE;
		for (let i = 1; i <= sourceSize; i++) {
			this._textureArray.push(RES.getRes("img_Cube" + i + "_png"))
		}
		for (let i = 0; i < size * size; i++) {
			let cx = i == 0 ? 0 : Math.floor(i / size);
			let cy = i % size;
			let x = cx * cubeLength;
			let y = cy * cubeLength;
			this.createCube(cx, cy, x, y);
		}
	}

	private createCube(cx: number, cy: number, x: number, y: number): ElementCube {
		let sourceSize = Welcome.CUBE_TYPE_SIZE;
		let textureIndex = Math.floor(Math.random() * 100) % sourceSize
		let cube: ElementCube = new ElementCube(this._textureArray[textureIndex], cx, cy, textureIndex);
		if (!this._cubeMap[cx]) {
			this._cubeMap[cx] = {};
		}
		this._cubeMap[cx][cy] = cube;
		cube.x = x;
		cube.y = y;
		this.cubeBox.addChild(cube);
		cube.addEventListener(egret.TouchEvent.TOUCH_TAP, ev => {
			this.onCubeClicked(cube);
		}, this)
		return cube;
	}

	private onCubeClicked(cube: ElementCube) {
		let destroyArray: ElementCube[] = [];
		this.findAllDestroy(cube, destroyArray)
		if (destroyArray.length <= 1) {
			return;
		}

		let colMap = {};
		for (let eachDestroy of destroyArray) {
			this.cubeBox.removeChild(eachDestroy);
			this._cubeMap[eachDestroy.cx][eachDestroy.cy] = undefined;
			if (colMap[eachDestroy.cx] == undefined) {
				colMap[eachDestroy.cx] = {maxY: 0, num: 0};
			}
			let xObj = colMap[eachDestroy.cx];
			if (xObj.maxY < eachDestroy.cy) {
				xObj.maxY = eachDestroy.cy;
			}
			xObj.num += 1;
		}
		for (let cx in colMap) {
			let xObj = colMap[cx];
			this.onCubeDestroy(parseInt(cx), xObj);
		}
	}

	private compareAndAdd(c: ElementCube, o: ElementCube, arr: ElementCube[]) {
		if (c != undefined && arr.indexOf(c) < 0 && c.colorIndex == o.colorIndex) {
			this.findAllDestroy(c, arr);
		}
	}

	private findAllDestroy(cube: ElementCube, arr: ElementCube[]) {
		if (arr.indexOf(cube) >= 0) {
			return;
		}
		arr.push(cube);
		let cx = cube.cx;
		let cy = cube.cy;
		// left
		let leftCx = cx - 1;
		if (leftCx >= 0) {
			this.compareAndAdd(this._cubeMap[leftCx][cy], cube, arr);
		}
		// top
		let topCy = cy - 1;
		if (topCy >= 0) {
			this.compareAndAdd(this._cubeMap[cx][topCy], cube, arr);
		}
		// right
		let rightCx = cx + 1;
		if (rightCx < Welcome.CUBE_BOX_SIZE) {
			this.compareAndAdd(this._cubeMap[rightCx][cy], cube, arr);
		}
		// bottom
		let bottomCy = cy + 1;
		if (bottomCy < Welcome.CUBE_BOX_SIZE) {
			this.compareAndAdd(this._cubeMap[cx][bottomCy], cube, arr);
		}
	}
	
	private onCubeDestroy(cx: number, xObj: any) {
		let maxY: number = xObj.maxY;
		let downNum = 0;
		let downOneTime = 150;
		while (maxY >= 0) {
			let cube: ElementCube = this._cubeMap[cx][maxY];
			this._cubeMap[cx][maxY] = undefined;
			maxY --;
			if (!cube) {
				downNum ++;
				continue;
			}
			cube.cy = cube.cy + downNum;
			this._cubeMap[cube.cx][cube.cy] = cube;
			let targetY = cube.y + downNum * Welcome.CUBE_LENGTH;
			egret.Tween.get(cube).to({x: cube.x, y: targetY}, downNum * downOneTime);
		}
		let upSize = xObj.num;
		let num = xObj.num;
		while (num > 0) {
			let cy = num - 1;
			let x = cx * Welcome.CUBE_LENGTH;
			let y = (num - upSize - 1) * Welcome.CUBE_LENGTH;
			let cube: ElementCube = this.createCube(cx, cy, x, y);
			let targetY = cy * Welcome.CUBE_LENGTH
			egret.Tween.get(cube).to({x: cube.x, y: targetY}, upSize * downOneTime);
			num --;
		}
	}

}