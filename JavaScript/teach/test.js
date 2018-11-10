class Robot {
    constructor(id, puid, name, age, sex, city, profile) {
        this.id = id;
        this.puid = puid;
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.city = city;
        this.profile = profile;
        this.chats = [];
        this.curChat = null;
    }
}

class RobotChat {
    constructor(id, name) {
        this.friendId = id;
        this.friendName = name;
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
};

let robotChatBar = {
    props: ['activeId', 'chat'],
    template: '#temp-robot-chat-bar'
};

let vm = new Vue({
    el: "#app",
    data: {
        minId: -1,
        maxId: -1,
        robotArray: [
        ],
        curRobot: null,
        isLogin: true
    },
    created() {
        this.initData();
    },
    components: {
        'robot-bar': robotBar,
        'robot-chat-bar': robotChatBar
    },
    methods: {
        selectRobot(robotId) {
            this.curRobot = this.robotArray.find(va => va.id === robotId);
        },
        selectChat(chatId) {
            this.curRobot.curChat = this.curRobot.chats.find(va => va.friendId === chatId);
            this.curRobot.curChat.readNum = this.curRobot.chats.length;
        },
        initData() {
            this.curRobot = {};
            $.getJSON("robot.json", res => {
                // success
                console.log(res);
                for (let er of res.robot) {
                    let robot = new Robot(er.id, er.puid, er.name, er.age, er.sex, er.city, er.profile);
                    for (let ec of er.chats) {
                        let chat = new RobotChat(ec.id, ec.name);
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
                    if (!this.curRobot) {
                        this.curRobot = robot;
                    }
                }
            });
        }
    }
});