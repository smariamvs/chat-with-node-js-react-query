const WebSocket = require("ws");
const MESSAGE_TYPE  = require("../constants/messageTypes");

let wss;

function setWebSocketServer(server,chatMessages) {
    wss = new WebSocket.Server({ server });
    wss.on("connection", (ws) => {
        console.log("Client connected.");
        ws.send(JSON.stringify({
            type: MESSAGE_TYPE.INITIAL_DATA,
            payload: chatMessages,
        }));

        ws.on("close", () => {
            console.log("Client disconnected.");
        });
    });
}

function broadcastMessage(message,type) {
    if (!wss) {
        console.error("WebSocket server not initialized.");
        return;
    }

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
             client.send(JSON.stringify(message));
        }
    });
}

module.exports = {
    setWebSocketServer,
    broadcastMessage,
};
