let ludoCube = {
    props: ['index', 'cube'],
    template: '#temp-ludo-cube',
    data() {
        let y = (this.index - 1) ? parseInt((this.index - 1) / 15) : 0;
        let x = (this.index - 1) % 15;
        return {
            left: 42 * x,
            top: 42 * y
        }
    },
    computed: {
        protected() {
            return this.cube.isProtect ? 'P' : '';
        },
        gridStyle() {
            return {
                backgroundColor: this.cube.color,
                border: '1px solid black',
                left: this.left + 'px',
                top: this.top + 'px',
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
        group: 2
    },
    created() {
        axios.get('./static/data/config.json').then(res => {
            // success
            let translate = {};
            let translateIds = {};
            for (let eachCube in res.data.chessboardGrid) {
                let eachGrid = res.data.chessboardGrid[eachCube];
                translate[eachGrid.id] = eachGrid;
                translateIds[eachCube] = eachGrid.id;
            }
            let offset = (this.group - 1) * 13;
            for (let i in translateIds) {
                let beforeId = translateIds[i];
                let gridId = -1;
                if (beforeId > 52) {
                    let bi = parseInt(beforeId / 100);
                    gridId = (this.group - 1 + bi) * 100 + beforeId - bi * 100;
                    if (gridId >= 500) {
                        gridId -= 400;
                    }
                } else {
                    gridId = beforeId + offset;
                    if (gridId > (52 - 1)) {
                        gridId -= 52;
                    }
                }
                let eachGrid = translate[gridId];
                this.gridConfig[i] = eachGrid;
                this.indexMap[eachGrid.id] = i;
            }
            console.log("========================== init success ==========================")
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