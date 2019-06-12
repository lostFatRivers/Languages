class Player {

    constructor() {
        this.id = 12;
    }

    setInfo(info) {
        this.info = info;
    }

    init() {
        this.info = {};
    }

    appendContent(originStr) {
        return originStr + " 1111";
    }
}


class Dog {
    constructor() {
        this.id = 1000;
        this.tasks = [];
        this._dist = "is a good dog";
    }

    addTask(task) {
        this.tasks.push(task);
    }

    executeTask() {
        this.tasks.forEach(et => console.log(et("hello")));
    }

}

let p1 = new Player();
let d1 = new Dog();

console.log(d1._dist);