const vm = new Vue({
    el: '#app',
    directives: {
        // 自定义指令
        focus(el, bindings) {
            // el是当前的dom
            if (bindings.value) {
                el.focus();
            }
        }
    },
    data: {
        todos: [
            { isSelected: false, title: '睡觉'}
            
        ],
        dones: [
            { isSelected: true, title: '吃饭'}
        ],
        todoTitle: '',
        curModify: -1,
        curNavIndex: 1
    },
    watch: {
        // watch 默认只监控一层
        // todos() { }
        todos: {
            handler() {
                localStorage.setItem('data_todos', JSON.stringify(this.todos));
            },
            deep: true
        },
        dones: {
            handler() {
                localStorage.setItem('data_dones', JSON.stringify(this.dones));
            },
            deep: true
        }
    },
    methods: {
        addTodo() {
            // keydown keyup
            this.todos.push({
                isSelected: false,
                title: this.todoTitle
            });
            this.todoTitle = "";
        },
        deleteTodo(todo) {
            this.todos = this.todos.filter(item => item !== todo);
        },
        deleteDone(done) {
            this.dones = this.dones.filter(item => item !== done);
        },
        modifyTodo(index) {
            this.curModify = index;
        },
        confirmModify() {
            this.curModify = -1;
            this.curTitle = '';
        },
        workDone(todo) {
            this.deleteTodo(todo);
            this.dones.push(todo);
        },
        reTodo(done) {
            this.deleteDone(done);
            this.todos.push(done);
        },
        showAll() {
            this.curNavIndex = 1;
        },
        showTodos() {
            this.curNavIndex = 2;
        },
        showDones() {
            this.curNavIndex = 3;
        }
    },
    created() {
        // 只有这个是方法;
        this.todos = localStorage.getItem("data_todos") ? JSON.parse(localStorage.getItem("data_todos")) : [];
        this.dones = localStorage.getItem("data_dones") ? JSON.parse(localStorage.getItem("data_dones")) : [];
    },
    computed: {
        // computed 是一个对象
        todoCount() {
            return this.todos.filter(item => !item.isSelected).length;
        }
    }
});