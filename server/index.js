const http = require("http");
const url = require("url");
const { handleAddMessage, handleDeleteMessage } = require("./api/messages");
const { setWebSocketServer } = require("./utils/helpers");

let chatMessages = [];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle OPTIONS requests for preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Handle GET requests
    if (req.method === 'GET') {
        if (parsedUrl.pathname === '/get-messages') {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(chatMessages));
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Endpoint not found.');
        }
    }

    // Handle POST requests
    if (req.method === 'POST' && parsedUrl.pathname === '/add-message') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            req['body'] = JSON.parse(data);
            handleAddMessage(req, res);
        });
    }

    // Handle DELETE requests
    if (req.method === 'DELETE' && parsedUrl.pathname.startsWith('/delete-message/')) {
        const messageId = parsedUrl.pathname.split('/')[2];
        req.params = { messageId };
        handleDeleteMessage(req, res);
    }
});

// Set up WebSocket server
setWebSocketServer(server);

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
