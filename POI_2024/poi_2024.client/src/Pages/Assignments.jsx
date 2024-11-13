import { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../UserContext';
import AddIcon from '@mui/icons-material/Add';
import './Assignments.css';
import { useAssignment } from '../AssignmentContext';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import RemoveIcon from '@mui/icons-material/Remove';

function Assignments() {
    const [assignments, setAssignments] = useState(null);
    const [status, setStatus] = useState(null);
    const [assignmentAtt, setAssignmentAtt] = useState(false);
    const [rewardAtt, setRewardAtt] = useState(false);
    const [addFilesAssignmentAtt, setAddFilesAssignmentAtt] = useState(false);
    const { setIdTarea,idTarea  } = useAssignment();
    const [idOfFiles, setIdOfFiles] = useState([]);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef();
    const [idTareaSelected, setIdTareaSelected] = useState(null);
    useEffect(() => {
        setIdTareaSelected(idTarea);
    },[idTarea])

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!idTarea) return;
        console.log(idTarea);

        fetch("Tareas?IDTarea=" + idTarea).
            then(response => response.json()).
            then(data => {
                setAssignments(data);
                console.log(data);
            })
            .catch(error => console.log(error));
    }, [idTarea, addFilesAssignmentAtt]);

    useEffect(() => {
        if (!idTareaSelected) return;
        fetch("UsersTareas?IDTarea=" + idTareaSelected + "&Matricula=" + user.Matricula).
            then(response => response.text())
            .then(value => {
                console.log();
                switch (Number(value)) {
                    case 1: setStatus("No entregado");
                        break;
                    case 2: setStatus("Entregado");
                        break;
                    case 3: setStatus("Revisado");
                        break;
                    default: setStatus("Status no definido");
                        break;
                }
            }).catch(error => console.error("Hubo un error gg", error));
    }, [idTareaSelected, addFilesAssignmentAtt]);

    useEffect(() => {

        fetch("ArchivosTareas?IDTarea=" + idTareaSelected + "&Matricula=" + user.Matricula).
            then(response => response.json())
            .then(value => {
                console.log(value);
                const filereceived = value.map(item => ({
                    name: item.nombre
                }));

                setFiles(filereceived);
            })

    },[status]);

    useEffect(() => {
        if (!addFilesAssignmentAtt) return;
            for (const idFile of idOfFiles) {
                const FileAssignment = {
                    Matricula: user.Matricula,
                    ID_Archivo: idFile,
                    ID_Tarea: idTareaSelected
                }

                const registerFileAssignment = async () => {
                    try {
                        const response = await fetch("ArchivosTareas", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(FileAssignment),
                        });

                        const data = await response.json();
                        if (!response.ok) {
                            throw new Error("Error en la solicitud de registar un archivo con su tarea");
                        }
                        console.log("Archivo de tarea registrado con exito", data);
                    } catch (error) {
                        console.error("Hubo un error gg", error);
                    }
                }
                registerFileAssignment();
                setAddFilesAssignmentAtt(false);
            }
    }, [addFilesAssignmentAtt]);

    useEffect(() => {
        if (!assignmentAtt) return;
        for (const file of files) {

            const fileReader = new FileReader();

            fileReader.readAsArrayBuffer(file);
            fileReader.onload = () => {
                const arrayBuffer = fileReader.result;
                const base64stringFile = btoa(new Uint8Array(arrayBuffer)
                    .reduce((data, byte) => data + String.fromCharCode(byte), ""));

                const FileToUpload = {
                    Nombre: file.name,
                    MIMEType: file.type,
                    tamano: file.size,
                    Contenido: base64stringFile
                };

                const RegisterFile = async () => {
                    try {
                        const response = await fetch('Archivos', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(FileToUpload),
                        });
                        const data = await response.json();
                        if (!response.ok) {
                            throw new Error("Error en la solicitud");
                        }
                        console.log("Archivo registrado con exito: " + data);
                        setIdOfFiles(prevIdOfFiles => [...prevIdOfFiles, data.iD_Archivo]);
                        setAddFilesAssignmentAtt(true);
                    }
                    catch (error) {
                        console.log("Eror al registrar archivo: " + error);
                    }
                }
                RegisterFile();
            }
        }
        setAssignmentAtt(false);
    }, [assignmentAtt, idTarea]);

    useEffect(() => {
        if (!rewardAtt) return;

        const UpdateCalCoins = {
            nombreCompleto: null,
            matricula: user.Matricula,
            contrasena: null,
            iD_ArchivoFoto: 0, 
            calCoins: assignments.calCoins

        };
        const AddReward = async () => {
            try {
                console.log(UpdateCalCoins);
                const response = await fetch('usuarios', {
                    method: 'PUT',
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    body: JSON.stringify(UpdateCalCoins)
                });
                const data = await response.text();
                if (!response.ok) {
                    throw new Error("Error actualizando calCoins");
                }
                console.log("CalCoins Agregadas:", data);
            }
            catch (error) {
                console.error("Hubo un error gg", error);
            }
        }
        AddReward();
        setRewardAtt(false);
    }, [rewardAtt]);
    const handleFileChange = (event) => {
        const newFiles = Array.from(event.target.files);
        setFiles(prevFiles => [...prevFiles, ...newFiles]);

    }
    const removeFile = (indexRemoved) => {
        setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexRemoved));
        fileInputRef.current.value = "";
    }

    const SendAssignment = () => {
        setAssignmentAtt(true);
    };

    const handleRewardClick = () => {
        setRewardAtt(true);

    }
    if (assignments)
        return (
            <div className='Content-container flex flex-col justify-between w-3/4 mx-2'>
                <div className="flex flex-col text-5xl w-full">
                    <h1 className="text-5xl text-secondary text-center font-bold">{assignments.nombre}</h1>
                    <div id="Description-Container" className=" space-y-2 my-8">
                        <h2 className="text-2xl font-bold text-color">Descripcion:</h2>
                        <div className="w-full min-h-80 bg-comp-1 p-4 rounded-xl">
                            <p className="text-lg text-white">{assignments.descripcion}</p>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-color">Work:</h2>
                    <div className="flex space-y-2 flex-col h-48 overflow-y-auto">
                        {files.length != 0 && files.map((file, index) => (
                            <div key={index} className="flex text-xs items-center bg-primary rounded-md w-1/2 justify-between">
                                <div className="flex items-center font-semibold">
                                    <InsertDriveFileIcon className="" />
                                    <p>{file.name}</p>
                                </div>
                                {status !== "Entregado" && (
                                    <button className="text-xs" onClick={() => removeFile(index)}><RemoveIcon /> </button>
                                )}
                            </div>
                        ))}
                        <label className="w-full h-full flex" htmlFor="AddWork"><AddIcon id="Icon-Button" className="text-primary bg-comp-1 rounded-xl" /></label>
                        <input type="file" id="AddWork" hidden ref={fileInputRef} onChange={handleFileChange} />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex">
                        {files.length !== 0 && (status !== "Entregado" && status !== "Revisado") && (
                            <button className="bg-primary p-1 rounded-xl" onClick={SendAssignment}>
                                Entregar
                            </button>
                        )}
                        <h4 className="text-primary p-2 rounded-xl bg-comp-1">Status: {status}</h4>
                    </div>
                    <div id="Status" className="flex font-bold text-lg">
                    {status !== "No Entregado" && (
                            <button className="text-color" onClick={handleRewardClick}>
                        Reclamar CalCoins.
                        </button>
                    )}
                        <h2 className="text-secondary">Recompensa: {assignments.calCoins} CalCoins.</h2>
                    </div>
                </div>
            </div>
        );
}

export default Assignments;