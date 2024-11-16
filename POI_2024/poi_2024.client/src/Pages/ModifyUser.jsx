import {useState, useRef, useEffect} from 'react';
import SideBar from '../Components/SideBar.jsx'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Emote1 from '../Images/Calc Emote1.png'
import Emote3 from '../Images/Calc Emote3.png'
import Emote4 from '../Images/Calc Emote4.png'

function ModifyUser() {

    const PhotoRef = useRef();
    const [icons, setIcons] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    useEffect(() => {
        fetch("UserEmotes?user=" + user.Matricula)
            .then(response => response.json())
            .then(data => setIcons(data))
            .catch(error => console.error(error));
    }, []);

    const handleClickPhoto = async (e) => {
        PhotoRef.current.src = e.currentTarget.src;
        const idOfPhoto = e.currentTarget.id;

        const UserUpdate = {
            matricula: user.Matricula,
            iD_ArchivoFoto: idOfPhoto,
            calCoins: 0
        };

        try {
            const response = await fetch("usuarios",{
                method: "PUT",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(UserUpdate)
            });

            if (!response.ok) {
                throw new Error("Hubo un error al actualizar la foto");
            }

            let UserToUpdate = JSON.parse(localStorage.getItem("user"));
            UserToUpdate.userPhoto = idOfPhoto;
            localStorage.setItem("user", JSON.stringify(UserToUpdate));
            const data = response.text();

            console.log(data);
        } catch (error) {
            console.error("Hubo un error gg", error);
        }
    }

    useEffect(() => {
        fetch("Archivos/" + user.userPhoto)
            .then(response => response.json())
            .then(data => PhotoRef.current.src = "data:image/*;base64," + data.contenido)
            .catch(error => console.error(error));
    }, []);
        
    return (
            <div className="w-1/2 h-auto flex flex-col justify-evenly">
                <div className='h-1/2 w-full flex items-center justify-center'>
                <img ref={PhotoRef} alt="CalcEmote1" className="w-1/2 rounded-full bg-comp-1 p-6" />
                </div>
                <div className=' w-full flex flex-col items-center'>
                    <h4 className="text-2xl font-bold text-color text-center">Iconos Disponibles</h4>
                    <div id="EmojisContainer" className="w-2/3 bg-comp-1 flex overflow-x-auto whitespace-nowrap rounded-xl p-6 justify-center">
                    {icons && icons.map(icon => (
                        <div key={icon.iD_Archivo} className="w-1/6 min-w-[32%] h-1/5 text-color">
                            <img src={"data:image/*;base64," + icon.contenido} onClick={handleClickPhoto} id={icon.iD_Archivo} alt="CalcEmote1" className="w-auto h-auto" />
                    </div>
                    ))}
                </div>
                </div>
            </div>
    );
}

export default ModifyUser;