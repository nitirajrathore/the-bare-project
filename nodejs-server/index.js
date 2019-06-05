var express = require("express");
var app = express();

var count = 0;
var host;
var port;
app.get("/", function(req, res){
    count++;
    console.log("request number : " + count);
    res.send(count + "." + 'Hello World! from ' + host + ":" + port);
});

var server = app.listen(3000, function(){
    host = server.address().address;
    port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
