import React from "react";
import {useQuery} from "@tanstack/react-query";
import {getMessages, sendMessageFunction, deleteMessageFunction} from './api'
import {uniqId} from "./helpers";

import './App.css'
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";

const App = () => {
    const _token = localStorage.getItem('token')

    const {data} = useQuery({
        queryKey: ["message"],
        queryFn: () => {
            if (!localStorage.getItem('token')) {
                localStorage.setItem('token', uniqId())
            }
            return getMessages()
        },
        staleTime: Infinity,
        cacheTime: Infinity,

    });
    const handleSendMessage = (message) => {
        sendMessageFunction({message, _token,}).then(() => {});
    };
    const handleDeleteMessage = (uId) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            deleteMessageFunction(uId).then(() => {
            });
        }
    };
    return (
        <div>
            <div className="menu">
                <div className="back">
                    <i className="fa fa-chevron-left"></i>
                    <img src="https://i.imgur.com/DY6gND0.png" draggable="false"/>
                </div>
                <div className="name">ME</div>
            </div>
            <ol className="chat">
                {data?.map(({ content, timestamp, token, uId }) => (
                    <ChatMessage
                        key={`message-${uId}`}
                        content={content}
                        timestamp={timestamp}
                        token={token}
                        currentUserToken={_token}
                        onDeleteMessage={() => handleDeleteMessage(uId)}
                    />
                ))}
            </ol>
            <ChatForm onSendMessage={handleSendMessage} />

        </div>
    );
};

export default App;
