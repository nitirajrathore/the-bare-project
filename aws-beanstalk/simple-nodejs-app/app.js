const port = process.env.PORT || 8080,
    http = require('http'),
    fs = require('fs')
    // html = fs.readFileSync('index.html');

const log = function(entry) {
    fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
};
numrequests = 0;
const server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        let body = '';

        req.on('data', function(chunk) {
            body += chunk;
        });

        req.on('end', function() {
            if (req.url === '/') {
                log('Received message: ' + body);
            } else if (req.url = '/scheduled') {
                log('Received task ' + req.headers['x-aws-sqsd-taskname'] + ' scheduled at ' + req.headers['x-aws-sqsd-scheduled-at']);
            }

            res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
            res.end();
        });
    } else {
        numrequests++;
        // https://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node
        log('Received GET call from ip :' + req.headers['x-forwarded-for'] + ". Num of request processed : " + numrequests);
        res.writeHead(200);
        res.write("Your IP : " + req.headers['x-forwarded-for'] + ". Number of get call received till now : " + numrequests);
        res.end();
    }
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');
