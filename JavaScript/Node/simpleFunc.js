var fs = require('fs');

let readFile = function(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.toString('UTF-8'));
            }
        })
    });
}

let readFilePromise = readFile("E:/fag/script/test.txt");

readFilePromise.then(value => console.log(value)).catch(err => console.log("Error. ", err));

console.log("after promise call");

let p1 = new Promise((resolve, reject) => {
    setTimeout(resolve("World"), 1000);
});


let p2 = function() {
    return new Promise((resolve, reject) => {

        setTimeout(resolve(p1), 1000);
    });
}

p2().then(value => console.log(value));