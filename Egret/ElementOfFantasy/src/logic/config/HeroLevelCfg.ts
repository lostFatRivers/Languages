/**
 * 英雄等级配置;
 */
class HeroLevelCfg {
	/** 唯一id */
	public id: number;
	/** 英雄类型 */
	public heroType: number;
	/** 等级 */
	public level: number;
	/** 伤害 */
	public attack: number;
	/** 攻击范围 */
	public range: number;
	/** 攻击速度 */
	public speed: number;
	/** 升级到当前等级消耗 */
	public levelUpCost: IntTuple[];

	public constructor() {
	}
}