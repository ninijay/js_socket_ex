const net = require('net');
const dns = require('dns');
var hostname = process.argv[2];

 // Console will print the message
 console.log('Server running at http://127.0.0.1:8081/');
 console.log("resolving "+hostname);

 

dns.lookup(hostname, function(err, result) {
  console.log(result)
})