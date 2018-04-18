const net = require('net');
const dns = require('dns');
const https = require("https");
const querystring = require("querystring");

var cmd = process.argv[2];
var hostname = process.argv[3];

if (cmd == "-r") {
    // Console will print the message
    console.log("resolving " + hostname);
    dns.lookup(hostname, function (err, result) {
        console.log(result)
    })
}
else if (cmd == "-g") {
    https.get(hostname, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
            console.log(data);
            body += data;
        });
    });
}
else if (cmd == "-p") {

    var prompt = require('promptly');
    var tasklist = {};
    var done = false;

    async function enter() {
        tasklist.title = await prompt.prompt('Enter a Title for the taskList: ');
        tasklist.tasks = [];
        console.log("Enter some Tasks");

        while (!done) {
            var task = {};
            task.title = await prompt.prompt('Enter a Title for the task: ');
            task.done = false;
            if (task.title == "done") {
                done = true;
            }
            {
                tasklist.tasks.push(task);
            }

        }

        sendData();
    }

    async function sendData() {
        var postData = JSON.stringify(tasklist);

        const options = {
            hostname: hostname,
            port: 443,
            path: '/' + process.argv[4] + '/',
            method: 'POST'
        };

        const req = https.request(options, (res) => {
            console.log('statusCode:', res.statusCode);
            res.on('data', (d) => {
                var obj = JSON.parse(d); 
                process.stdout.write("ID of your list: "+ obj.id+"\n");
            });
        });

        req.on('error', (e) => {
            console.error(e);
        });
        req.write(postData);
        req.end();
    }

    enter();

}
else {
    console.log("usage:");
    console.log("node main.js [-g <http(s)://api-backend/api/path/> | -p <hostname> <api-backend> | -r <hostname>]");
    console.log("");
    console.log("-g get Data from url");
    console.log("-p send Data to Tasklist- API (INTERACTIVE)");
    console.log("-r resolve hostname");
    console.log("");
}


