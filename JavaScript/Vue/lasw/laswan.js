let vm = new Vue({  // 根实例;
    el: '#app',
    methods: {
        fn() { alert(this) },
        add() {
            this.arr.unshift(this.val);
            this.val = '';
        },
        laDelete(ind) {
            this.arr = this.arr.filter((item, index) => {
                return index !== ind;
            })
        }
    },
    data: {
        val: '',
        arr: []
    }
});

// promise 三个状态, 成功态, 失败态, 等待态