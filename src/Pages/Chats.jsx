import SideBar from '../Components/SideBar.jsx'
import './Chat.css'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import GroupImg from '../Images/DAMN.png'
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VideocamIcon from '@mui/icons-material/Videocam';

import { Link } from 'react-router-dom'

function Chats() {

    return (
        <div id="Content-container" className="flex">
            <div id="Chat-Container" className="flex flex-col h-full w-5/6 px-2">
                <div className="h-[10%]">
                    <Link to="/VideoChat">
                            <VideocamIcon />
                    </Link>
                </div>
                <div id="Messages-Container" className="h-[90%]">

                </div>
                <div id="MessageInput-Container" className="flex h-[5%] justify-center items-center space-x-2">
                    <div id="btn-container" className="">
                        <button id="AddFile"><AddIcon className=" text-primary" /></button>
                    </div>
                    <div className='btn-container'>
                        <button id="Emojis"><EmojiEmotionsIcon className="Icon-container text-primary" /></button>
                    </div>
                    <div className="w-full">
                        <input type="text" className="w-full bg-transparent border-b-2 border-[var(--primary-color)] text-white outline-none" id="Message"></input>
                    </div>
                    <div className='btn-container'>
                        <button id="SendMessage"><SendIcon className="Icon-container text-primary" /> </button>
                    </div>
                </div>
            </div>

            <div className="ChatInfo-Container w-1/5 bg-comp-1 px-4">
                <div className="GroupInfo items-center flex flex-col">
                    <img src={GroupImg} className="rounded-full w-5/6 h-5/6 my-4" />
                    <p id="GroupName" className="text-primary font-bold text-xl"> Nombre del Grupo</p>
                </div>

                <div id="Members-Container" className="my-2">
                    <h3 className="text-lg font-bold text-primary"> Integrantes: </h3>
                    <div id="MembersList" className="space-y-2">
                        <ul className="bg-color rounded-xl p-3 text-color h-48 text-xs space-y-4 overflow-y-auto flex flex-col">
                            <li>Roberto Carlos Dominguez Espinosa</li>
                            <li>Max Andres Zertuche Perez</li>
                            <li>Isis Esmeralda Flores Montes</li>
                        </ul>
                        <button id="AgregarIntegrante" className="flex font-bold items-center bg-primary w-full justify-center py-1 rounded-xl"><AddIcon /> Agregar Integrante </button>
                    </div>
                </div>

                <div id="Tasks-Container">
                    <h3 className="text-xl font-bold text-primary">Tarea(s):</h3>
                    <div className='TasksList h-96'>
                        <ul className="h-full overflow-y-auto">
                            <li className="flex items-center py-2 border-b-2 border-[var(--primary-color)]">
                                <div className="Icon-container text-background"><AssignmentIcon style={{ fontSize: "44px" }} /></div>
                                <div className="TaskInfo-container">
                                    <h4 className="text-lg font-bold text-primary">Nombre De Tarea</h4>
                                    <p className="text-xs text-primary">Vencimiento: 25/04/2022</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chats;