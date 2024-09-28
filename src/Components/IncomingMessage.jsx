import React from 'react';
import './IncomingMessage.css';

const IncomingMessage = ({ message, sender }) => {
    return (
        <div className="incoming-message-container bg-comp-1 rounded-md w-1/3 px-3 py-2 m-3">
            <div className="incoming-message-sender text-color opacity-60">{sender}</div>
            <div className="incoming-message-content text-color">{message}</div>
            <div className="incoming-message-time text-color opacity-40 text-end">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
    );
};
IncomingMessage.defaultProps = {
    message: '',
    sender: 'Anónimo',
};

export default IncomingMessage;