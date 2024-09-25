import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import VideocamIcon from '@mui/icons-material/Videocam';
import { useState } from 'react';

import { Link } from 'react-router-dom'

function VideoChat() {
    const [MicActivated, SetMicActivated] = useState(true);
    const [CamActivated, SetCamActivated] = useState(true);

    const handleMicClick = () => {
        SetMicActivated(!MicActivated);
    }
    const handleCamClick = () => {
        SetCamActivated(!CamActivated);
    }
    return (
        <div id="VideoChat-Container" className="w-full flex flex-row bg-comp-1">
            <div className="flex flex-col w-full justify-evenly">
                <div class="block h-2/3 w-full">
                    <div className="w-full h-full bg-primary rounded-2xl"></div>
                </div>
                <div className="flex h-1/3">
                    <div className="flex text-primary justify-evenly w-2/3 h-auto items-center">
                        <button onClick={handleCamClick}><Camera Activated={CamActivated} /></button>

                        <Link to="/Chats"><CallEndIcon style={{ fontSize: "100px" }} /></Link>

                        <button onClick={handleMicClick}><MicroPhone Activated={MicActivated} /></button>
                    </div>
                    <div class="h-full w-1/3 items-center flex">
                        <div className="w-full h-4/6 bg-primary rounded-2xl"></div>
                    </div>
                </div>
            </div>
            <div className="w-1/4 h-full bg-comp-1"></div>
        </div>
    );
}

function Camera(props) {
    if (props.Activated === true)
        return (
            <VideocamIcon style={{ fontSize: "100px" }} />
        );
    else
        return (<VideocamOffIcon style={{ fontSize: "100px" }} />);
}

function MicroPhone(props) {
    if (props.Activated === true)
        return (
            <MicIcon style={{ fontSize: "100px" }} />
        );
    else
        return (<MicOffIcon style={{ fontSize: "100px" }} />);
}
export default VideoChat;