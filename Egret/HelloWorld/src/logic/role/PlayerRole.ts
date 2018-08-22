class PlayerRole {
	public roleName: string;
	public profIndex: number;
	public roleLevel: number;

	public weapens: PlayerWeapen[];

	public constructor(name:string, index: number) {
		this.roleName = name;
		this.profIndex = index;
		this.roleLevel = 1;
	}

	
}