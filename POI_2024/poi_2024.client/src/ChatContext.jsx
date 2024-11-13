import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [ChatID, setChatID] = useState(null);

    const ChatSelected = (ChatIDSelected) => {
        setChatID(ChatIDSelected);
    }

    return (
        <ChatContext.Provider value={{ ChatID, ChatSelected}}>
            {children}
        </ChatContext.Provider>
    );
}