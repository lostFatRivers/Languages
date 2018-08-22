class SelectRole extends eui.Component implements  eui.UIComponent {

	private confirmButton: eui.Button;
	private roleNameInput: eui.TextInput;
	private leftSlideButton: eui.Button;
	private rightSlideButton: eui.Button;

	private professionHeadGroup: eui.Group;

	private professionExplainLable: eui.Label;
	
	private currentIndex: number = 1;

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void {
		super.partAdded(partName,instance);
	}

	protected childrenCreated():void {
		super.childrenCreated();
		this.buttonTouchEventBind();
		this.changeRoleIndex(this.currentIndex);
	}

	private changeRoleIndex(index: number): void {
		let headImage = <eui.Image> this.professionHeadGroup.$children[0];
		let prosTemps = TempleteManager.getInstance().getProfessions();
		let prossesion = prosTemps[index];
		headImage.source = prossesion.profIcon;
		this.professionExplainLable.text = prossesion.profExplain;
		this.roleNameInput.text = prossesion.roleDefaultName;
		this.checkSwitchButtonValid();
	}

	private checkSwitchButtonValid(): void {
		if (this.currentIndex == 1) {
			this.leftSlideButton.visible = false;
		} else if (this.currentIndex == 4) {
			this.rightSlideButton.visible = false;
		} else {
			if (!this.leftSlideButton.visible) {
				this.leftSlideButton.visible = true;
			}
			if (!this.rightSlideButton.visible) {
				this.rightSlideButton.visible = true;
			}
		}
	}

	private buttonTouchEventBind(): void {
		this.confirmButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ev => {
			console.log("selected role profession, index:" + this.currentIndex + " name:" + this.roleNameInput.text);
			RoleManager.getInstance().createRole(this.roleNameInput.text, this.currentIndex);
			SceneManager.getInstance().toGameLevelScene();
		}, this);

		this.leftSlideButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ev => {
			this.currentIndex -= 1;
			if (this.currentIndex < 1) {
				this.currentIndex = 4;
			}
			this.changeRoleIndex(this.currentIndex);
		}, this);

		this.rightSlideButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ev => {
			this.currentIndex += 1;
			if (this.currentIndex > 4) {
				this.currentIndex = 1;
			}
			this.changeRoleIndex(this.currentIndex);
		}, this);
	}

	private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
	
}