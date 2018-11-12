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
};

let robotChatBar = {
    props: ['activeId', 'chat'],
    template: '#temp-robot-chat-bar'
};

let chatBubble = {
    props: ['bubble', 'friend'],
    template: '#temp-chat-bubble',
    data() {
        return {
            iconSwitch: {
                float: this.bubble.id == this.friend ? 'left' : 'right',
                marginLeft: this.bubble.id == this.friend ? '20px' : '0px',
                marginRight: this.bubble.id == this.friend ? '0px' : '20px',
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
        curRobot: null,
        isLogin: true,
        editContent: ''
    },
    created() {
        this.initData();
    },
    components: {
        'robot-bar': robotBar,
        'robot-chat-bar': robotChatBar,
        'chat-bubble' : chatBubble
    },
    methods: {
        shootMessage() {
            if (!this.curRobot || !this.curRobot.curChat || this.editContent.trim() === '') {
                this.editContent = '';
                return;
            }
            this.curRobot.curChat.chatContent.push(new ChatContent(this.curRobot.id, this.editContent));
            this.editContent = '';
            Vue.nextTick(() => {
                let editerDom = document.getElementById('chat-scroll-content');
                editerDom.scrollTop = editerDom.scrollHeight;
            });
        },
        selectRobot(robotId) {
            this.curRobot = this.robotArray.find(va => va.id === robotId);
        },
        selectChat(chatId) {
            this.curRobot.curChat = this.curRobot.chats.find(va => va.friendId === chatId);
            this.curRobot.curChat.readNum = this.curRobot.curChat.chatContent.filter(ec => ec.id == this.curRobot.curChat.friendId).length;
            Vue.nextTick(() => {
                let editerDom = document.getElementById('chat-scroll-content');
                editerDom.scrollTop = editerDom.scrollHeight;
            });
        },
        initData() {
            axios.get('./robot.json').then(res => {
                // success
                for (let er of res.data.robot) {
                    let robot = new Robot(er.id, er.puid, er.name, er.age, er.sex, er.city, er.profile);
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
                    if (!this.curRobot) {
                        this.curRobot = robot;
                    }
                }
            }, err => {
                // error
                console.log(err);
            });
        }
    }
});