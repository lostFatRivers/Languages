class GameOrigin extends eui.Component implements eui.UIComponent {
    private btGameStart: eui.Button;
    private btExit: eui.Button;

    private btContinue: eui.Button;

    private lbVersion: eui.Label;

    public constructor() {
        super();
        console.log("create gameorigin page");
    }

    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.btGameStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toGame, this);
        this.btExit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toExit, this);
    }

    private toGame() {
        SceneManager.getInstance().toCreateRoleScene();
    }

    private toExit() {
        console.log("Good bye...");
        window.close();
    }

}