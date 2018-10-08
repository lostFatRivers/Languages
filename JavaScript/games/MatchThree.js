// 行号和列号从 0 到 BOX_SIZE -1
// 宝石索引是从 0 到 BOX_SIZE * BOX_SIZE - 1

const BOX_SIZE = 8;
const GEM_TYPE_NUMBER = 6;

let box = [];

for (let i = 0; i < BOX_SIZE; i++) {
    box[i] = [];
    for (let j = 0; j < BOX_SIZE; j++) {
        box[i][j] = randomGem();
    }
}

/**
 * 随机 0-4 共 5 种宝石类型; 
 */
function randomGem() {
    return Math.floor(Math.random() * 100) % GEM_TYPE_NUMBER;
}

// console.log(box);

/**
 * 找出相应 index 宝石的坐标;
 * 
 * @param {number} index 宝石的索引;
 */
function getGemPosition(index) {
    if (index < 0 || index > BOX_SIZE * BOX_SIZE - 1) {
        return [];
    }
    let i = Math.floor(index / BOX_SIZE);
    let j = index - i * BOX_SIZE;
    return [i, j];
}

/**
 * 找出某坐标相邻的四个位置;
 * 
 * @param {[x,y]} pos 中心点位置的坐标;
 */
function getRoundPosition(pos) {
    let top = pos[0] - 1 < 0 ? [] : [pos[0] - 1, pos[1]];
    let right = pos[1] + 1 > BOX_SIZE - 1 ? [] : [pos[0], pos[1] + 1];
    let down =  pos[0] + 1 > BOX_SIZE - 1 ? [] : [pos[0] + 1, pos[1]];
    let left = pos[1] - 1 < 0 ? [] : [pos[0], pos[1] - 1];
    return [top, right, down, left];
}

/**
 * 获取某位置宝石的种类;
 * 
 * @param {[]} pos 宝石的坐标;
 * @param {[]} box 宝石地图;
 */
function getGemType(pos, box) {
    let x = pos[0];
    let y = pos[1];
    return box[x][y];
}

/**
 * 获得某点周围相同宝石类型的坐标;
 * 
 * @param {[]} pos 中心点坐标;
 * @param {[]} box 宝石地图;
 */
function getSameGemTypeRoundPosition(pos, box) {
    let type = getGemType(pos, box);
    console.log("getSameGemTypeRoundPosition pos:", pos, " type:", type);
    let rounds = getRoundPosition(pos);
    let samePositions = [];
    rounds.forEach(value => {
        if (isPositionGemSameType(value, box, type)) {
            samePositions.push(value);
            console.log("same:", value)
        }
    });
    return samePositions;
}

/**
 * 比较该点的宝石类型是否与目标类型一致;
 * 
 * @param {[]} pos 某点的坐标;
 * @param {[]} box 宝石地图;
 * @param {number} type 宝石类型;
 */
function isPositionGemSameType(pos, box, type) {
    if (pos.length != 2) {
        return false;
    }
    return type === getGemType(pos, box);
}

/**
 * 按行查找宝石地图中可3消的索引;
 * 
 * @param {number} row 行号,范围: [0, BOX_SIZE)
 * @param {[]} box 宝石地图;
 */
function findRowThreeMatch(row, box) {
    if (row < 0 && row > BOX_SIZE - 1) {
        return {};
    }
    let boxRow = box[row];
    return iteraterTypeList(boxRow);
}

/**
 * 按列查找宝石地图中可3消的索引;
 * 
 * @param {number} colume 列号,范围: [0, BOX_SIZE)
 * @param {[]} box 宝石地图;
 */
function findColumeThreeMatch(colume, box) {
    if (colume < 0 && colume > BOX_SIZE - 1) {
        return {};
    }
    let boxColume = [];
    box.forEach(value => {
        boxColume.push(value[colume]);
    });
    return iteraterTypeList(boxColume);
}

