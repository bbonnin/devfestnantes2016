var net = require('net');

var hashtags = [ '#nantes', '#devfest', '#spark', '#eclairjs', '#javascript' ];

function randomTags() {
    var tags = new Set();
    while (tags.size != 5) {
         tags.add(hashtags[Math.floor(Math.random() * 5)]);
    }
    return Array.from(tags).join(' ');
}

var server = net.createServer(socket => {
    console.log("New connection...");
    var intervalId = setInterval(() => {
        var tags = randomTags();
        try {
            socket.write(tags + '\n');
        }
        catch (e) {

            clearInterval(intervalId);
        }
    }, 2000);
});

server.listen(9999, '127.0.0.1');

