import { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import IncomingMessage from '../Components/IncomingMessage.jsx';
import OutgoingMessage from '../Components/OutgoingMessage.jsx';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('Roberto');
    const [message, setMessage] = useState('');
    const [connection, setConnection] = useState(null);
   
    useEffect(() => {
       const connection = new signalR.HubConnectionBuilder()
            .withUrl("/chatHub", {
                withCredentials: true // If you are using cookies, enable this
            })
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => {
                console.log("Connected to SignalR hub");
                setConnection(connection);
            })
            .catch(err => console.error("SignalR connection error: ", err));

        connection.on("ReceiveMessage", (sender, receivedMessage) => {
            setMessages(prevMessages => [...prevMessages, { message: receivedMessage, sender, type: "incoming" }]);
        });

        return () => {
            connection.stop();
        };
    }, []);

    const sendMessage = async () => {    
        if (connection && message) { 
            try {
                await connection.invoke('SendMessage', user, message);
                console.log("ola si se mando el mensaje");
                setMessage('');
            } catch (err) {
                console.log("Mamaste: " + err);
            }
        }
    };

    return (
        <div className="flex flex-col w-full h-full overflow-y-scroll">
            <div id="Messages-Container" className="flex flex-col w-full h-full overflow-y-scroll">
                {messages.map((msg, index) => (
                    msg.type === "incoming" ?
                        (<IncomingMessage key={index} message={msg.message} sender={msg.sender} /> ):
                        (<OutgoingMessage key={index} message={msg.message} sender={msg.sender} />)
                ))}
            </div>
            <div id="MessageInput-Container" className="flex h-[5%] justify-center items-center space-x-2">
                <div id="btn-container" className="">
                    <button id="AddFile"><AddIcon className=" text-primary" /></button>
                </div>
                <div className='btn-container'>
                    <button id="Emojis"><EmojiEmotionsIcon className="Icon-container text-primary" /></button>
                </div>
                <div className="w-full">
                    <input type="text" className="w-full bg-transparent border-b-2 border-[var(--primary-color)] text-white outline-none" id="Message" value={message} onChange={(e) => setMessage(e.target.value)}></input>
                </div>
                <div className='btn-container'>
                    <button onClick={sendMessage} id="SendMessage"><SendIcon className="Icon-container text-primary" /> </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;