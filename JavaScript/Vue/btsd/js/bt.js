var vm = new Vue({
    el: '#app',
    data: {
        curPage: "page_index"
    },
    created() {
        this.curPage = window.location.hash.slice(1) || "page_index";
        window.addEventListener('hashchange', () => {
            this.curPage = window.location.hash.slice(1) || "page_index";
        });
    },
    methods: {

    },
    watch: {
        curPage: {
            handler() {
                if (this.curPage == 'page_index') {
                    
                }
            }
        }
    }
});