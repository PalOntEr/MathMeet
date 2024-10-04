import React from 'react';
import './OutgoingMessage.css';

const OutgoingMessage = ({ message, sender }) => {
    return (
        <div className="outgoing-message-container bg-comp-1 rounded-md w-1/3 px-3 py-2 self-end m-3">
            <div className="outgoing-message-sender text-color opacity-60">{sender}</div>
            <div className="outgoing-message-content text-color">{message}</div>
            <div className="outgoing-message-time text-color opacity-40 text-end">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
    );
};
OutgoingMessage.defaultProps = {
    message: '',
    sender: 'Tú',
};

export default OutgoingMessage;