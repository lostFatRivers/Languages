class MyTools {

    /**
     * 给 DisplayObject 添加鼠标拖拽移动;
     */
    public static addTouchMoveListener(disObj: egret.DisplayObject) {
        if (!disObj.parent) {
            console.log("no parent cannot add touch");
            return;
        }
		let offsetX: number;
		let offsetY: number;

		disObj.touchEnabled = true;

		let onMove = em => {
			disObj.x = em.stageX - offsetX;
			disObj.y = em.stageY - offsetY;
		};

		disObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, eb => {
			offsetX = eb.stageX - disObj.x;
			offsetY = eb.stageY - disObj.y;
			disObj.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
		}, this);

		disObj.addEventListener(egret.TouchEvent.TOUCH_END, e => {
			disObj.parent.removeEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, this);
		}, this);
	}
}