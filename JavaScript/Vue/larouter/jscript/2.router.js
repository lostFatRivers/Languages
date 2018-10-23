let home = {
    template: '<h1>home</h1>'
}

let routes = [
    {path: '/home', component: home},
];

let router = new VueRouter({
    routes
});
let vm = new Vue({
    el: '#app',
    router,
    data: {
        
    }
});