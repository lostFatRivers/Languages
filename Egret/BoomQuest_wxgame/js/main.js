var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        // 压入后台时, 暂停所有
        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }
        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // }
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        SceneManager.getInstance().setRootStage(this);
        SceneManager.getInstance().toWelcomeScene();
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else if (typeof generateJSON !== 'undefined') {
            if (url.indexOf(".exml") > -1) {
                var dataPath = url.split("/");
                dataPath.pop();
                var dirPath = dataPath.join("/") + "_EUI.json";
                if (!generateJSON.paths[url]) {
                    RES.getResByUrl(dirPath, function (data) {
                        window["JSONParseClass"]["setData"](data);
                        egret.callLater(function () {
                            onSuccess.call(thisObject, generateJSON.paths[url]);
                        }, _this);
                    }, this, RES.ResourceItem.TYPE_JSON);
                }
                else {
                    egret.callLater(function () {
                        onSuccess.call(thisObject, generateJSON.paths[url]);
                    }, this);
                }
            }
            else {
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateJSON);
                }, this);
            }
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var MyTools = (function () {
    function MyTools() {
    }
    /**
     * 给 DisplayObject 添加鼠标拖拽移动;
     */
    MyTools.addTouchMoveListener = function (disObj) {
        var _this = this;
        if (!disObj.parent) {
            console.log("no parent cannot add touch");
            return;
        }
        var offsetX;
        var offsetY;
        disObj.touchEnabled = true;
        var onMove = function (em) {
            disObj.x = em.stageX - offsetX;
            disObj.y = em.stageY - offsetY;
        };
        disObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (eb) {
            offsetX = eb.stageX - disObj.x;
            offsetY = eb.stageY - disObj.y;
            disObj.parent.addEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, _this);
        }, this);
        disObj.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
            disObj.parent.removeEventListener(egret.TouchEvent.TOUCH_MOVE, onMove, _this);
        }, this);
    };
    return MyTools;
}());
__reflect(MyTools.prototype, "MyTools");
var SceneManager = (function () {
    function SceneManager() {
    }
    SceneManager.getInstance = function () {
        if (!this.instance) {
            this.instance = new SceneManager();
        }
        return this.instance;
    };
    SceneManager.prototype.setRootStage = function (stage) {
        this.rootStage = stage;
    };
    SceneManager.prototype.toWelcomeScene = function () {
        this.toTargetScene(new Welcome());
    };
    SceneManager.prototype.toTargetScene = function (targetScene) {
        if (targetScene.parent) {
            return;
        }
        this.rootStage.addChild(targetScene);
        if (this.currentScene) {
            this.rootStage.removeChild(this.currentScene);
        }
        this.currentScene = targetScene;
    };
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
var ElementCube = (function (_super) {
    __extends(ElementCube, _super);
    function ElementCube(cubeTexture, cx, cy, color) {
        var _this = _super.call(this) || this;
        _this.texture = cubeTexture;
        _this.cx = cx;
        _this.cy = cy;
        _this.colorIndex = color;
        return _this;
    }
    ElementCube.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ElementCube.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.cubeImage.texture = this.texture;
    };
    return ElementCube;
}(eui.Component));
__reflect(ElementCube.prototype, "ElementCube", ["eui.UIComponent", "egret.DisplayObject"]);
var LipstickShoot = (function (_super) {
    __extends(LipstickShoot, _super);
    function LipstickShoot() {
        var _this = _super.call(this) || this;
        _this.inFly = false;
        _this._knifeRotaArray = [];
        return _this;
    }
    LipstickShoot.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    LipstickShoot.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.initShootTarget();
    };
    LipstickShoot.prototype.initShootTarget = function () {
        var target = new egret.Bitmap();
        target.texture = RES.getRes("bigCircle_png");
        target.width = LipstickShoot.CONS.circleRadius;
        target.height = LipstickShoot.CONS.circleRadius;
        target.x = 0;
        target.y = 0;
        this.targetGroup.addChild(target);
        this.randomTarget();
        var knife = this.createKnife();
        this.knifeGroup.addChildAt(knife, 1);
        this.addShootEventListener(knife);
    };
    LipstickShoot.prototype.randomTarget = function () {
        var _this = this;
        var randAngle = Math.ceil(Math.random() * LipstickShoot.CONS.randAngleBase) + LipstickShoot.CONS.randAngleFloor;
        if (Math.random() > 0.5) {
            randAngle = 0 - randAngle;
        }
        var randTime = Math.ceil(Math.random() * LipstickShoot.CONS.randTimeBase) + LipstickShoot.CONS.randTimeFloor;
        this._runTween = egret.Tween.get(this.targetGroup).to({ rotation: randAngle }, randTime, egret.Ease.quadIn).call(function () { return _this.randomTarget(); });
    };
    LipstickShoot.prototype.addShootEventListener = function (knife) {
        var _this = this;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (ev) {
            if (_this.inFly) {
                return;
            }
            _this.inFly = true;
            var nk = _this.createKnife();
            _this.knifeGroup.addChildAt(nk, 1);
            knife.visible = false;
            egret.Tween.get(nk).to({ y: LipstickShoot.CONS.knifeTargetY }, LipstickShoot.CONS.knifeFlyTime, egret.Ease.cubicIn).call(function () {
                knife.visible = true;
                _this.inFly = false;
                var rota = _this.transRota(_this.targetGroup.rotation);
                var isLossed = false;
                for (var i = -8; i <= 8; i++) {
                    var rangeRota = rota + i;
                    if (rangeRota < 0) {
                        rangeRota += 360;
                    }
                    if (rangeRota >= 360) {
                        rangeRota -= 360;
                    }
                    if (_this._knifeRotaArray.indexOf(rangeRota) >= 0) {
                        console.log("have rota:", rota);
                        isLossed = true;
                        break;
                    }
                }
                if (isLossed) {
                    egret.Tween.get(nk).to({ x: 120, y: LipstickShoot.CONS.knifeTargetY + 220, rotation: 136 }, LipstickShoot.CONS.knifeFlyTime, egret.Ease.bounceIn);
                }
                else {
                    console.log("no before rota:", rota);
                    _this._knifeRotaArray.push(rota);
                    _this.knifeGroup.removeChild(nk);
                    var radian = rota * 2 * Math.PI / LipstickShoot.CONS.fullAngle;
                    var line = LipstickShoot.CONS.knifeTargetY - LipstickShoot.CONS.circleCenterY;
                    var x = LipstickShoot.CONS.circleRadius / 2 + Math.floor(line * Math.sin(radian));
                    var y = LipstickShoot.CONS.circleRadius / 2 + Math.floor(line * Math.cos(radian));
                    nk.x = x;
                    nk.y = y;
                    nk.rotation = 0 - _this.targetGroup.rotation;
                    _this.targetGroup.addChildAt(nk, 0);
                }
            });
        }, this);
    };
    LipstickShoot.prototype.transRota = function (rotation) {
        var rota = Math.floor(rotation);
        if (rota < 0) {
            rota += LipstickShoot.CONS.fullAngle;
        }
        return rota;
    };
    LipstickShoot.prototype.createKnife = function () {
        var knife = new egret.Bitmap();
        knife.texture = RES.getRes("knife_png");
        knife.width = LipstickShoot.CONS.knifeWidth;
        knife.height = LipstickShoot.CONS.knifeHeight;
        knife.x = LipstickShoot.CONS.knifeX;
        knife.y = LipstickShoot.CONS.knifeY;
        knife.anchorOffsetX = LipstickShoot.CONS.knifeWidth / 2;
        return knife;
    };
    LipstickShoot._radius = 105;
    /** 常量 */
    LipstickShoot.CONS = {
        /** 圆桶直径 */
        circleRadius: 300,
        /** 圆中心点y值 */
        circleCenterY: 315,
        /** 随机角度底数 */
        randAngleBase: 360,
        /** 随机角度最小值 */
        randAngleFloor: 120,
        /** 随机时间底数 */
        randTimeBase: 2500,
        /** 随机时间最小值 */
        randTimeFloor: 600,
        /** 飞刀终点y值 */
        knifeTargetY: 420,
        /** 飞刀飞行时间 */
        knifeFlyTime: 150,
        /** 圆周角 */
        fullAngle: 360,
        /** 飞刀宽度 */
        knifeWidth: 50,
        /** 飞刀长度 */
        knifeHeight: 120,
        knifeX: 320,
        knifeY: 670,
    };
    return LipstickShoot;
}(eui.Component));
__reflect(LipstickShoot.prototype, "LipstickShoot", ["eui.UIComponent", "egret.DisplayObject"]);
var Welcome = (function (_super) {
    __extends(Welcome, _super);
    function Welcome() {
        var _this = _super.call(this) || this;
        _this._textureArray = [];
        _this._canTouch = true;
        _this._tickTime = 0;
        _this._tickable = true;
        _this._cubeMap = {};
        console.log("welcome to BoomQuest!");
        return _this;
    }
    Welcome.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Welcome.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.touchCircle();
        this.initCubeBox();
    };
    Welcome.prototype.touchCircle = function () {
        var _this = this;
        var person = new egret.Bitmap();
        person.texture = RES.getRes("p0" + 1 + "_png");
        person.width *= 2;
        person.height *= 2;
        person.x = 70;
        person.y = 930;
        // 添加人物动画
        var picIndex = 1;
        var personRun = function (ts) {
            if (!_this._tickable) {
                return;
            }
            if ((ts - _this._tickTime) < 200) {
                return false;
            }
            _this._tickTime = ts;
            var pn = picIndex % 4 + 1;
            person.texture = RES.getRes("p0" + pn + "_png");
            picIndex++;
            return true;
        };
        var changeStage = function () {
            if (_this._tickable) {
                _this.btChangeState.label = "停止";
            }
            else {
                _this.btChangeState.label = "行动";
            }
        };
        changeStage();
        // 添加按钮控制
        this.btChangeState.addEventListener(egret.TouchEvent.TOUCH_TAP, function (ev) {
            _this._tickable = !_this._tickable;
            changeStage();
        }, this);
        egret.startTick(personRun, this);
        this.addChild(person);
        this.btSwitchGame.addEventListener(egret.TouchEvent.TOUCH_TAP, function (ev) {
            if (_this._lipst == undefined) {
                _this._lipst = new LipstickShoot();
                _this._lipst.x = 0;
                _this._lipst.y = 0;
                _this.addChild(_this._lipst);
            }
            else {
                _this.removeChild(_this._lipst);
                _this._lipst = undefined;
            }
        }, this);
    };
    Welcome.prototype.initCubeBox = function () {
        var size = Welcome.CUBE_BOX_SIZE;
        var cubeLength = Welcome.CUBE_LENGTH;
        var sourceSize = Welcome.CUBE_TYPE_SIZE;
        for (var i = 1; i <= sourceSize; i++) {
            this._textureArray.push(RES.getRes("img_Cube" + i + "_png"));
        }
        for (var i = 0; i < size * size; i++) {
            var cx = i == 0 ? 0 : Math.floor(i / size);
            var cy = i % size;
            var x = cx * cubeLength;
            var y = cy * cubeLength;
            this.createCube(cx, cy, x, y);
        }
    };
    Welcome.prototype.createCube = function (cx, cy, x, y) {
        var _this = this;
        var sourceSize = Welcome.CUBE_TYPE_SIZE;
        var textureIndex = Math.floor(Math.random() * 100) % sourceSize;
        var cube = new ElementCube(this._textureArray[textureIndex], cx, cy, textureIndex);
        if (!this._cubeMap[cx]) {
            this._cubeMap[cx] = {};
        }
        this._cubeMap[cx][cy] = cube;
        cube.x = x;
        cube.y = y;
        this.cubeBox.addChild(cube);
        cube.addEventListener(egret.TouchEvent.TOUCH_TAP, function (ev) {
            _this.onCubeClicked(cube);
        }, this);
        return cube;
    };
    Welcome.prototype.onCubeClicked = function (cube) {
        var destroyArray = [];
        this.findAllDestroy(cube, destroyArray);
        if (destroyArray.length <= 1) {
            return;
        }
        var colMap = {};
        for (var _i = 0, destroyArray_1 = destroyArray; _i < destroyArray_1.length; _i++) {
            var eachDestroy = destroyArray_1[_i];
            this.cubeBox.removeChild(eachDestroy);
            this._cubeMap[eachDestroy.cx][eachDestroy.cy] = undefined;
            if (colMap[eachDestroy.cx] == undefined) {
                colMap[eachDestroy.cx] = { maxY: 0, num: 0 };
            }
            var xObj = colMap[eachDestroy.cx];
            if (xObj.maxY < eachDestroy.cy) {
                xObj.maxY = eachDestroy.cy;
            }
            xObj.num += 1;
        }
        for (var cx in colMap) {
            var xObj = colMap[cx];
            this.onCubeDestroy(parseInt(cx), xObj);
        }
    };
    Welcome.prototype.compareAndAdd = function (c, o, arr) {
        if (c != undefined && arr.indexOf(c) < 0 && c.colorIndex == o.colorIndex) {
            this.findAllDestroy(c, arr);
        }
    };
    Welcome.prototype.findAllDestroy = function (cube, arr) {
        if (arr.indexOf(cube) >= 0) {
            return;
        }
        arr.push(cube);
        var cx = cube.cx;
        var cy = cube.cy;
        // left
        var leftCx = cx - 1;
        if (leftCx >= 0) {
            this.compareAndAdd(this._cubeMap[leftCx][cy], cube, arr);
        }
        // top
        var topCy = cy - 1;
        if (topCy >= 0) {
            this.compareAndAdd(this._cubeMap[cx][topCy], cube, arr);
        }
        // right
        var rightCx = cx + 1;
        if (rightCx < Welcome.CUBE_BOX_SIZE) {
            this.compareAndAdd(this._cubeMap[rightCx][cy], cube, arr);
        }
        // bottom
        var bottomCy = cy + 1;
        if (bottomCy < Welcome.CUBE_BOX_SIZE) {
            this.compareAndAdd(this._cubeMap[cx][bottomCy], cube, arr);
        }
    };
    Welcome.prototype.onCubeDestroy = function (cx, xObj) {
        var maxY = xObj.maxY;
        var downNum = 0;
        var downOneTime = 150;
        while (maxY >= 0) {
            var cube = this._cubeMap[cx][maxY];
            this._cubeMap[cx][maxY] = undefined;
            maxY--;
            if (!cube) {
                downNum++;
                continue;
            }
            cube.cy = cube.cy + downNum;
            this._cubeMap[cube.cx][cube.cy] = cube;
            var targetY = cube.y + downNum * Welcome.CUBE_LENGTH;
            egret.Tween.get(cube).to({ x: cube.x, y: targetY }, downNum * downOneTime);
        }
        var upSize = xObj.num;
        var num = xObj.num;
        while (num > 0) {
            var cy = num - 1;
            var x = cx * Welcome.CUBE_LENGTH;
            var y = (num - upSize - 1) * Welcome.CUBE_LENGTH;
            var cube = this.createCube(cx, cy, x, y);
            var targetY = cy * Welcome.CUBE_LENGTH;
            egret.Tween.get(cube).to({ x: cube.x, y: targetY }, upSize * downOneTime);
            num--;
        }
    };
    Welcome.CUBE_BOX_SIZE = 8;
    Welcome.CUBE_LENGTH = 75;
    Welcome.CUBE_TYPE_SIZE = 6;
    return Welcome;
}(eui.Component));
__reflect(Welcome.prototype, "Welcome", ["eui.UIComponent", "egret.DisplayObject"]);

;window.Main = Main;