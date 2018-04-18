const net = require('net');
const dns = require('dns');
const https = require("https");
const querystring = require("querystring");

var cmd = process.argv[2];
var hostname = process.argv[3];

if(cmd=="-r")
{
     // Console will print the message
 console.log("resolving "+hostname);
 dns.lookup(hostname, function(err, result) {
   console.log(result)
 })
}
else if(cmd=="-g")
{
    https.get(hostname, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          console.log(data);
          body += data;
        });
      });
}
else if(cmd=="-p")
{

    var tasklist = {};
    var postData = JSON.stringify({"tasks": [{"title":"Buy milk","done":false}]});

    const options = {
        hostname: hostname,
        port: 443,
        path: '/task_list/',
        method: 'POST'
      };

      var stdin = process.openStdin();

      console.log(postData);
      const req = https.request(options, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
      
        res.on('data', (d) => {
          process.stdout.write(d);
        });
      });
      
      req.on('error', (e) => {
        console.error(e);
      });
      req.write(postData);
      req.end();
      
}
else
{
    console.log("usage");
}


