/**
 * 创建角色时, 选择的职业数据;
 */
class ProfessionTemp {
	public profIndex: number;
	public profIcon: string;
	public profMiniIcon: string;
	public profType: string;
	public profExplain: string;
	public roleDefaultName: string;

	public constructor(index: number, icon: string, miniIcon: string, type: string, defaultName: string) {
		this.profIndex = index;
		this.profIcon = icon;
		this.profMiniIcon = miniIcon;
		this.profType = type;
		this.roleDefaultName = defaultName;
	}

	public setExplain(explain: string) {
		this.profExplain = explain;
	}
}