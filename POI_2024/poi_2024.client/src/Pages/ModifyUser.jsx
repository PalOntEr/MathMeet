import SideBar from '../Components/SideBar.jsx'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Emote1 from '../Images/Calc Emote1.png'
import Emote3 from '../Images/Calc Emote3.png'
import Emote4 from '../Images/Calc Emote4.png'

function ModifyUser() {
    return (
            <div className="w-1/2 h-auto flex flex-col justify-evenly">
                <div className='h-1/2 w-full flex items-center justify-center'>
                <img src={Emote1} alt="CalcEmote1" className="w-1/2 rounded-full bg-comp-1 p-6" />
                </div>
                <div className=' w-full flex flex-col items-center'>
                    <h4 className="text-2xl font-bold text-color text-center">Iconos Disponibles</h4>
                    <div id="EmojisContainer" className="w-2/3 bg-comp-1 flex overflow-x-auto whitespace-nowrap rounded-xl p-6 justify-center">
                    <div className="w-1/6 min-w-[32%] h-1/5 text-color">
                        <img src={Emote1} alt="CalcEmote1" className="w-auto h-auto" />
                    </div>
                    
                    <div class="w-1/6 min-w-[32%] h-1/5 text-color">
                        <img src={Emote4} alt="CalcEmote1" className="w-auto h-auto" />
                    </div>
                    <div class="w-1/6 min-w-[32%] h-1/5 text-color">
                        <img src={Emote3} alt="CalcEmote1" className="w-auto h-auto" />
                    </div>
                </div>
                </div>
            </div>
    );
}

export default ModifyUser;