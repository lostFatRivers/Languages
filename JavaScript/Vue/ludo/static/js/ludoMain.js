let ludoCube = {
    props: ['index', 'cube'],
    template: '#temp-ludo-cube',
    computed: {
        protected() {
            return this.cube.isProtect ? 'P' : '';
        },
        gridStyle() {
            let y = (this.index - 1) ? parseInt((this.index - 1) / 15) : 0;
            let x = (this.index - 1) % 15;
            let left = 42 * x;
            let top = 42 * y;
            return {
                backgroundColor: this.cube.color,
                border: '1px solid black',
                left: left + 'px',
                top: top + 'px',
            }
        }
    }
};

let ludoPiece = {
    props: ['color'],
    template: '#temp-piece',
    computed: {
        pieceStyle() {
            return {
                backgroundColor: this.color
            }
        }
    }
}

let vm = new Vue({
    el: '#app',
    data: {
        gridConfig: {},
        indexMap:{},
        inited: false,
        group: 1
    },
    created() {
        axios.get('./static/data/config.json').then(res => {
            // success
            for (let eachCube in res.data.chessboardGrid) {
                let eachGrid = res.data.chessboardGrid[eachCube];
                this.gridConfig[eachCube] = eachGrid;
                this.indexMap[eachGrid.id] = eachCube;
            }
            this.inited = true;
        }, err => {
            // error
            console.log(err);
        });
    },

    components: {
        'ludo-cube': ludoCube,
        'ludo-piece': ludoPiece
    },
});