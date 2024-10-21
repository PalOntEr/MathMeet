import SideBar from '../Components/SideBar.jsx'
import './Chat.css'
import { useContext,useEffect, useState } from 'react';
import { ChatContext } from '../ChatContext';
import { UserContext } from '../UserContext';
import GroupImg from '../Images/DAMN.png'
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VideocamIcon from '@mui/icons-material/Videocam';
import IncomingMessage from '../Components/IncomingMessage.jsx';
import RemoveIcon from '@mui/icons-material/Remove';
import Chat from '../Components/Chat.jsx';
import OutgoingMessage from '../Components/OutgoingMessage.jsx';

import { Link } from 'react-router-dom'
const Modal = ({ show, handleclose, children }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-comp-1 w-1/2 p-6 space-y-4 rounded-lg shadow-lg">
                <button onClick={handleclose} className="mb-4 text-red-500">
                    close
                </button>
                {children}
            </div>
        </div>
    );
}
const Chats = () => {
    const { ChatID } = useContext(ChatContext);
    const [ ChatInfo, setChatInfo ] = useState([]);
    const [members, setMembers] = useState([]);
    const [memberBuscado, setMemberBuscado] = useState(null);
    const [membersAdded, setMembersAdded] = useState([]);
    const [memberstoAdd, setMemberstoAdd] = useState([]);
    const [ChatName, setChatName] = useState();
    const [ModalOpen, setModalOpen] = useState(false);
    const { user } = useContext(UserContext);
    const [addMembersAtt, setAddMembersAtt] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        setMemberstoAdd([]);
        setMembersAdded([]);
    }
    const RemoveMemberAdded = (memberSelected) => {
        setMembersAdded(prevState => prevState.filter(usuario => usuario.matricula !== memberSelected.matricula));
    }

    useEffect(() => {
        if (!addMembersAtt) return;

        const membersAddedFinal = membersAdded.map(memberAdded => ({
            Nombre: memberAdded.nombreCompleto,
            Matricula: memberAdded.matricula
        }));

        console.log(membersAddedFinal);
        const AddMembers = async () => {
            try {
                const response = await fetch('Chats/' + ChatID, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(membersAddedFinal),
                });
                const data = await response.json();
                console.log(data);  // 
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                console.log('Usuarios Agregados con éxito:', data);
                closeModal();
            } catch (error) {
                console.error('Error al Agregar Usuarios:', error);
                alert("Hubo un error al registrar el usuario");
            }
        }
        AddMembers();
        setAddMembersAtt(false);
    }, [addMembersAtt]);

    useEffect(() => {
        if (!ChatID) return;

        console.log(ChatID);
        fetch("Chat/" + ChatID.toString() + "?IDChat=" + ChatID).
            then(response => response.json()).
            then(data => {
                console.log(data.chatInfo); 
                setChatInfo(data.chatInfo);
                setMembers(data.integrantes);
                console.log(members);
            }).catch(error => { console.log(error) });
    }, [ChatID]);


    useEffect(() => {
        fetch('usuarios?name=' + memberBuscado)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setMemberstoAdd(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [memberBuscado]);


    const handleClick = (usuario) => {
        console.log(usuario);
        setMembersAdded(prevState => [...prevState, usuario]);

    }
    const handleClickAddMembers = (e) => {
        e.preventDefault();
        setAddMembersAtt(true);
    }

    return (
        <div id="content-container" className="flex h-screen w-2/3 xs:w-3/4">
            <div id="chat-container" className="flex flex-col justify-between h-full w-3/4 px-2">
                <div className="h-[10%]">
                    <Link to="/videochat">
                        <VideocamIcon className="bg-primary p-px rounded-full" />
                    </Link>
                </div>
                <Chat/>
            </div>

            <div className="chatinfo-container container w-1/4 h-full bg-comp-1 px-4">
                <div className="groupinfo items-center flex flex-col">
                    <img src={GroupImg} className="rounded-full w-3/4 h-3/4 xs:w-5/6 xs:h-5/6 my-4" />
                    <p id="groupname" className="text-primary font-bold text-mdxs:text-xl"> {ChatInfo.nombre }</p>
                </div>

                <div id="members-container" className="my-2">
                    <h3 className="text-xs xs:text-lg font-bold text-primary"> integrantes: </h3>
                    <div id="memberslist" className="space-y-2">
                        <ul className="bg-color rounded-xl p-3 text-color h-48 text-xs space-y-4 overflow-y-auto flex flex-col">
                            {members && members.map(member => (
                                <li key={member.matricula}> { member.nombre}</li>
                            )) }
                        </ul>
                        <button id="agregarintegrante" onClick={openModal} className="flex font-bold items-center bg-primary w-full justify-center py-1 rounded-xl xs:text-lg text-xs"><AddIcon/> Agregar Integrante </button>
                        <Modal show={ModalOpen} handleClose={closeModal}>
                            <h1 className="font-bold text-4xl text-center text-color">buscar <span className="text-secondary">integrante</span></h1>
                            <form>
                                <label htmlFor="adduser" className="font-semibold text-color">integrante:</label>
                                <input id="adduser" value={memberBuscado} onChange={(e) => { setMemberBuscado(e.target.value) }} type="text" className="inputline w-full bg-transparent outline-none border-b-2 text-white border-[var(--primary-color)]" />
                                <ul className="flex flex-col h-full w-full overflow-y-scroll bg-color rounded-md p-2 text-primary text-sm space-y-2">
                                    {membersAdded && membersAdded.map(usuarioselec => (
                                    <li key={usuarioselec.matricula} className="userfound p-1 rounded-sm bg-primary text-comp-1 justify-between flex w-full">
                                        <div><span>{usuarioselec.nombrecompleto} </span>
                                            </div>
                                            <button onClick={() => RemoveMemberAdded(usuarioselec)}><removeicon /></button>
                                    </li>
                                ))}
                                <li>
                                    <div className="w-full h-px bg-primary"></div>
                                    </li>
                                    {memberstoAdd
                                    .filter(usuario => usuario.matricula !== Number(user.matricula))
                                        .filter(usuario => !members.some(selec => selec.matricula === usuario.matricula))
                                        .filter(usuario => !membersAdded.some(selec => selec.matricula === usuario.matricula))
                                        .map(usuario => (
                                            <li onClick={() => handleClick(usuario)} key={usuario.matricula} className="userfound p-1 rounded-sm">
                                            <span>{usuario.nombrecompleto} </span>
                                        </li>
                                    ))}
                                </ul>
                                <button id="createChat" onClick={handleClickAddMembers} type="submit" className="w-1/2 self-center py-1 font-semibold rounded-md text-color">agregar</button>
                            </form>
                        </Modal> 
                    </div>
                </div>

                <div id="tasks-container">
                    <h3 className="text-md xs:text-xl font-bold text-primary">tarea(s):</h3>
                    <div className='taskslist h-96 md:h-48 flex-grow overflow-hidden'>
                        <ul className="overflow-y-auto max-h-[300px]">
                            <li className="flex items-center py-2 border-b-2 border-[var(--primary-color)]">
                                <div className="icon-container text-background"><AssignmentIcon style={{ fontSize: "32px" }} /></div>
                                <div className="taskinfo-container">
                                    <h4 className="text-md xs:text-lg font-bold text-primary">nombre de tarea</h4>
                                    <p className="text-xs text-primary">vencimiento: 25/04/2022</p>
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