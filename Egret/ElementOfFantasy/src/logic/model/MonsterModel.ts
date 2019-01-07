/**
 * 怪物类
 */
class MonsterModel {
	public id: number;
	public health: number;
	/** 身上挂的buff */
	private _buffArray: BuffModel[];
	/** 当前位置 */
	private _pos: Point;

	public constructor() {
	}
}