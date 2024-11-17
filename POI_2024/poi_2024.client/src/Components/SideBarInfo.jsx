import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import { ChatContext } from '../ChatContext';
import { useAssignment } from '../AssignmentContext';
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
    const [assignments, setAssignments] = useState(null);
    const [ModalOpen, setModalOpen] = useState(false);
    const [usuarios, setUsuarios] = useState(null);
    const [ChatName, setChatName] = useState(null);
    const [usuariosSelec, setUsuariosSelec] = useState([]);
    const [ChatRegisterAtt, setChatRegisterAtt] = useState(false);
    const [updateUserAtt, setUpdateUserAtt] = useState(false);
    const [usuarioBuscado, setUsuarioBuscado] = useState(null);
    const [ChatsFound, setChatsFound] = useState([]);
    const [newPassword, setNewPassword] = useState(null);
    const [confirmNewPassword, setConfirmNewPassword] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [newNombreCompleto, setNewNombreCompleto] = useState(user.NombreCompleto);
    const [newEncrypt, setNewEncrypt] = useState(user.Encrypt);

    const pagina = useLocation();
    const { setIdTarea } = useAssignment();
    const { LoginUsuario } = useContext(UserContext);

    const { ChatID, ChatSelected } = useContext(ChatContext);

    const handleClickChat = (e) => {
        e.preventDefault();
        setChatRegisterAtt(true);
    }
    useEffect(() => {
        setAssignments(null);
        if (pagina.pathname === '/Assignments') {
            fetch("UsersTareas/" + user.Matricula + "," + false).
                then(response => response.json()).
                then(data => {
                     const filteredAssignments = data.filter(assignment => {
                    const assignmentDate = new Date(assignment.fechaFinalizacion);
                    const today = new Date();

                    // Strip the time from both dates for comparison
                    return assignmentDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0);
                });

                setAssignments(filteredAssignments);
                })
                .catch(error => console.log(error));
        }
        else {
            fetch("UsersTareas/" + user.Matricula + "," + true).
                then(response => response.json()).
                then(data => { const filteredAssignments = data.filter(assignment => {
                    const assignmentDate = new Date(assignment.fechaFinalizacion);
                    const today = new Date();

                    // Strip the time from both dates for comparison
                    return assignmentDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0);
                });

                setAssignments(filteredAssignments);
                })
                .catch(error => console.log(error));
        }
    }, [pagina]);

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
                    alert("Chat creado con exito");
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
            }).
            catch(error => {
                console.error(error);
            });
    }, [ChatID, ChatRegisterAtt]);

    useEffect(() => {
        if (!updateUserAtt) return;

        
        const UserUpdateInfo = {
            matricula: user.Matricula,
            nombreCompleto: newNombreCompleto,
            encrypt: newEncrypt,
            calCoins: 0,
            contrasena: newPassword
        };

        const UpdateUser = async () => {
            if (!(newPassword == confirmNewPassword)) {
                alert("La nueva contraseña no coincide");
                return
            };
            try {
                const response = await fetch('usuarios', {
                    method: 'PUT',
                    headers:
                    {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(UserUpdateInfo)
                });

                const data = await response.text();

                if (!response.ok) {
                    throw new Error("Hubo un error en la solicitud");
                }

                console.log(data);
                let UserToUpdate = JSON.parse(localStorage.getItem("user"));
                UserToUpdate.NombreCompleto = newNombreCompleto;
                UserToUpdate.UserName = newNombreCompleto;
                UserToUpdate.Encrypt = newEncrypt;
                localStorage.setItem("user", JSON.stringify(UserToUpdate));
                location.reload();

            } catch (error) {
                console.error("Hubo un error gg", error);
            }
        };

        UpdateUser();
        setUpdateUserAtt(false);

    }, [updateUserAtt]);


    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleChatChange = () => {

    }

    const handleClick = (usuario) => {
        console.log(usuario);
        setUsuariosSelec(prevState => [...prevState, usuario]);
    }

    const handleAssignmentClick = (e) => {
        setIdTarea(e.currentTarget.id);
    }

    const RemoveUser = (usuarioSelec) => {
        setUsuariosSelec(prevState => prevState.filter(usuario => usuario.matricula !== usuarioSelec.matricula));
    };
    if (usuarios === null) return (<p>Cargando...</p>);

    const handleUpdateUser = () => {
        setUpdateUserAtt(true);
    };

    if (pagina.pathname == '/Chats')
        return (
            <div className='SideBarInfo px-4 bg-comp-1 flex flex-col justify-between w-full'>
                <ul className="overflow-y-auto flex flex-col min-h-[96]">
                    {ChatsFound.map(ChatFound => (
                        <li key={ChatFound.iD_Chat} onClick={() => { ChatSelected(ChatFound.iD_Chat) }} value={ChatFound.iD_Chat} className="cursor-pointer border-b-2 border-[var(--primary-color)] py-3 w-full justify-between flex flex-row">
                            <div id={ChatFound.iD_Chat == ChatID ? "activeChat" : ""} className="flex flex-row w-full text-color px-2 py-3">
                                    <img src={"data:image/*;base64," + ChatFound.foto} className="w-1/6 xs:w-1/5 ImgGroup rounded-full mx-2" />
                                <div className="w-full justify-center flex flex-col">
                                    <h1 id="GroupName" className="text-xl xs:text-3xl font-bold flex justify-between">{ChatFound.nombre}</h1>
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
                        <button id="CreateChat" onClick={handleClickChat} type="submit" className="w-1/2 self-center py-1 font-semibold rounded-md text-color">Crear</button>
                    </form>
                </Modal>
            </div>

        );

    if (pagina.pathname === '/Assignments')
        return (
            <div className='SideBarInfo h-full px-4 bg-comp-1 flex flex-col justify-between w-full'>
                <ul className="overflow-y-auto h-[97%]">
                    {assignments && assignments.map(assignment => (
                        <li key={assignment.iD_Tareas} id={assignment.iD_Tareas} onClick={handleAssignmentClick} className="border-b-2 border-[var(--primary-color)] py-4 flex">
                            <div className='text-background'><AssignmentIcon style={{ fontSize: "50px" }} /></div>
                            <div className='text-color'>
                                <h1 id="TaskName" className="text-2xl font-bold">{assignment.nombre}</h1>
                                <p id="DateDue" className="text-sm font-semibold">
                                    Vencimiento: {new Date(assignment.fechaFinalizacion).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric"
                                    })}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
                <div id="AssignmentSwitch" className="flex h-[3%] justify-evenly space-x-2 my-4">
                    <button className="bg-primary w-full rounded-md font-bold text-xs"><Link to="/Assignments">Assignments</Link></button>
                    <button className="bg-primary w-full rounded-md font-bold text-xs"><Link to="/ReviewAssignments">Review Assignments</Link></button>
                </div>
            </div>
        );

    if (pagina.pathname === '/ReviewAssignments')
        return (
            <div className='SideBarInfo h-full px-4 bg-comp-1 flex flex-col justify-between w-full'>
                <ul className="overflow-y-auto h-[97%]">
                    {assignments && assignments.map(assignment => {
                        return (
                            <li key={assignment.iD_Tareas} id={assignment.iD_Tareas} onClick={handleAssignmentClick} className="border-b-2 border-[var(--primary-color)] py-4 flex">
                                <div className='text-background'><AssignmentIcon style={{ fontSize: "50px" }} /></div>
                                <div className='text-color'>
                                    <h1 id="TaskName" className="text-2xl font-bold">{assignment.nombre}</h1>
                                    <p id="DateDue" className="text-sm font-semibold">Vencimiento: {new Date(assignment.fechaFinalizacion).toLocaleDateString("en-GB", {
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
                <div id="AssignmentSwitch" className="flex h-[3%] justify-evenly space-x-2 my-4">
                    <button className="bg-primary w-full rounded-md font-bold text-xs"><Link to="/Assignments">Assignments</Link></button>
                    <button className="bg-primary w-full rounded-md font-bold text-xs"><Link to="/ReviewAssignments">Review Assignments</Link></button>
                </div>
            </div>
        );
    if (pagina.pathname === '/ModifyUser')
        return (
            <div className='SideBarInfo w-full h-full bg-comp-1 px-16 flex flex-col'>
                <h1 className="text-center text-primary text-5xl my-10 font-semibold">Modificar <span className="text-secondary">Usuario</span></h1>
                <div className="flex flex-col justify-evenly h-full">
                    <div className="inputbox space-y-4">
                        <p className="text-primary font-bold">Nombre Completo</p>
                        <input value={newNombreCompleto} onChange={(e) => { setNewNombreCompleto(e.target.value) }} className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' name="Matricula" type="text" />
                    </div>
                    <div className="inputbox space-y-4">
                        <p className="text-primary font-bold">Contraseña</p>
                        <input value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' name="Contraseña" type="password" />
                    </div>
                    <div className="inputbox space-y-4">
                        <p className="text-primary font-bold">Confirmar Contraseña</p>
                        <input value={confirmNewPassword} onChange={(e) => { setConfirmNewPassword(e.target.value) }} className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' name="Contraseña" type="password" />
                    </div>
                    <div className="inputbox w-full flex items-center space-x-2 justify-center">
                        <label htmlFor="Encrypt" className="text-color cursor-pointer">
                            Encriptar Mensajes
                        </label>
                        <input
                            id="Encrypt"
                            type="checkbox"
                            checked={newEncrypt}
                            onChange={() => { setNewEncrypt(!newEncrypt) }}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                    </div>
                    <button onClick={ handleUpdateUser } className="bg-primary py-2 rounded-xl font-bold" >Actualizar</button>
                </div>
            </div>
        );
}

export default SideBarInfo;