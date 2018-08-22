class TempleteManager {
	private static instance: TempleteManager;

	private professions: {[key: number]: ProfessionTemp};

	public constructor() {
	}

	public static getInstance(): TempleteManager {
		if (!this.instance) {
			this.instance = new TempleteManager();
		}
		return this.instance;
	}

	public templeteInit(): void {
		this.professionTempInit();
	}

	public professionTempInit() {
		this.professions = {};
		let p1: ProfessionTemp = new ProfessionTemp(1, "assassinFm_png", "headAssassinFm_png", "ASSASSIN_FM", "Samantha");
		p1.setExplain("职业: 刺客\n性别: 女\n特点: 有较高爆发和物理输出成长, 体力成长少.");
		this.professions[1] = p1;
		let p2: ProfessionTemp = new ProfessionTemp(2, "assassinM_png", "headAssassinM_png", "ASSASSIN_M", "Alex");
		p2.setExplain("职业: 刺客\n性别: 男\n特点: 有较高爆发和物理输出成长, 体力成长少.");
		this.professions[2] = p2;
		let p3: ProfessionTemp = new ProfessionTemp(3, "warMageFm_png", "headWarMageFm_png", "WAR_MAGE_FM", "Elizabeth");
		p3.setExplain("职业: 法师\n性别: 女\n特点: 魔法伤害惊人, 对于运气好的人来说再合适不过, 体力成长少.");
		this.professions[3] = p3;
		let p4: ProfessionTemp = new ProfessionTemp(4, "warMageM_png", "headWarMageM_png", "WAR_MAGE_M", "Terry");
		p4.setExplain("职业: 法师\n性别: 男\n特点: 魔法伤害惊人, 对于运气好的人来说再合适不过, 体力成长少.");
		this.professions[4] = p4;
	}

	public getProfessions(): {[key: number]: ProfessionTemp} {
		return this.professions;
	}

	public getProfessionTempByIndex(index: number): ProfessionTemp {
		return this.professions[index];
	}
}