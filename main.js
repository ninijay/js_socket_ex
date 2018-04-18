const net = require('net');
const dns = require('dns');
const https = require("https");

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


