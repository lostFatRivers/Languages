class RoleManager {
	public static ROLE_KEY: string = "quest_role";

	private static instance: RoleManager;

	private playerRole: PlayerRole;

	public constructor() {
	}

	public static getInstance(): RoleManager {
		if (!this.instance) {
			this.instance = new RoleManager();
		}
		return this.instance;
	}

	public initRoleManager() {
		this.loadRoleInfo();
	}

	private loadRoleInfo() {
		let roleInfoStr: string = egret.localStorage.getItem(RoleManager.ROLE_KEY);
		console.log("role info string: ", roleInfoStr);
		if (roleInfoStr == "" || roleInfoStr == null || roleInfoStr == undefined) {
			this.playerRole = null;
		} else {
			this.playerRole = JSON.parse(roleInfoStr);
		}
	}
	
	public createRole(name: string, profIndex: number) {
		this.playerRole = new PlayerRole(name, profIndex);
		this.updateRole();
	}

	public deleteRole() {
		this.playerRole = null;
		egret.localStorage.removeItem(RoleManager.ROLE_KEY);
	}

	public updateRole() {
		let roleInfoStr = JSON.stringify(this.playerRole);
		egret.localStorage.setItem(RoleManager.ROLE_KEY, roleInfoStr);
	}

	public getPlayerRole(): PlayerRole {
		return this.playerRole;
	}
}