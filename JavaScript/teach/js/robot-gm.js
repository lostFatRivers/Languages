const Constants = {
    /** 登录 */ 
    CS_LOGIN: 1001,
    /** 登录反馈 */ 
    SC_LOGIN: 1002,
    /** 设置范围 */ 
    CS_SET_AREA: 1003,
    /** 设置范围反馈 */
    SC_SET_AREA: 1004,
    /** 发送聊天消息 */
    CS_CHAT_MSG: 1005,
    /** 接收聊天消息 */
    SC_CHAT_MSG: 1006
}

class Robot {
    constructor(id, puid, name, age, sex, city, profile) {
        this.id = id;
        this.puid = puid;
        this.simpleName = name;
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.city = city;
        this.profile = profile;
        this.chats = [];
        this.curChat = null;
        this.refresh();
    }

    refresh() {
        this.refreshTime = new Date().getTime();
    }
}

class RobotChat {
    constructor(id, name, age, sex) {
        this.friendId = id;
        this.friendName = name;
        this.age = age;
        this.sex = sex;
        // 已读条数
        this.readNum = 0;
        this.chatContent = [];
    }
}

class ChatContent {
    constructor(id, chat) {
        this.id = id;
        this.chat = chat;
    }
}

let robotBar = {
    props: ['activeId', 'robot'],
    template: '#temp-robot-bar',
    computed: {
        hasNewMessage() {
            for (let eachChat of this.robot.chats) {
                let notReadNum = eachChat.chatContent.filter(ec => ec.id == eachChat.friendId).length - eachChat.readNum;
                if (notReadNum > 0) {
                    return true;
                }
            }
            return false;
        },
        robotIcon() {
            return {
                backgroundImage: "url('./static/img/robotIcon" + this.robot.sex + ".png')"
            };
        }
    }
};

let robotChatBar = {
    props: ['activeId', 'chat'],
    template: '#temp-robot-chat-bar',
    computed: {
        notReadNum() {
            if (this.chat.friendId == this.activeId) {
                this.chat.readNum = this.chat.chatContent.filter(ec => ec.id == this.chat.friendId).length;
            }
            return this.chat.chatContent.filter(ec => ec.id == this.chat.friendId).length - this.chat.readNum;
        },
        friendIcon() {
            return {
                backgroundImage: "url('./static/img/friendIcon" + this.chat.sex + ".png')"
            };
        }
    }
};

let chatBubble = {
    props: ['bubble', 'friend', 'robotsex', 'friendsex'],
    template: '#temp-chat-bubble',
    data() {
        return {
            iconSwitch: {
                float: this.bubble.id == this.friend ? 'left' : 'right',
                marginLeft: this.bubble.id == this.friend ? '20px' : '0px',
                marginRight: this.bubble.id == this.friend ? '0px' : '20px',
            },
            iconBgSwitch: {
                backgroundImage: "url('./static/img/" + (this.bubble.id == this.friend ? 'friendIcon' : 'robotIcon') + (this.bubble.id == this.friend ? this.friendsex : this.robotsex) + ".png')"
            }
        }
    },
    watch: {
        robotsex() {
            this.iconBgSwitch = {
                backgroundImage: "url('./static/img/" + (this.bubble.id == this.friend ? 'friendIcon' : 'robotIcon') + (this.bubble.id == this.friend ? this.friendsex : this.robotsex) + ".png')"
            }
        },
        friendsex() {
            this.iconBgSwitch = {
                backgroundImage: "url('./static/img/" + (this.bubble.id == this.friend ? 'friendIcon' : 'robotIcon') + (this.bubble.id == this.friend ? this.friendsex : this.robotsex) + ".png')"
            }
        }
    }
}

