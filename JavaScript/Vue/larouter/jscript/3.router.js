// 1. 创建组件
let home = {
    template: '<h1>home</h1>'
};
let detail = {
    template: '#detail'
};
let profile = {
    template: '<h1>profile</h1>'
};
let about = {
    template: '<h1>about</h1>'
};

// 2. 创建映射表
let routes = [
    {path: '/home', component: home},
    {
        path: '/detail', 
        component: detail,
        children: [ // children 中的路径永远不带'/'
            {path:'profile', component: profile},
            {path:'about', component: about}
        ]
    }
];

// 3. 注册映射表
let router = new VueRouter({
    routes
});

// 4. 注册路由
let vm = new Vue({
    el: '#app',
    router,
    data: {
        
    }
});