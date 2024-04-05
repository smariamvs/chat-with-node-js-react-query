import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatMessagesProvider } from "./providers/ChatMessageProvider";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from 'react-dom/client';

import App from "./App";
const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ChatMessagesProvider>
                <App />
            </ChatMessagesProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);

reportWebVitals();