let vm = new Vue({
    el: "#app",
    data: {
        minId: -1,
        maxId: -1,
        robotArray: [
        ],
        curRobot: undefined,
        isLogin: false,
        editContent: "",
        loginSecret: '',
        minRobotId: 0,
        maxRobotId: 0,
        wsAddress: 'ws://192.168.1.192:10800/websocket',
        websocketConn: null,
        connectStatus: ""
    },
    created() {
        this.initData();
    },
    components: {
        'robot-bar': robotBar,
        'robot-chat-bar': robotChatBar,
        'chat-bubble': chatBubble
    },
    methods: {
        setupLoginAddress() {
            let value = prompt("设置登录服地址, 例如: 127.0.0.1:8080");
            if (value == null || value.trim() == '') {
                alert('输入有误, 请重新输入.');
                return;
            }
            this.connectStatus = "正在重新连接..."
            this.wsAddress = 'ws://' + value.trim() + '/websocket';
            this.initData();
        },
        loginRobotConsole() {
            let secretStr = this.loginSecret;
            this.sendMessage(JSON.stringify({type: Constants.CS_LOGIN, secret: secretStr}));
        },
        setupRobotArea() {
            let value = prompt("选取机器人范围, 中间用 ',' 隔开 :").trim();
            if (value == '' || value.split(',').length != 2) {
                alert('输入有误, 请重新输入.');
                return;
            }
            let valSplit = value.split(',');
            this.minRobotId = parseInt(valSplit[0]);
            this.maxRobotId = parseInt(valSplit[1]);
            if (this.minRobotId >= this.maxRobotId) {
                this.minRobotId = 0;
                this.maxRobotId = 0;
                alert('输入有误, 请重新输入.');
                return;
            }
            this.sendMessage(JSON.stringify({
                type: Constants.CS_SET_AREA,
                secret: this.loginSecret,
                minId: this.minRobotId,
                maxId: this.maxRobotId
            }));
        },
        keyupHandler(ev) {
            if (ev.keyCode == 13) {
                if (ev.ctrlKey) {
                    this.editContent += "\n";
                } else {
                    this.shootMessage();
                }
            } 
        },
        shootMessage() {
            if (!this.curRobot || !this.curRobot.curChat || this.editContent.trim() === '') {
                this.editContent = "";
                return;
            }
            let shootChat = this.editContent.trim();
            this.curRobot.curChat.chatContent.push(new ChatContent(this.curRobot.id, shootChat));
            this.sendMessage(JSON.stringify({
                type: Constants.CS_CHAT_MSG,
                robotId: this.curRobot.id,
                robotPuid: this.curRobot.puid,
                friendId: this.curRobot.curChat.friendId,
                content: shootChat
            }));
            this.editContent = "";
            this.chatScrollTop();
        },
        selectRobot(robotId) {
            this.curRobot = this.robotArray.find(va => va.id === robotId);
            this.chatScrollTop();
        },
        selectChat(chatId) {
            this.curRobot.curChat = this.curRobot.chats.find(va => va.friendId === chatId);
            this.curRobot.curChat.readNum = this.curRobot.curChat.chatContent.filter(ec => ec.id == this.curRobot.curChat.friendId).length;
            this.chatScrollTop();
        },
        initData() {
            if (!WebSocket) {
                alert("浏览器版本太低, 请换个浏览器重新打开.");
                return;
            }
            this.websocketConn = new WebSocket(this.wsAddress);
            this.websocketConn.onopen = ev => {
                this.connectStatus = "已连接...";
            };
            this.websocketConn.onmessage = ev => {
                this.messageHandler(ev.data);
            };
            this.websocketConn.onclose = ev => {
                this.isLogin = false;
                this.connectStatus = "已断开...";
            }
        },
        sendMessage(jsonStr) {
            if (this.websocketConn.readyState != 1) {
                return;
            }
            this.websocketConn.send(jsonStr);
            console.log('send msg', jsonStr);
        },
        messageHandler(receiveData) {
            let msg = JSON.parse(receiveData);
            console.log('receive msg', receiveData);
            if (msg.type == Constants.SC_LOGIN) {           // 登录反馈
                let status = msg.status;
                if (status == "SUCCESS") {
                    this.connectStatus = "已登录...";
                    this.isLogin = true;
                } else {
                    this.connectStatus = "登录失败...";
                    this.loginSecret="";
                }
            } else if (msg.type == Constants.SC_SET_AREA) { // 设置范围反馈
                let status = msg.status;
                if (status == "SUCCESS") {
                    this.assembleRobotData(msg.robotData.robot);
                } else {
                    alert("范围选取失败");
                    this.minRobotId = 0;
                    this.maxRobotId = 0;
                }
            } else if (msg.type == Constants.SC_CHAT_MSG) { // 收到消息
                let newMsg = msg.newChat;
                let robotId = newMsg.selfId;
                let robot = this.robotArray.find(va => va.puid === robotId);
                if (!robot) {
                    console.log("no such robot data: ", robotId);
                    return;
                }
                let friendId = newMsg.friendId;
                let friendName = newMsg.friendName;
                let age = newMsg.age;
                let sex = newMsg.sex;
                let chatArr = newMsg.chatContent;
                let friend = robot.chats.find(va => va.friendId === friendId);
                if (!friend) {
                    friend = new RobotChat(friendId, friendName, age, sex);
                    robot.chats.push(friend);
                }
                if (!robot.curChat) {
                    robot.curChat = friend;
                }
                for (let ecc of chatArr) {
                    let chatC = new ChatContent(ecc.id, ecc.chat)
                    friend.chatContent.push(chatC);
                }
                robot.refresh();
                this.sortRobotArray();
                this.chatScrollTop();
            }
        },
        chatScrollTop() {
            Vue.nextTick(() => {
                let editerDom = document.getElementById('chat-scroll-content');
                editerDom.scrollTop = editerDom.scrollHeight;
            });
        },
        assembleRobotData(robotData) {
            this.robotArray = this.robotArray.filter(er => er.id >= this.minRobotId && er.id <= this.maxRobotId)
            for (let er of robotData) {
                let robot = new Robot(er.id, er.puid, er.name, er.age, er.sex, er.city, er.profile);
                if (strLen(er.name) > 6) {
                    robot.simpleName = subStr(er.name, 6) + "...";
                }
                for (let ec of er.chats) {
                    let chat = new RobotChat(ec.friendId, ec.friendName, ec.age, ec.sex);
                    for (let ecc of ec.chatContent) {
                        let chatC = new ChatContent(ecc.id, ecc.chat)
                        chat.chatContent.push(chatC);
                    }
                    robot.chats.push(chat);
                    if (!robot.curChat) {
                        robot.curChat = chat;
                    }
                }
                this.robotArray.push(robot);
            }
            if (!this.curRobot && this.robotArray.length > 0) {
                this.curRobot = this.robotArray[0];
            }
        },
        sortRobotArray() {
            this.robotArray = this.robotArray.sort((a, b) => b.refreshTime - a.refreshTime);
        }
    },
    computed: {
        robotDetailIcon() {
            return {
                backgroundImage: "url('./static/img/robotIcon" + this.curRobot.sex + ".png')"
            };
        }
    }
});

function strLen(str) {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x0040) || (c >= 0x005b && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        } else {
            len += 2;
        }
    }
    return len;
}

function subStr(str, limitLen) {
    let len = 0;
    let res = '';
    for (let i = 0; i < str.length; i++) {
        if (len >= limitLen) {
            return res;
        }
        let c = str.charCodeAt(i);
        res += str[i];
        if ((c >= 0x0001 && c <= 0x0040) || (c >= 0x005b && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        } else {
            len += 2;
        }
    }
    return res;
}