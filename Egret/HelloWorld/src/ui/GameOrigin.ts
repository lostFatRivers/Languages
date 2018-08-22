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
        this.btContinue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toGame, this);
        this.btGameStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toCreateRole, this);
        this.btExit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toExit, this);
        let playerRole: PlayerRole = RoleManager.getInstance().getPlayerRole();
        if (playerRole == null) {
            this.btContinue.visible = false;
            this.btGameStart.visible = true;
        } else {
            this.btContinue.visible = true;
            this.btGameStart.visible = false;
        }
    }

    private toCreateRole() {
        SceneManager.getInstance().toCreateRoleScene();
    }

    private toGame() {
        SceneManager.getInstance().toGameLevelScene();
    }

    private toExit() {
        console.log("Good bye...");
        window.close();
    }

}