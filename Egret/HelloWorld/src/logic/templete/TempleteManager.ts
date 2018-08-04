class TempleteManager {
	private static instance: TempleteManager;

	private professions: {[key: number]: ProfessionTemp};

	public constructor() {
		this.templeteInit();
	}

	public static getInstance(): TempleteManager {
		if (this.instance) {
			this.instance = new TempleteManager();
		}
		return this.instance;
	}

	private templeteInit(): void {
		this.professionTempInit();
	}

	public professionTempInit() {
		this.professions = {};
		let p1: ProfessionTemp = new ProfessionTemp(1, "assassinFm_png", "ASSASSIN_FM", "Samantha");
		p1.setExplain("");
		this.professions[1] = p1;
		this.professions[2] = new ProfessionTemp(2, "assassinM_png", "ASSASSIN_M", "Alex");
		this.professions[3] = new ProfessionTemp(3, "warMageFm_png", "WAR_MAGE_FM", "Elizabeth");
		this.professions[4] = new ProfessionTemp(4, "warMageM_png", "WAR_MAGE_M", "Terry");
	}

	public getProfessions(): {[key: number]: ProfessionTemp} {
		return this.professions;
	}

	public getProfessionTempByIndex(index: number): ProfessionTemp {
		return this.professions[index];
	}
}