let MESSAGE_TYPE = require('../constants/MessageTypes');
const { broadcastMessage } = require("../utils/helpers");

let chatMessages = [];
function handleAddMessage(req, res) {
    try {
        const { message, _token } = req.body?.data;
        if (!message || !_token) {
            return res.end(JSON.stringify({ error: "Invalid data format" }));
        }

        const newMessage = {
            content: message,
            timestamp: new Date(),
            token: _token,
            uId: (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)
        };
        chatMessages.push(newMessage);
        broadcastMessage({
            type: MESSAGE_TYPE.NEW_MESSAGE,
            payload: newMessage,
        });
        return res.end(JSON.stringify({ message: "Received JSON data" }));
    } catch (error) {
        console.error("Error parsing JSON:", error.message);
        return res.end(JSON.stringify({error: "Internal Server Error" }));
    }
}

function handleDeleteMessage(req, res) {
    const { messageId } = req.params;
    const messageIndex = chatMessages.findIndex(msg => msg.uId === messageId);
    if (messageIndex !== -1) {
        chatMessages.splice(messageIndex, 1);
        broadcastMessage({
            type: MESSAGE_TYPE.DELETE_MESSAGE,
            payload: messageId,
        });
        return res.end(JSON.stringify({ success: true, message: `Message with ID ${messageId} deleted.` }));
    } else {
        return res.end(JSON.stringify({ success: false, error: `Message with ID ${messageId} not found.` }));
    }
}

module.exports = {
    handleAddMessage,
    handleDeleteMessage,
};
