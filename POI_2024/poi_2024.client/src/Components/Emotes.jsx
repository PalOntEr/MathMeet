import { useEffect, useState } from 'react';

function Emotes({ show, EmoteSent }) {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [emotesFound, setEmotesFound] = useState([]);

    useEffect(() => {
        fetch("UserEmotes?User=" + user.Matricula).
            then(response => response.json()).then(
                data => { setEmotesFound(data) });
    }, []);

    console.log(emotesFound);
    if (!show) return null;

    const sendEmote = (imageSelected, ID) => {
        imageSelected = imageSelected.replace("data:image/*;base64,", "");
        const Emote = {
            Emote: imageSelected,
            EmoteID: Number(ID)
        }
        EmoteSent(Emote);
    };

    return (
        <div className="">
            <div className="flex flex-wrap overflow-y-auto h-48 space-x-6 items-center justify-center">
                {emotesFound.map(emoteFound => (
                    <div key={emoteFound.iD_Archivo}>
                        <img id={emoteFound.iD_Archivo} src={"data:image/*;base64," + emoteFound.contenido} onClick={(e) => { sendEmote(e.target.src, e.target.id) }} className="w-32 h-32 Emoji"></img>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Emotes;