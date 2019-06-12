var http = require('http');

function HttpGet() {
    var options = { 
        hostname: '192.168.1.199', 
        port: 8080, 
        path: '/login', 
        method: 'GET' 
    };
    return new Promise((resolve, reject) => {
        var req = http.request(options, function (res) { 
            res.setEncoding('utf8'); 
            res.on('data', resolve); 
        });
        req.on('error', reject); 
        req.end();
    });
}

async function doHttp() {
    try {
        let data = await HttpGet();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

doHttp();
