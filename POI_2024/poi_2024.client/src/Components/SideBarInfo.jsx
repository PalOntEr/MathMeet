import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import { ChatContext } from '../ChatContext';
import AddIcon from '@mui/icons-material/Add';
import GroupImg from '../Images/DAMN.png'
import './SideBarInfo.css'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';

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
function SideBarInfo() {
    const [ModalOpen, setModalOpen] = useState(false);
    const [usuarios, setUsuarios] = useState(null);
    const [ChatName, setChatName] = useState(null);
    const [usuariosSelec, setUsuariosSelec] = useState([]);
    const [ChatRegisterAtt, setChatRegisterAtt] = useState(false);
    const [usuarioBuscado, setUsuarioBuscado] = useState(null);
    const [ChatsFound, setChatsFound] = useState([]);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const { ChatID, ChatSelected } = useContext(ChatContext);

    const handleClickChat = (e) => {
        e.preventDefault();
        setChatRegisterAtt(true);
    }

    console.log(ChatID);
    useEffect(() => {
        if (!ChatRegisterAtt) return;
        const RegisterChat = async () => {
            try {
                const ChatRegister = {
                    ChatInfo: {
                        Nombre: ChatName,
                        UsuarioAdmin: user.Matricula,
                        ID_ArchivoFoto: 1
                    },
                    UsuarioList: usuariosSelec.map(user => ({ Matricula: user.matricula, Nombre: user.nombreCompleto }))
                };

        console.log(JSON.stringify(ChatRegister));
                // Realiza la solicitud POST a la API
                const response = await fetch('Chat', {  //la path de la api (sin el controller)
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(ChatRegister),  // convierte el objeto a JSON (que es lo que espera la api)
                });

                const data = response.text();
                console.log(data);
                if (data) {
                    console.log("Chat creado con exito.");
                }
                else { 
                    throw new Error('Error en Crear un usuario'); 
                }
                setChatRegisterAtt(false);
                setChatName("");
                setUsuarioBuscado("");
                setUsuariosSelec([]);
                closeModal();       
            } catch (error) {
                console.error('Error al registrar el usuario:', error);
                //alert("Hubo un error al registrar el usuario");
            }

        }

        RegisterChat();
    })

    useEffect(() => {
        fetch('usuarios?name=' + usuarioBuscado)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setUsuarios(data);
                })
                .catch(error => {
                    console.error(error);
                });
    }, [usuarioBuscado]);

    useEffect(() => {
        fetch('Chat?UserLoggedIn=' + Number(user.Matricula)).
            then(response => response.json()).
            then(data => {
                setChatsFound(data);
                console.log(ChatsFound);
            }).
            catch(error => {
                console.error(error);
            });
    },[user.Matricula]);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleChatChange = (IDChatSelected) => {
        ChatSelected(IDChatSelected);
    }

    const handleClick = (usuario) => {
        console.log(usuario);
        setUsuariosSelec(prevState => [...prevState,usuario]);
    }

    const RemoveUser = (usuarioSelec) => {
        setUsuariosSelec(prevState => prevState.filter(usuario => usuario.matricula !== usuarioSelec.matricula));
    };

    const pagina = useLocation();

    if (usuarios === null) return (<p>Cargando...</p>);

    if (pagina.pathname == '/Chats')
        return (
            <div className='SideBarInfo px-4 bg-comp-1 flex flex-col justify-between w-full'>
                <ul className="overflow-y-auto flex flex-col min-h-[96]">
                    {ChatsFound.map(ChatFound => (
                        <li key={ChatFound.iD_Chat} onClick={() => { ChatSelected(ChatFound.iD_Chat) }} value={ChatFound.iD_Chat} className="cursor-pointer border-b-2 border-[var(--primary-color)] py-3 w-full justify-between flex flex-row">
                            <div id={ChatFound.iD_Chat == ChatID ? "activeChat" : ""}  className="flex flex-row w-full text-color px-2 py-3">
                                <img src={GroupImg} className="w-1/6 xs:w-1/5 ImgGroup rounded-full mx-2" />
                                <div className="w-full justify-center flex flex-col">
                                    <h1 id="GroupName" className="text-xl xs:text-3xl font-bold flex justify-between">{ChatFound.nombre}<span className="text-xs xs:text-sm font-bold text-background">9:54 AM</span></h1>
                                    <p id="LastMessageSent" className="text-xs xs:text-sm">Ultimo Mensaje Enviado</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <button onClick={openModal} id="AddChat" className="w-full rounded-xl font-bold py-1"><AddIcon /> Nuevo Chat </button>
                <Modal show={ModalOpen} handleClose={closeModal}>
                    <h1 className="text-center font-bold text-4xl text-color">Crear <span className="text-secondary">Chat</span></h1>
                    <form className="flex flex-col space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="ChatName" className="text-primary" >Nombre del Chat</label>
                            <input id="ChatName" type="text" value={ChatName} onChange={(e) => setChatName(e.target.value)} className="inputLine w-full bg-transparent outline-none border-b-2 text-white border-[var(--primary-color)]" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="SearchMember" className="text-primary">Buscar Integrante</label>
                            <input id="SearchMember" type="text" value={usuarioBuscado} onChange={(e) => setUsuarioBuscado(e.target.value)} className="inputLine w-full bg-transparent outline-none border-b-2 text-white border-[var(--primary-color)]" />
                        </div>
                        <div className="h-64 flex flex-col justify-between">
                            <h2 className="font-bold text-lg text-color">Usuarios Encontrados: </h2>
                            <ul className="flex flex-col h-full w-full overflow-y-scroll bg-color rounded-md p-2 text-primary text-sm space-y-2">
                                {usuariosSelec && usuariosSelec.map(usuarioSelec => (
                                    <li key={usuarioSelec.matricula} className="UserFound p-1 rounded-sm bg-primary text-comp-1 justify-between flex w-full">
                                        <div><span>{usuarioSelec.nombreCompleto} </span>
                                        </div>
                                        <button onClick={() => RemoveUser(usuarioSelec)}><RemoveIcon /></button>
                                    </li>
                                ))}
                            <li>
                                    <div className="w-full h-px bg-primary"></div>
                                </li>
                                {usuarios
                                    .filter(usuario => usuario.matricula !== Number(user.Matricula))
                                    .filter(usuario => !usuariosSelec.some(selec => selec.matricula === usuario.matricula))
                                    .map(usuario => (
                                    <li onClick={() => handleClick(usuario)} key={usuario.matricula} className="UserFound p-1 rounded-sm">
                                        <span>{usuario.nombreCompleto} </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button id="CreateChat" onClick={handleClickChat } type="submit" className="w-1/2 self-center py-1 font-semibold rounded-md text-color">Crear</button>
                    </form>
                </Modal>
            </div>

        );

    if (pagina.pathname === '/Shop')
        return (
            <div className='SideBarInfo h-full px-4 bg-comp-1 flex flex-col justify-between w-full'>
                <ul className="overflow-y-auto h-[98%]">
                    <li id="RewardContainer" className="border-b-2 border-[var(--primary-color)] py-3 flex">
                        <div className="text-background flex self-center"><WorkspacePremiumIcon style={{ fontSize: "50px" }} /></div>
                        <div className='GroupInformation'>
                            <h1 id="RewardName" className="text-2xl text-color font-bold flex">ENTREGA 10 TAREAS</h1>
                            <p id="Reward" className="text-sm text-color font-semibold">8/10 - 100 CalCoins</p>
                        </div>
                    </li>
                </ul>
            </div>
        );

    if (pagina.pathname === '/Assignments' || pagina.pathname === '/ReviewAssignments')
        return (
            <div className='SideBarInfo h-full px-4 bg-comp-1 flex flex-col justify-between w-full'>
                <ul className="overflow-y-auto h-[97%]">
                    <li id="TaskContainer" class="border-b-2 border-[var(--primary-color)] py-4 flex">
                        <div className='text-background'><AssignmentIcon style={{ fontSize: "50px" }} /></div>
                        <div className='text-color'>
                            <h1 id="TaskName" className="text-2xl font-bold">Nombre de Tarea</h1>
                            <p id="DateDue" className="text-sm font-semibold">Vencimiento 25/04/2024</p>
                        </div>
                    </li>
                </ul>
                <div id="AssignmentSwitch" className="flex h-[3%] justify-evenly space-x-2 my-4">
                    <button className="bg-primary w-full rounded-xl font-bold text-sm"><Link to="/Assignments">Assignments</Link></button>
                    <button className="bg-primary w-full rounded-xl font-bold text-sm"><Link to="/ReviewAssignments">Review Assignments</Link></button>
                </div>
            </div>
        );

    if (pagina.pathname === '/ModifyUser')
        return (
            <div className='SideBarInfo w-full h-full bg-comp-1 px-16 flex flex-col'>
                <h1 className="text-center text-primary text-5xl my-10 font-semibold">Modificar <span className="text-secondary">Usuario</span></h1>
                <form className="flex flex-col justify-evenly h-full">
                    <div className="inputbox space-y-4">
                        <p p className="text-primary font-bold">Nombre Completo</p>
                        <input className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' name="Matricula" type="text" />
                    </div>
                    <div className="inputbox space-y-4">
                        <p p className="text-primary font-bold">Matricula</p>
                        <input className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' name="Matricula" type="text" />
                    </div>
                    <div className="inputbox space-y-4">
                        <p p className="text-primary font-bold">Contraseña</p>
                        <input className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' name="Contraseña" type="password" />
                    </div>
                    <div className="inputbox space-y-4">
                        <p p className="text-primary font-bold">Confirmar Contraseña</p>
                        <input className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' name="Contraseña" type="password" />
                    </div>
                    <div>
                        <label htmlFor="TitleSelector" className="text-primary font-bold">Title</label>
                        <select className="w-full py-2 rounded-xl bg-color text-color font-semibold outline-none" name="TitleSelector" id="TitleSelector">
                            <option value="Title 0">Select a Title...</option>
                            <option value="Title 1">La Cabra</option>
                            <option value="Title 2">Calc's No. 1</option>
                            <option value="Title 3">Pro Mathlete</option>
                        </select>
                    </div>
                    <input type="submit" value="Update" className="bg-primary py-2 rounded-xl font-bold" />
                </form>
            </div>
        );
}

export default SideBarInfo;