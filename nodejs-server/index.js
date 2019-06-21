var express = require("express");
var app = express();

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

var id = getRandomInt(10000);
var count = 0;
var host;
var port;
app.get("/", function(req, res){
    count++;
    console.log(id + ". request number : " + count);
    res.send(count + ". " + 'Hello World! from server-id: ' + id);
});

var server = app.listen(3000, function(){
    host = server.address().address;
    port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});
