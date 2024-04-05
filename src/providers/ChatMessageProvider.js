import React, { createContext, useCallback, useContext, useEffect, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useQueryClient } from "@tanstack/react-query";
import config from "../consants.json";
import NotificationSound from "../notification.mp3";

const ChatMessagesContext = createContext(null);

export const queryKey = ["messages"];

export const ChatMessagesProvider = ({ children }) => {
    const { sendMessage: sM, lastMessage, readyState } = useWebSocket(config.SOCKET_URL, {
        shouldReconnect: true,
    });

    const queryClient = useQueryClient();
    const canSendMessages = readyState === ReadyState.OPEN;
    const audioPlayer = useRef(null);

    function playAudio() {
        if (audioPlayer.current) {
            audioPlayer.current.play();
        }
    }

    useEffect(() => {
        if (lastMessage && lastMessage.data) {
            const { type, payload } = JSON.parse(lastMessage.data);
            switch (type) {
                case config.MESSAGE_TYPE.INITIAL_DATA:
                    queryClient.setQueryData(['message'], () => {
                        return payload;
                    });
                    break;
                case config.MESSAGE_TYPE.NEW_MESSAGE:
                    queryClient.setQueryData(['message'], (oldData) => {
                        playAudio();
                        return [...oldData, payload];
                    });
                    break;
                case config.MESSAGE_TYPE.DELETE_MESSAGE:
                    queryClient.setQueryData(['message'], (oldData) => {
                        return oldData.filter(item => item.uId !== payload);
                    });
                    break;
                default:
                    break;
            }
        }
    }, [lastMessage, queryClient]);

    const sendMessage = useCallback(
        (content) => {
            if (canSendMessages) {
                sM(
                    JSON.stringify({
                        type: config.MESSAGE_TYPE.SEND_MESSAGE,
                        content,
                    })
                );
            }
        },
        [canSendMessages, sM]
    );

    return (
        <ChatMessagesContext.Provider value={{ canSendMessages, sendMessage }}>
            {children}
            <audio ref={audioPlayer} src={NotificationSound} />
        </ChatMessagesContext.Provider>
    );
};

export const useChatMessagesContext = () => useContext(ChatMessagesContext);
