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
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';


import { Link,useNavigate } from 'react-router-dom'
const Modal = ({ show, handleClose, children }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-comp-1 w-1/2 p-6 space-y-4 rounded-lg shadow-lg">
                <button onClick={handleClose} className="mb-4 text-red-500">
                    Close
                </button>
                {children}
            </div>
        </div>
    );
}
const Chats = () => {
    const navigate = useNavigate();
    const { ChatID } = useContext(ChatContext);
    const [ChatInfo, setChatInfo] = useState([]);
    const [assignments, setAssignments] = useState(null);
    const [members, setMembers] = useState([]);
    const [memberBuscado, setMemberBuscado] = useState(null);
    const [membersAdded, setMembersAdded] = useState([]);
    const [memberstoAdd, setMemberstoAdd] = useState([]);
    const [membersConnectedOfChat, setMembersConnectedOfChat] = useState(null);
    const [ChatName, setChatName] = useState();
    const [archives, setArchives] = useState(null);
    const [downloadAttempt, setDownloadAttempt] = useState(false);
    const [idFiletoDownload, setIdFiletoDownload] = useState(false);
    const [userAdmin, setUserAdmin] = useState(false);
    const [ModalOpen, setModalOpen] = useState(false);
    const [ModalAssignmentOpen, setModalAssignmentOpen] = useState(false);
    const { user } = useContext(UserContext);
    const [addMembersAtt, setAddMembersAtt] = useState(false);
    const [assignmentCreationAtt, setAssignmentCreationAtt] = useState(false);
    const [assignmentName, setAssignmentName] = useState(null);
    const [assignmentDescription, setAssignmentDescription] = useState(null);
    const [assignmentDue, setAssignmentDue] = useState(null);
    const [assignmentReward, setAssignmentReward] = useState(null);

    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        setMemberstoAdd([]);
        setMembersAdded([]);
    }

    const openModalAssignment = () => setModalAssignmentOpen(true);
    const closeModalAssignemnt = () => {
        setModalAssignmentOpen(false);
    }

    const handleUsersConnected = (data) => {
        setMembersConnectedOfChat(data);
    }

    const RemoveMemberAdded = (memberSelected) => {
        setMembersAdded(prevState => prevState.filter(usuario => usuario.matricula !== memberSelected.matricula));
    }
    useEffect(() => {
        if (!downloadAttempt) return;
        console.log(idFiletoDownload);

        fetch("Archivos/" + idFiletoDownload).
            then(response => response.json()).
            then(data => {
                const byteCharacters = atob(data.contenido);
                const byteNumbers = new Uint8Array(byteCharacters.length);

                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const DatatoDownload = new Blob([byteNumbers], { type: data.MIMEType });
                const url = URL.createObjectURL(DatatoDownload);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute('download', data.nombre);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }).
            catch(error => console.log("Hubo un error", error));

        setDownloadAttempt(false);
    }, [downloadAttempt]);

    const DownloadFile = (e) => {
        setIdFiletoDownload(Number(e.currentTarget.id));
        setDownloadAttempt(true);
    };

    useEffect(() => {
        if (!ChatID) return;
        setMembersConnectedOfChat([]);
        setArchives(null);
        fetch('Mensajes?ID_Chat=' + ChatID).
            then(response => response.json()).
            then(data => {
                const RestructuredArchive = data.filter(item => item.archivo !== null).filter(item => item.archivo.iD_Archivo >= 5)
                    .map(item => ({
                        Archive: item.archivo
                    }));
                setArchives(RestructuredArchive);

            });
    }, [ChatID]);

    useEffect(() => {
        if (!assignmentCreationAtt) return;

        const AssignmentCreation = {
            ID_Chat: ChatID,
            FechaFinalizacion: assignmentDue,
            Descripcion: assignmentDescription,
            Nombre: assignmentName,
            CalCoins: assignmentReward
        };

        const MembersAssignment = members.filter(member => member.matricula !== Number(user.Matricula));
        console.log(MembersAssignment);

        const AssignmentUser = {
            Tarea: AssignmentCreation,
            Usuarios: MembersAssignment
        }
        console.log(AssignmentUser);
        const AddAssignment = async () => {
            try {
                const response = await fetch('Tareas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(AssignmentUser),
                });

                const data = await response.json();
                //console.log(data);  // 
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                console.log("Tarea creada con exito", data);
                closeModalAssignemnt();
                setAssignmentDue(null);
                setAssignmentDescription(null);
                setAssignmentName(null);
                setAssignmentReward(null);
            }
            catch (error) {
                console.log("Hubo un error en la solicitud", error);
            }
        }
        AddAssignment();
        setAssignmentCreationAtt(false);
    }, [assignmentCreationAtt]);

    useEffect(() => {
        if (!addMembersAtt) return;

        const membersAddedFinal = membersAdded.map(memberAdded => ({
            Nombre: memberAdded.nombreCompleto,
            Matricula: memberAdded.matricula
        }));

        console.log(membersAddedFinal);
        const AddMembers = async () => {
            try {
                const response = await fetch('Chat/' + ChatID, {
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
        setUserAdmin(false);
        setMembersConnectedOfChat([]);

        console.log(ChatID);
        fetch("Chat/" + ChatID.toString() + "?IDChat=" + ChatID).
            then(response => response.json()).
            then(data => {
                setChatInfo(data.chatInfo);
                setMembers(data.integrantes);
                if (data.chatInfo.usuarioAdmin === Number(user.Matricula)) {
                    setUserAdmin(true);
                }
                else {
                    setUserAdmin(false);
                }
            }).catch(error => { console.log(error) });
    }, [ChatID]);

    useEffect(() => {
        if (!ChatID) return;
        setAssignments([]);
        fetch("Tareas/" + ChatID).
            then(response => response.json()).
            then(data => {
                console.log(data);
                setAssignments(data);
            }).catch(error => { console.error(error) });
    }, [ChatID]);

    useEffect(() => {
        fetch('usuarios?name=' + memberBuscado)
            .then(response => response.json())
            .then(data => {
                setMemberstoAdd(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [memberBuscado]);

    useEffect(() => {
        setMembersConnectedOfChat([]);
        console.log("Cambiaste de chat gg")
    }, [ChatID]);

    const handleClick = (usuario) => {
        console.log(usuario);
        setMembersAdded(prevState => [...prevState, usuario]);

    }

    const handleClickAddMembers = (e) => {
        e.preventDefault();
        setAddMembersAtt(true);
    }

    const handleAssignmentCreation = (e) => {
        e.preventDefault();
        setAssignmentCreationAtt(true);
    }

    const handleAssignmentClick = () => {
        if (userAdmin) {
            navigate('/ReviewAssignments');
        }
        else {
            navigate('/Assignments');

        }
    }

    return (
        <div id="content-container" className="flex h-screen w-2/3 xs:w-3/4">
            <div id="chat-container" className="flex flex-col justify-between h-full w-3/4 px-2">
                {members.length <= 2 && (
                    <div className="h-[10%]">
                        <Link to="/videochat">
                            <VideocamIcon className="bg-primary p-px rounded-full" />
                        </Link>
                    </div>)}
                <Chat onMembersConnected={handleUsersConnected} />
            </div>

            <div className="chatinfo-container container w-1/4 h-full bg-comp-1 px-4">
                <div className="groupinfo items-center flex flex-col">

                    <img src={GroupImg} className="rounded-full w-3/4 h-3/4 xs:w-5/6 xs:h-5/6 my-4" />
                    <p id="groupname" className="text-primary font-bold text-mdxs:text-xl"> {ChatInfo.nombre}</p>
                </div>

                <div id="members-container" className="my-2">
                    <h3 className="text-xs xs:text-lg font-bold text-primary"> integrantes: </h3>
                    <div id="memberslist" className="space-y-2">
                        <ul className="bg-color rounded-xl p-3 text-color h-48 text-xs space-y-4 overflow-y-auto flex flex-col">
                            {members && members.map(member => {
                                const isConnected = membersConnectedOfChat.some(connectedMember => Number(connectedMember) === member.matricula);
                                console.log(`Member: ${member.matricula}, Connected: ${isConnected}`);
                                return (
                                    <li key={member.matricula} className="flex items-center space-x-5">
                                        {isConnected ? (
                                            <div className="bg-secondary w-2 h-1/2 rounded-full"></div>
                                        ) : (
                                            <div className="bg-red-900 w-2 h-1/2 rounded-full"></div>
                                        )}
                                        <p>{member.nombre}</p>
                                    </li>
                                );
                            })}
                        </ul>
                        <button id="AgregarIntegrante" onClick={openModal} className="flex font-bold items-center bg-primary w-full justify-center py-1 rounded-xl xs:text-lg text-xs"><AddIcon /> Agregar Integrante </button>
                    </div>
                    <Modal show={ModalOpen} handleClose={closeModal}>
                        <h1 className="font-bold text-4xl text-center text-color">Buscar <span className="text-secondary">Integrante</span></h1>
                        <form>
                            <label htmlFor="AddUser" className="font-semibold text-color">Integrante:</label>
                            <input id="AddUser" value={memberBuscado} onChange={(e) => { setMemberBuscado(e.target.value) }} type="text" className="inputline w-full bg-transparent outline-none border-b-2 text-white border-[var(--primary-color)]" />
                            <ul className="flex flex-col h-full w-full overflow-y-scroll bg-color rounded-md p-2 text-primary text-sm space-y-2">
                                {membersAdded && membersAdded.map(usuarioselec => (
                                    <li key={usuarioselec.matricula} className="UserFound p-1 rounded-sm bg-primary text-comp-1 justify-between flex w-full">
                                        <div><span>{usuarioselec.nombreCompleto} </span>
                                        </div>
                                        <button onClick={() => RemoveMemberAdded(usuarioselec)}><RemoveIcon /></button>
                                    </li>
                                ))}
                                {membersAdded && (
                                    <li>
                                        <div className="w-full h-px bg-primary"></div>
                                    </li>)
                                }

                                {members && memberstoAdd
                                    .filter(usuario => usuario.matricula !== Number(user.Matricula))
                                    .filter(usuario => !members.some(selec => selec.matricula === usuario.matricula))
                                    .filter(usuario => !membersAdded.some(selec => selec.matricula === usuario.matricula))
                                    .map(usuario => (
                                        <li onClick={() => handleClick(usuario)} key={usuario.matricula} className="UserFound p-1 rounded-sm">
                                            <span>{usuario.nombreCompleto} </span>
                                        </li>
                                    ))}
                            </ul>
                            <button id="CreateChat" onClick={handleClickAddMembers} type="submit" className="w-1/2 self-center py-1 font-semibold rounded-md text-color">Agregar</button>
                        </form>
                    </Modal>
                </div>

                <div id="Tasks-container">
                    <div className="flex">
                        {userAdmin && (
                            <div className="flex items-center text-color text-xs">
                                <AddIcon onClick={openModalAssignment} />
                                <Modal show={ModalAssignmentOpen} handleClose={closeModalAssignemnt}>
                                    <div>
                                        <form className="flex flex-col space-y-2">
                                            <h1 className="text-3xl font-bold text-center">Crear <span className="text-secondary">Tarea</span></h1>
                                            <div>
                                                <label htmlFor="AssignmentName" className="font-semibold text-color">Nombre de Tarea:</label>
                                                <input value={assignmentName} onChange={(e) => { setAssignmentName(e.target.value) }} id="AssignmentName" type="text" className="inputline w-full bg-transparent outline-none border-b-2 text-white border-[var(--primary-color)]" />
                                            </div>
                                            <div>
                                                <label htmlFor="AssignmentDescription" className="font-semibold text-color">Descripcion:</label>
                                                <input value={assignmentDescription} onChange={(e) => { setAssignmentDescription(e.target.value) }} id="AssignmentDescription" type="text-area" className="justify-start w-full h-36 bg-color rounded-md" />
                                            </div>
                                            <div className="flex justify-between">
                                                <div>
                                                    <label htmlFor="FinalDate" >Fecha de Vencimiento</label>
                                                    <input value={assignmentDue} onChange={(e) => { setAssignmentDue(e.target.value) }} id="FinalDate" type="date" className="w-full" />
                                                </div>
                                                <div className="w-1/2">
                                                    <label htmlFor="Reward"> CalCoins </label>
                                                    <input value={assignmentReward} onChange={(e) => { setAssignmentReward(e.target.value) }} id="Reward" type="number" className="inputline w-full bg-transparent outline-none border-b-2 text-white border-[var(--primary-color)]" />
                                                </div>
                                            </div>
                                            <button onClick={handleAssignmentCreation} className="items-center font-bold"> Crear</button>
                                        </form>
                                    </div>
                                </Modal>
                            </div>)}
                        <h3 className="text-md xs:text-xl font-bold text-primary">Tarea(s):</h3>
                    </div>
                    <div className='taskslist h-80 md:h-36 flex-grow overflow-hidden'>
                        <ul className="overflow-y-auto h-36">
                            {assignments && assignments.map(assignment => {
                                return (
                                    <li key={assignment.iD_Tareas} onClick={handleAssignmentClick} className="cursor-pointer flex items-center py-2 border-b-2 border-[var(--primary-color)]">
                                        <div className="icon-container text-background"><AssignmentIcon style={{ fontSize: "32px" }} /></div>
                                        <div className="taskinfo-container">
                                            <h4 className="text-xs font-bold text-primary">{assignment.nombre}</h4>
                                            <p className="text-xs text-primary">Vencimiento: {new Date(assignment.fechaFinalizacion).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric"
                                            })
                                            }</p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                <div id="Documents-container">
                    <h3 className="text-md xs:text-xl font-bold text-primary">Documentos(s):</h3>
                    <div className="h-16 overflow-y-auto space-y-2 text-comp-1">
                        {archives && archives.map(ArchiveCaught => {
                            return (
                                <div className="flex text-xs items-center justify-between bg-primary rounded-md" key={ArchiveCaught.Archive.iD_Archivo}>
                                    <div className="flex items-center">
                                        <InsertDriveFileIcon /> <p className="text-xs font-semibold"> {ArchiveCaught.Archive.nombre}</p>
                                    </div>
                                    <div className="cursor-pointer" id={ArchiveCaught.Archive.iD_Archivo} onClick={DownloadFile}>
                                        <DownloadIcon />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chats;