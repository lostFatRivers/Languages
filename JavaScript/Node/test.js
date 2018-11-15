class MockVue {
    constructor(obj) {
        this.obj = obj;
        this.bbq = "你是谁";
    }
}

let mv = new MockVue({
    computed: {
        remessage() {
            return this.bbq;
        }
    }
});

console.log(mv.obj.computed.remessage());
