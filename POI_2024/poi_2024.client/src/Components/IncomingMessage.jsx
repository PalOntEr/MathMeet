import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './IncomingMessage.css';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import Map from './Map.jsx'

const IncomingMessage = ({ Emote, message, sender, DateSent, Archive, userFoto, location }) => {
    const date = new Date(DateSent);
    const formattedDate = format(date, 'MM/dd/yyyy hh:mm:ss a');
    const [downloadAttempt, setDownloadAttempt] = useState(false);
    const [idFiletoDownload, setIdFiletoDownload] = useState(false);
    const position = (() => {
        const match = message.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
        return match ? { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) } : { latitude: 0, longitude: 0 };
    })();


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
    if (Archive && Archive.iD_Archivo <= 5)
        return (
            <div className="incoming-message-container bg-comp-1 rounded-md w-1/3 px-3 py-2 m-3"><div className="flex items-center">
                <img className="h-10 rounded-full" src={"data:image/*;base64," + userFoto.contenido} />
                <div className="outgoing-message-sender text-color opacity-60 text-xs">{sender}</div>
            </div>
                <img className="incoming-message-content text-color" src={"data:image/*;base64," + Archive.contenido} />
                <div className="incoming-message-time text-color opacity-40 text-end">{formattedDate}</div>
            </div>
        );

    return location ? (
            <div className="z-0 incoming-message-container bg-comp-1 rounded-md w-1/3 px-3 py-2 m-3 space-y-2">
                <div className="flex items-center">
                    <img className="h-10 rounded-full" src={"data:image/*;base64," + userFoto.contenido} />
                <div className="incoming-message-sender text-color opacity-60 text-xs">{sender}</div>
                </div>
                <Map latitude={position.latitude} longitude={position.longitude} />
            <div className="incoming-message-time text-color opacity-40 text-end">{formattedDate}</div>
            </div>
        ) :
        (
            <div className="incoming-message-container bg-comp-1 rounded-md w-1/3 px-3 py-2 m-3 space-y-2">
                <div className="flex items-center">
                    <img className="h-10 rounded-full" src={"data:image/*;base64," + userFoto.contenido} />
                    <div className="outgoing-message-sender text-color opacity-60 text-xs">{sender}</div>
                </div>
                {Archive && (
                    <div className="incoming-message-content flex bg-primary text-comp-1 font-bold justify-between p-2 rounded-md items-center">
                        <InsertDriveFileIcon />
                        <p className="">{Archive.nombre}</p>
                        <div className="cursor-pointer" id={Archive.iD_Archivo} onClick={DownloadFile}>
                            <DownloadIcon />
                        </div>
                    </div>
                )}
                <div className="outgoing-message-content text-color" style={{ wordWrap: 'break-word' }}>{message}</div>
                <div className="incoming-message-time text-color opacity-40 text-end">{formattedDate}</div>
            </div>
        );
};

export default IncomingMessage;