
let home = {
    template: '<h1>首页</h1>'
};
let list = {
    template: '<h1>列表页</h1>'
};

let routes = [  // 路由的映射表, 配置路径和组件的关系
    {path: '/home', component: home},
    {path: '/list', component: list}
];

let router = new VueRouter({    // 引入vue-router自带VueRouter类
    //mode: 'history',
    routes,
    linkActiveClass: 'btn-primary'
});

let vm = new Vue({
    el: '#app',
    router,
    data: {
        
    }
});