import React from 'react';
import { format } from 'date-fns';
import './IncomingMessage.css';

const IncomingMessage = ({ message, sender, DateSent }) => {
    const date = new Date(DateSent);
    const formattedDate = format(date, 'MM/dd/yyyy hh:mm:ss a');
    return (
        <div className="incoming-message-container bg-comp-1 rounded-md w-1/3 px-3 py-2 m-3">
            <div className="incoming-message-sender text-color opacity-60">{sender}</div>
            <div className="incoming-message-content text-color">{message}</div>
            <div className="incoming-message-time text-color opacity-40 text-end">{formattedDate}</div>
        </div>
    );
};
IncomingMessage.defaultProps = {
    message: '',
    sender: 'Anónimo',
};

export default IncomingMessage;