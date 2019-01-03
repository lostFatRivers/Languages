class MatchThree extends eui.Component implements  eui.UIComponent {
	
	public static BOX_SIZE = 8;
	public static GEM_LENGTH = 70;
	public static GEM_TYPE_SIZE = 3;

	public gemBox: eui.Group;

	private _runTimer: egret.Timer;

	private _textureArray = [];

	private _gemBoxMap = {};
	private _gemBoxPos = [];

	/** 棋盘状态, -1:棋盘无消除, 0:初始, 1:正在消除, 2:正在落下 */
	private _gemBoxState = 0;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void {
		super.partAdded(partName,instance);
	}

	protected childrenCreated():void {
		super.childrenCreated();
		this.initGemBox();
		this.initButton();
		// this.initTicker();
	}

	private initTicker() {
        this._runTimer = new egret.Timer(500, 0);
        this._runTimer.addEventListener(egret.TimerEvent.TIMER, ev => {
            if (this._gemBoxState != 0) {
				return;
			}
			this.findThreeMatchAndDestroy();
        }, this); 
        this._runTimer.start();
    }

	private initButton() {
		let bt = this.createButton("开始");
		bt.addEventListener(egret.TouchEvent.TOUCH_TAP, ev => {
			this.findThreeMatchAndDestroy();
		}, this);
		this.addChild(bt);
	}

	/**
	 * 找到所有三个以上连接的宝石, 并销毁
	 */
	private findThreeMatchAndDestroy() {
		if (this._gemBoxState != 0) {
			return;
		}
		this._gemBoxState = 1;
		let rowMatches = this.iteraterAllRowMatch(this._gemBoxPos);
		let columeMatches = this.iteraterAllColumeMatch(this._gemBoxPos);
		if (rowMatches.length <= 0 && columeMatches.length <= 0) {
			this._gemBoxState = -1;
			return;
		}
		let xMap = {};
		let destroyArray = this.mergeRowAndColumeMatch(rowMatches, columeMatches);
		destroyArray.forEach(eo => {
			let type: number = eo["type"];
			let indexArray: Array<number> = eo["index"];
			indexArray.forEach(ei => {
				let point = this.indexToPoint(ei);
				let x = point[0];
				let y = point[1];
				if (xMap[x] == undefined) {
					xMap[x] = {maxY: 0, num: 0};
				}
				let xObj = xMap[x];
				if (xObj.maxY < y) {
					xObj.maxY = y;
				}
				xObj.num += 1;
				let gem: ElementGem = this._gemBoxMap[x][y];
				this.gemBox.removeChild(gem);
				this._gemBoxMap[x][y] = undefined;
				this._gemBoxPos[x][y] = -1;
			});
		});
		this._gemBoxState = 2;
		for (let cx in xMap) {
			let xObj = xMap[cx];
			this.dropDownNewGem(parseInt(cx), xObj);
		}
		this._gemBoxState = 0;
		console.log("all done.");
	}

	private async dropDownNewGem(cx: number, xObj: any) {
		let maxY: number = xObj.maxY;
		let downNum = 0;
		let downOneTime = 100;
		while (maxY >= 0) {
			let gem: ElementGem = this._gemBoxMap[cx][maxY];
			this._gemBoxMap[cx][maxY] = undefined;
			maxY --;
			if (!gem) {
				downNum ++;
				continue;
			}
			gem.cy = gem.cy + downNum;
			this._gemBoxMap[gem.cx][gem.cy] = gem;
			this._gemBoxPos[gem.cx][gem.cy] = gem.gemType;
			let targetY = gem.y + downNum * MatchThree.GEM_LENGTH;
			await this.gemDropTween(gem, targetY, downNum * downOneTime)
		}
		console.log("drop x:", cx);
		let upSize = xObj.num;
		let num = xObj.num;
		while (num > 0) {
			let cy = num - 1;
			let x = cx * MatchThree.GEM_LENGTH;
			let y = (num - upSize - 1) * MatchThree.GEM_LENGTH;
			let gem: ElementGem = this.createGem(cx, cy, x, y);
			let targetY = cy * MatchThree.GEM_LENGTH
			await this.gemDropTween(gem, targetY, upSize * downOneTime);
			num --;
		}
		console.log("full x:", cx);
	}

	private gemDropTween(gem: ElementGem, targetY: number, dropTime: number): Promise<boolean> {
		return new Promise((resolve, reject) => {
			egret.Tween.get(gem).to({x: gem.x, y: targetY}, dropTime).call(() => { 
				resolve(true);
			});
		});
	}

	private initGemBox() {
		let size = MatchThree.BOX_SIZE;
		let cubeLength = MatchThree.GEM_LENGTH;
		let sourceSize = MatchThree.GEM_TYPE_SIZE;
		for (let i = 1; i <= sourceSize; i++) {
			this._textureArray.push(RES.getRes("gem" + i + "_png"))
		}
		for (let i = 0; i < size * size; i++) {
			let cx = i == 0 ? 0 : Math.floor(i / size);
			let cy = i % size;
			let x = cx * cubeLength;
			let y = cy * cubeLength;
			this.createGem(cx, cy, x, y);
		}
		this.gemBox.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.gemBox.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
	}

	private touchBegin(ev: egret.TouchEvent) {

	}

	private touchEnd(ev: egret.TouchEvent) {
		
	}

	private createGem(cx: number, cy: number, x: number, y: number): ElementGem {
		let sourceSize = MatchThree.GEM_TYPE_SIZE;
		let textureIndex = Math.floor(Math.random() * 100) % sourceSize
		let cube: ElementGem = new ElementGem(this._textureArray[textureIndex], cx, cy, textureIndex);
		if (!this._gemBoxPos[cx]) {
			this._gemBoxPos[cx] = [];
			this._gemBoxMap[cx] = {};
		}
		this._gemBoxPos[cx][cy] = textureIndex;
		this._gemBoxMap[cx][cy] = cube;
		cube.x = x;
		cube.y = y;
		this.gemBox.addChild(cube);
		return cube;
	}
	
	private createButton(text: string): eui.Button {
        let btn1 = new eui.Button();
        btn1.label = text;
        btn1.width = 100;
        btn1.height = 60;
        btn1.x = 320;
        btn1.y = 1000;
        btn1.anchorOffsetX = 50;
        btn1.anchorOffsetY = 50;
        return btn1;
    }

	/**
	 * 找出所有行中可三消的组;
	 */
	private iteraterAllRowMatch(box) {
		let gemMatches = [];
		for (let i = 0; i < MatchThree.BOX_SIZE; i++) {
			let eachRow = this.findRowThreeMatch(i, box);
			eachRow.forEach(value => {
				value["index"] = value["index"].map(va => va + i * MatchThree.BOX_SIZE);
				gemMatches.push(value);
			});
		}
		return gemMatches;
	}

	/**
	 * 按行查找宝石地图中可3消的索引;
	 * 
	 * @param {number} row 行号,范围: [0, BOX_SIZE)
	 * @param {[]} box 宝石地图;
	 */
	private findRowThreeMatch(row, box) {
		if (row < 0 && row > MatchThree.BOX_SIZE - 1) {
			return [];
		}
		let boxRow = box[row];
		return this.iteraterTypeList(boxRow);
	}

	/**
	 * 遍历类型列表, 找出可3消的组;
	 */
	private iteraterTypeList(typeList) {
		let gemMatches = [];
		let lastType = -1;
		let matchNumber = 0;
		let matchIndex = [];
		typeList.forEach((value, index) => {
			if (lastType == -1) {
				lastType = value;
				matchNumber = 1;
				matchIndex.push(index);
				return;
			}
			if (lastType == value) {
				matchNumber++;
				matchIndex.push(index);
				if (index >= MatchThree.BOX_SIZE - 1 && matchNumber >= 3) {
					gemMatches.push({"type": lastType, "index": matchIndex});
				}
			} else {
				if (matchNumber >= 3) {
					gemMatches.push({"type": lastType, "index": matchIndex});
				}
				lastType = value;
				matchNumber = 1;
				matchIndex = [index];
			}
		});
		return gemMatches;
	}

	/**
	 * 找出所有列中可三消的组;
	 * 
	 * @param {[]} box 宝石地图;
	 */
	private iteraterAllColumeMatch(box) {
		let gemMatches = [];
		for (let i = 0; i < MatchThree.BOX_SIZE; i++) {
			let eachRow = this.findColumeThreeMatch(i, box);
			eachRow.forEach(value => {
				value["index"] = value["index"].map(va => va * MatchThree.BOX_SIZE + i);
				gemMatches.push(value);
			});
		}
		return gemMatches;
	}

	/**
	 * 按列查找宝石地图中可3消的索引;
	 * 
	 * @param {number} colume 列号,范围: [0, BOX_SIZE)
	 * @param {[]} box 宝石地图;
	 */
	private findColumeThreeMatch(colume, box) {
		if (colume < 0 && colume > MatchThree.BOX_SIZE - 1) {
			return [];
		}
		let boxColume = [];
		box.forEach(value => {
			boxColume.push(value[colume]);
		});
		return this.iteraterTypeList(boxColume);
	}

	/**
	 * 合并行列, 得到最终所有可三消的列表;
	 * 
	 * @param {object} rowMatches 行相连可三消的列表;
	 * @param {object} columeMatches 列相连可三消的列表;
	 */
	private mergeRowAndColumeMatch(rowMatches, columeMatches) {
		// 将行列相交的消除块合并;
		let mergedMathes = [];
		let mergedColumes = [];
		rowMatches.forEach(rowVal => {
			let type = rowVal["type"];
			let eachMerge = {"type": type, "index": []};
			eachMerge["index"] = this.unique(eachMerge["index"].concat(rowVal["index"]));
			rowVal["index"].forEach(inVal => {
				for (let i = 0; i < columeMatches.length; i++) {
					if (columeMatches[i]["index"].indexOf(inVal) > -1) {
						mergedColumes.push(i);
						eachMerge["index"] = this.unique(eachMerge["index"].concat(columeMatches[i]["index"]));
						continue;
					}
				}
			});
			mergedMathes.push(eachMerge);
		});
		columeMatches.forEach((colVal, colIndex) => {
			if (mergedColumes.indexOf(colIndex) > -1) {
				return;
			}
			mergedMathes.push(colVal);
		});
		// 检查是否有重复的相连消除块;
		let secondMerges = [];
		mergedMathes.forEach(value => {
			let isMerged = false;
			secondMerges.forEach(value2 => {
				if (value2["index"].some(value3 => value["index"].indexOf(value3) > -1)) {
					value2["index"] = this.unique(value2["index"].concat(value["index"]));
					isMerged = true;
				}
			});
			if (!isMerged) {
				secondMerges.push(value);
			}
		}); 
		return secondMerges;
	}

	/**
	 * 列表去重;
	 * 
	 * @param {[]} arr 数组;
	 */
	private unique(arr){
		return arr.filter((item, index, array) => array.indexOf(item) === index);
	}

	private indexToPoint(index: number) {
		if (index < 0 || index > MatchThree.BOX_SIZE * MatchThree.BOX_SIZE - 1) {
			return [];
		}
		let i = Math.floor(index / MatchThree.BOX_SIZE);
		let j = index - i * MatchThree.BOX_SIZE;
		return [i, j];
	}
}