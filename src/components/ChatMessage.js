import React from 'react';
import PropTypes from 'prop-types';

const ChatMessage = ({ content, timestamp, token, currentUserToken, onDeleteMessage }) => {
    const isCurrentUser = token === currentUserToken;

    const handleDelete = () => {
        if (onDeleteMessage) {
            onDeleteMessage();
        }
    };

    return (
        <li className={isCurrentUser ? 'self' : 'other'}>
            <div className="avatar">
                <img
                    src={isCurrentUser ? 'https://i.imgur.com/DY6gND0.png' : 'https://i.imgur.com/HYcn9xO.png'}
                    alt="Avatar"
                    draggable="false"
                />
            </div>
            <div className="msg">
                <p>{content}</p>
                <time>{new Date(timestamp).toLocaleString()}</time>
                {isCurrentUser && (
                    <button className="remove" onClick={handleDelete}>
                        x
                    </button>
                )}
            </div>
        </li>
    );
};

ChatMessage.propTypes = {
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
    token: PropTypes.string.isRequired,
    currentUserToken: PropTypes.string.isRequired,
    onDeleteMessage: PropTypes.func,
};

export default ChatMessage;
