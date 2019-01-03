class GameResult extends eui.Component implements  eui.UIComponent {
	public resultText: eui.Label;
	public rewardText: eui.Label;
	public confirm: eui.Button;

	private _showText: string;
	private _showReward: string;

	public constructor(text: string, reward: string) {
		super();
		this._showText = text;
		this._showReward = reward;
	}

	protected partAdded(partName:string,instance:any):void {
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void {
		super.childrenCreated();
		this.resultText.text = this._showText;
		this.rewardText.text = this._showReward;
		
		this.confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, ev => {
			let parent = this.parent;
            if (parent) {
                parent.removeChild(this);
            }
		}, this);
	}
	
}