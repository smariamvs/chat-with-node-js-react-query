import {useState} from "react";
import PropTypes from "prop-types";

const ChatForm = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!message.trim()) return;
        if (onSendMessage) {
            onSendMessage(message);
        }
        setMessage('');
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                className="textarea"
                placeholder="Type here"
                onChange={(event) => setMessage(event.target.value)}
            />
            <button type="submit" id={'submit'} className="send">
                Send Message
            </button>
        </form>
    );
};

ChatForm.propTypes = {
    onSendMessage: PropTypes.func.isRequired,
};

export default ChatForm;
