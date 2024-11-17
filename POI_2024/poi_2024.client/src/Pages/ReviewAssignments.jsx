import { useState, useEffect } from 'react';
import GroupImg from '../Images/DAMN.png'
import { useAssignment } from '../AssignmentContext';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Link } from 'react-router-dom'
import DownloadIcon from '@mui/icons-material/Download';


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
function ReviewAssignments() {

    const [assignmentsFound, setAssignmentsFound] = useState(null);
    const { idTarea, setIdTarea } = useAssignment();
    const [ModalOpen, setModalOpen] = useState(false);
    const [tareaFound, setTareaFound] = useState(false);
    const [tareaAccepted, setTareaAccepted] = useState(null);
    const [userAssignment, setUserAssignment] = useState(false);
    const [idTareaSelected, setIdTareaSelected] = useState(null);
    const [filesOfUser, setFilesOfUser] = useState(null);
    const [updateAtt, setUpdateAtt] = useState(false);
    const [downloadAttempt, setDownloadAttempt] = useState(false);
    const [idFiletoDownload, setIdFiletoDownload] = useState(false);

    useEffect(() => {
        if (!updateAtt) return;

        const UpdateTarea = async () => {
            try {
                const response = await fetch("UsersTareas", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        IDTarea: Number(idTareaSelected),
                        Matricula: userAssignment,
                        Accepted: tareaAccepted
                    })
                });

                if (!response.ok) {
                    console.error("Error actualizando tarea:", response.statusText);
                    return;
                }

                const result = await response.json();
                console.log("Actualizacion correcta: " , result);
            } catch (error) {
                console.error("Error actualizando tareaaa: " , error);
            }
        } 

        UpdateTarea();
        setUpdateAtt(false);
        location.reload();
    }, [updateAtt]);


    useEffect(() => {
        setIdTareaSelected(idTarea);
    }, [idTarea])

    useEffect(() => {
        if (idTareaSelected == "null" || !idTareaSelected) return;

        fetch('UsersTareas/' + idTareaSelected).
            then(response => response.json()).
            then(data => {
                setAssignmentsFound(data);
            }).catch(error => console.error(error));

    }, [idTareaSelected]);


    useEffect(() => {
        if (!ModalOpen) return;
        setFilesOfUser([]);
        fetch("ArchivosTareas?IdTarea=" + idTareaSelected + "&Matricula=" + userAssignment).
            then(response => response.json()).
            then(data => setFilesOfUser(data))
            .catch(error => console.log(error));

    }, [ModalOpen, userAssignment])

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


    useEffect(() => {
        if (!ModalOpen) return;
        setFilesOfUser([]);

        fetch("Tareas?IDTarea=" + idTareaSelected).
            then(response => response.json()).
            then(data => setTareaFound(data))
            .catch(error => console.log(error));
    }, [ModalOpen, idTareaSelected]);
    const openModal = (e) => {
        setUserAssignment(e.currentTarget.value);
        setModalOpen(true)
    };
    const closeModal = () => setModalOpen(false);

    const handleClickReview = (Accepted) => {
        setTareaAccepted(Accepted);
        setUpdateAtt(true);
    };

    const DownloadFile = (e) => {
        setIdFiletoDownload(Number(e.currentTarget.id));
        setDownloadAttempt(true);
    };
    return (
        <div id="Review-Container" className="w-3/4 h-full justify-center items-center flex">
            <div id="Assignments-Container" className="flex bg-comp-1 w-5/6 h-5/6 p-4 rounded-xl">
                <ul className="w-full overflow-y-auto h-full">
                    {assignmentsFound && assignmentsFound.map((assignmentFound, index) => {
                        return (
                            <li key={index} value={assignmentFound.matricula} onClick={openModal} className="flex h-24 justify-between border-b-2 border-[var(--primary-color)] py-2">
                                <div className="flex space-x-4">
                                    <img src={"data:image/*;base64," + assignmentFound.contenido} className="w-auto h-auto rounded-full" />
                                    <h1 className="text-3xl font-bold text-primary self-center">{assignmentFound.nombreCompleto}</h1>
                                </div>
                                <h2 className="flex items-center font-bold text-primary text-2xl">{
                                    assignmentFound.status === 1 ? "No Entregado" :
                                        assignmentFound.status === 2 ? "Entregado" :
                                            assignmentFound.status === 3 ? "Aceptado" :
                                            assignmentFound.status === 5 ? "Reclamado" : "Rechazado"
                                }</h2>
                            </li>
                        )
                    })}
                </ul>
                <Modal show={ModalOpen} handleClose={closeModal}>
                    <div>
                        <h1 className="font-bold text-color text-center text-3xl m-6">{tareaFound.nombre}</h1>

                        <div className="">
                            <h2 className="text-secondary font-semibold">Documentos Entregados:</h2>
                            <ul className="bg-color rounded-md space-y-4 p-2 h-48 overflow-y-auto">
                                {filesOfUser && filesOfUser.map(fileOfUser => {
                                    return (
                                        <li key={fileOfUser.iD_Archivo} id={fileOfUser.iD_Archivo} className="flex bg-primary rounded-md text-comp-1 justify-between">
                                            <div className="flex">
                                            <InsertDriveFileIcon />
                                                <p>{fileOfUser.nombre}</p>
                                            </div>
                                            <button id={fileOfUser.iD_Archivo} onClick={DownloadFile}><DownloadIcon /></button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className ="flex justify-evenly text-color font-semibold mt-4">
                            <button onClick={() => { handleClickReview(3) }}>Aceptar</button>
                            <button onClick={() => { handleClickReview(4) }}>Rechazar</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default ReviewAssignments;