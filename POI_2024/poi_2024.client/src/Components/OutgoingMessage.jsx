import React from 'react';
import './OutgoingMessage.css';
import { format } from 'date-fns';


const OutgoingMessage = ({ message, sender, DateSent }) => {

    const date = new Date(DateSent);
    const formattedDate = format(date, 'MM/dd/yyyy hh:mm:ss a');
    return (
        <div className="outgoing-message-container bg-comp-1 rounded-md w-1/3 px-3 py-2 self-end m-3">
            <div className="outgoing-message-sender text-color opacity-60">{sender}</div>
            <div className="outgoing-message-content text-color">{message}</div>
            <div className="outgoing-message-time text-color opacity-40 text-end">{formattedDate}</div>
        </div>
    );
};
OutgoingMessage.defaultProps = {
    message: '',
    sender: 'Tú',
};

export default OutgoingMessage;