/**
 * 遍历类型列表, 找出可3消的组;
 * 
 * @param {[number]} typeList 类型列表;
 */
function iteraterTypeList(typeList) {
    let gemMatches = [];
    let lastType = -1;
    let matchNumber = 0;
    let matchIndex = [];
    typeList.forEach((value, index) => {
        if (lastType == -1) {
            lastType = value;
            matchNumber = 1;
            matchIndex.push(index);
            return;
        }
        if (lastType == value) {
            matchNumber++;
            matchIndex.push(index);
            if (index >= BOX_SIZE - 1 && matchNumber >= 3) {
                gemMatches.push({"type": lastType, "index": matchIndex});
            }
        } else {
            if (matchNumber >= 3) {
                gemMatches.push({"type": lastType, "index": matchIndex});
            }
            lastType = value;
            matchNumber = 1;
            matchIndex = [index];
        }
    });
    return gemMatches;
}

/**
 * 找出所有行中可三消的组;
 * 
 * @param {[]} box 宝石地图;
 */
function iteraterAllRowMatch(box) {
    let gemMatches = [];
    for (let i = 0; i < BOX_SIZE; i++) {
        let eachRow = findRowThreeMatch(i, box);
        eachRow.forEach(value => {
            value["index"] = value["index"].map(va => va + i * BOX_SIZE);
            gemMatches.push(value);
        });
    }
    return gemMatches;
}

/**
 * 找出所有列中可三消的组;
 * 
 * @param {[]} box 宝石地图;
 */
function iteraterAllColumeMatch(box) {
    let gemMatches = [];
    for (let i = 0; i < BOX_SIZE; i++) {
        let eachRow = findColumeThreeMatch(i, box);
        eachRow.forEach(value => {
            value["index"] = value["index"].map(va => va * BOX_SIZE + i);
            gemMatches.push(value);
        });
    }
    return gemMatches;
}

/**
 * 合并行列, 得到最终所有可三消的列表;
 * 
 * @param {object} rowMatches 行相连可三消的列表;
 * @param {object} columeMatches 列相连可三消的列表;
 */
function mergeRowAndColumeMatch(rowMatches, columeMatches) {
    // 将行列相交的消除块合并;
    mergedMathes = [];
    mergedColumes = [];
    rowMatches.forEach(rowVal => {
        let type = rowVal["type"];
        let eachMerge = {"type": type, "index": []};
        eachMerge["index"] = unique(eachMerge["index"].concat(rowVal["index"]));
        rowVal["index"].forEach(inVal => {
            for (let i = 0; i < columeMatches.length; i++) {
                if (columeMatches[i]["index"].indexOf(inVal) > -1) {
                    mergedColumes.push(i);
                    eachMerge["index"] = unique(eachMerge["index"].concat(columeMatches[i]["index"]));
                    continue;
                }
            }
        });
        mergedMathes.push(eachMerge);
    });
    columeMatches.forEach((colVal, colIndex) => {
        if (mergedColumes.indexOf(colIndex) > -1) {
            return;
        }
        mergedMathes.push(colVal);
    });
    // 检查是否有重复的相连消除块;
    let secondMerges = [];
    mergedMathes.forEach(value => {
        let isMerged = false;
        secondMerges.forEach(value2 => {
            if (value2["index"].some(value3 => value["index"].indexOf(value3) > -1)) {
                value2["index"] = unique(value2["index"].concat(value["index"]));
                isMerged = true;
            }
        });
        if (!isMerged) {
            secondMerges.push(value);
        }
    }); 
    return secondMerges;
}

/**
 * 列表去重;
 * 
 * @param {[]} arr 数组;
 */
function unique(arr){
    return arr.filter((item, index, array) =>  array.indexOf(item) === index);
}

console.log(box)

let rowMatches = iteraterAllRowMatch(box);
let columeMatches = iteraterAllColumeMatch(box);

console.log(mergeRowAndColumeMatch(rowMatches, columeMatches));