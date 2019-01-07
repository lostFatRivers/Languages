/**
 * 英雄类
 */
class HeroModel {
	/** 英雄类型 */
	public type: HeroType;
	/** 等级 */
	private _level: number;
	/** 当前buff */
	private _buffArray: BuffModel[];

	public constructor() {
	}
}