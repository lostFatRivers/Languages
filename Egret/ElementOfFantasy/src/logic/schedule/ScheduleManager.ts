/**
 * 游戏调度器
 */
class ScheduleManager {
	private static instance: ScheduleManager;

	private _tickables: Array<Tickable>;
	private _lastTick: number;
	private _interval: number;
	
	public static getInstance(): ScheduleManager {
        if (!this.instance) {
            this.instance = new ScheduleManager();
        }
        return this.instance;
    }

	public constructor() {
		this._interval = CONSTS.TICK_INTERVEL;
		egret.startTick(this.tick, this);
	}

	public addTickable(ta: Tickable) {
		this._tickables.push(ta);
	}

	private tick(timeStamp: number): boolean{
		if (timeStamp - this._lastTick < CONSTS.TICK_INTERVEL) {
			return;
		}
		this._lastTick = timeStamp;
		console.log(timeStamp);
		return true;
	}
	
}