/**
 * 英雄类型枚举
 */
enum HeroType {
	/** 剑士 */
	SWORD,
	/** 弓箭手 */
	ARCHER,
	/** 火法师 */
	FIRE_MAGE,
	/** 水法师 */
	WATER_MAGE,
	/** 雷法师 */
	THUNDER_MAGE,
	/** 风法师 */
	WIND_MAGE,
	/** 冰法师 */
	ICE_MAGE,
	/** 瘟疫法师 */
	PLAGUE_MAGE,
	/** 神圣法师 */
	DIVINE_MAGE
}

/**
 * 伤害类型
 */
enum DamageType {
	/** 物理伤害 */
	PHYSICS,
	/** 魔法伤害 */
	MAGIC,
	/** 神圣伤害 */
	PURE
}

enum BuffType {
	/** 灼烧buff */
	FIRING,
	/** 减防buff */
	DECREASE_DEFENSE,
	/** 眩晕buff */
	DIZZINESS,
	/** 麻痹buff */
	PARALYSIS,
	/** 腐蚀buff */
	EROSION,
	/** 迟缓buff */
	SLOWNESS,
	/** 冰冻buff */
	FROZEN
}

class CONSTS {
	public static TICK_INTERVEL: number = 1000;
}