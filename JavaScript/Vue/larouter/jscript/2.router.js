// 1. 创建组件
let home = {
    template: '<h1>home <button @click="toList">去列表</button></h1>',
    methods: {
        toList() {
            //this.$router.push('/list'); // 强制跳转路径
        }
    }
};
let list = {
    template: '<h1>list <button @click="back">返回</button></h1>',
    methods: {
        back() {
            this.$router.go(-1);
        }
    }
};

// 2. 创建映射表
let routes = [
    {path: '', component: home},    // 默认路由, 可以 '/'
    {path: '/home', component: home},
    {path: '/list', component: list},
    //{path: '/*', component: list},  // 路径不会变, 只是切换了组件
    {path: '/*', redirect: home}
];

// 3. 注册映射表
let router = new VueRouter({
    routes
});

// 4. 注册路由
let vm = new Vue({
    el: '#app',
    router, // 每个组件都会拥有一个名字叫 $router 的属性(有r的存的都是方法), 还有一个名字叫 $route (没r的存的都是属性)
    data: {
        
    }
});