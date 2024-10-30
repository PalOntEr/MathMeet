import { useState, useEffect,useContext } from 'react';
import { ChatContext } from '../ChatContext';
import { UserContext } from '../UserContext';
import Emote1 from '../Images/Calc Emote1.png';
import * as signalR from '@microsoft/signalr';
import IncomingMessage from '../Components/IncomingMessage.jsx';
import OutgoingMessage from '../Components/OutgoingMessage.jsx';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import Emotes from '../Components/Emotes.jsx';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [message, setMessage] = useState('');
    const [showEmojis, setShowEmojis] = useState(false);
    const [connection, setConnection] = useState(null);
    const { ChatID } = useContext(ChatContext);
    const [msgAttempt, setMsgAttempt] = useState(false);
    const [emote,setEmote] = useState([]);

    useEffect(() => {
        if (!msgAttempt) return;

        const nuevoMensaje = {
            usuarioEmisor: user.Matricula,
            chatReceptor: ChatID,
            mensaje: message,
            ID_Archivo: emote.EmoteID
        };

        const RegisterMessage = async () => {
            try {
                // Realiza la solicitud POST a la API
                const response = await fetch('Mensajes', {  //la path de la api (sin el controller)
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nuevoMensaje),  // convierte el objeto a JSON (que es lo que espera la api)
                });

                const data = await response.json();
                //console.log(data);  // 
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                console.log('Mensaje registrado con éxito:', data);
                //alert("Usuario registrado con éxito");
            } catch (error) {
                console.error('Error al registrar el usuario:', error);
                //alert("Hubo un error al registrar el usuario");
            }
        }
        RegisterMessage();
        setMsgAttempt(false);
    }, [msgAttempt]);

    useEffect(() => {
        setMessages([]);
        fetch('Mensajes?ID_Chat=' + ChatID).
            then(response => response.json()).
            then(data => {
                const RestructuredMessage = data.map(item => ({
                    message: item.mensaje,
                    sender: item.usuarioEmisor,
                    type: item.usuarioEmisor === user.UserName ? "outcoming" : "incoming",
                    DateSent: item.fechaEnvio,
                    Emote: item.archivo
                }));
                setMessages(RestructuredMessage);
                console.log(messages);
            });
       const connection = new signalR.HubConnectionBuilder()
            .withUrl("/chatHub", {
                withCredentials: true
            })
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(async() => {
                console.log("Connected to SignalR hub");
                setConnection(connection);

                if (ChatID) {
                    await connection.invoke("JoinChat", ChatID.toString());
                }
            })
            .catch(err => console.error("SignalR connection error: ", err));

        connection.on("ReceiveMessage", (sender, receivedMessage, EmoteSent, DateOfSent) => {
            console.log(EmoteSent);
            setMessages(prevMessages => [...prevMessages, { DateSent: DateOfSent, message: receivedMessage, sender, type: sender === user.UserName ? "outcoming" : "incoming", Emote: EmoteSent}]);
        });

        return () => {
            connection.stop();
        };
    }, [ChatID]);

    const sendMessage = async (EmoteSent) => {
        if (connection && message) { 
            try {
                console.log("ola 2");
                await connection.invoke('SendMessage', user.UserName, message,null, ChatID.toString());
                setMsgAttempt(true);
                setMessage("");
            } catch (err) {
                console.log("Mamaste: " + err);
            }
        }
        if (connection && !message && EmoteSent) {
            try {
                console.log("olaaaaa2");
                console.log(EmoteSent);
                await connection.invoke('SendMessage', user.UserName, message, EmoteSent.EmoteID, ChatID.toString());
                setMsgAttempt(true);
                setMessage("");
            } catch (err) {
                console.log("Mamaste: " + err);
            }
        }
    };

    const handleEnter = async (event) => {
        if (event.key == 'Enter') {
            sendMessage();
        }
    };

    const handleEmote = (data) => {
        setMessage("");
        sendMessage(data);
    }

    return (
        <div className="flex flex-col w-full h-full overflow-y-scroll">
            <div id="Messages-Container" className="flex flex-col w-full h-full overflow-y-scroll">
                {messages.map((msg, index) => (
                    msg.type === "incoming" ?
                        (<IncomingMessage key={index} message={msg.message} sender={msg.sender} DateSent={msg.DateSent} Emote={msg.Emote} />) :
                        (<OutgoingMessage key={index} message={msg.message} sender={msg.sender} DateSent={msg.DateSent} Emote={msg.Emote} />)
                ))}
                </div>
            <div id="MessageInput-Container"className="flex h-[5%] justify-center items-center space-x-2">
                <div id="btn-container" className="">
                    <button id="AddFile"><AddIcon className=" text-primary" /></button>
                </div>
                <div className='btn-container'>
                    <button onClick={() => { setShowEmojis(!showEmojis) }} id="Emojis"><EmojiEmotionsIcon className="Icon-container text-primary" /></button>
                </div>
                <div className="w-full">
                    <input type="text" onKeyDown={handleEnter}  className="w-full bg-transparent border-b-2 border-[var(--primary-color)] text-white outline-none" id="Message" value={message} onChange={(e) => setMessage(e.target.value)}></input>
                </div>
                <div className='btn-container'>
                    <button onClick={sendMessage} id="SendMessage"><SendIcon className="Icon-container text-primary" /> </button>
                </div>
            </div>
            <Emotes show={showEmojis} EmoteSent={handleEmote} /> 
        </div>
    );
};

export default Chat;