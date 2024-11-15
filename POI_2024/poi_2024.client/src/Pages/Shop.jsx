import SideBar from '../Components/SideBar.jsx'
import {useState, useRef, useEffect} from 'react';
import './Shop.css'


function Shop() {

    
    const [emotesFoundOfUser, setEmotesFoundOfUser] = useState(null);
    const [emotesFound, setEmotesFound] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    useEffect(() => {
        fetch("Premios").
        then(response => response.json()).
        then(data => setEmotesFound(data))
        .catch(error => console.error(error));
    },[]);

    useEffect(() => {
        fetch("UserEmotes?user=" + user.Matricula).
        then(response => response.json()).
        then(data => setEmotesFoundOfUser(data))
        .catch(error => console.error(error));
    },[]);

    const handlePurchaseEmote = async (e) => {
        if (user.calCoins < e.currentTarget.dataset.value) {
            alert("No te alcanza gg");
            return;
        }
        const alreadyOwned = emotesFoundOfUser.some(emote => emote.iD_Archivo === Number(e.currentTarget.id));
        if (alreadyOwned) {
            alert("Ya lo tienes gg");
            return;
        }
        const Price = e.currentTarget.dataset.value;
        const PremioToRegister = {
            matricula: user.Matricula,
            iD_Premio: e.currentTarget.id
        }
        try {
            const response = await fetch("UserEmotes", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(PremioToRegister)
            });

            const data = response.text();

            if (!response.ok) {
                throw new Error("Hubo un error en la solicitud de registrar un premio");
            }
            user.calCoins -= Price;

            alert("Emote Comprado!");
            localStorage.setItem("user", JSON.stringify(user));
            location.reload();
            console.log(data);
        } catch (error) {
            console.error("Hubo un error gg", error);
        }
    };
    return (
        <div className="container px-4 w-3/4 xs:w-2/3 flex flex-col justify-between">
            <h1 className="text-7xl font-bold text-primary text-center">MEET <span className="text-secondary">SHOP</span></h1>
            <div id="EmojisContainer" className="w-full">
                <h2 className="text-2xl font-semibold text-primary">EMOJIS</h2>
                <div className="h-1 bg-comp-1 my-1"></div>
                <div id="EmojisContainer" className="w-full bg-comp-1 flex overflow-x-auto whitespace-nowrap rounded-xl p-8 justify-between mt-2">
                    {emotesFound && emotesFound.map(emoteFound => {
                        const isOwned = emotesFoundOfUser.some(emoji => emoji.iD_Archivo === emoteFound.infoPremio.iD_Premio);
                        return (
                            <div
                                key={emoteFound.infoPremio.iD_Premio}
                                id={emoteFound.infoPremio.iD_Premio}
                                data-value={emoteFound.infoPremio.costo}
                                onClick={handlePurchaseEmote}
                                className="Emoji text-color w-1/6 min-w-[16%]"
                            >
                                <img src={"data:image/*;base64," + emoteFound.premioContenido} alt="CalcEmote1" className="w-auto h-auto" />
                                <h3 className="text-center font-bold text-sm xs:text-xl">
                                    {isOwned ? "Ya Comprado" : `${emoteFound.infoPremio.costo} CalCoins`}
                                </h3>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="flex space-x-4 w-full">
                <div id="AvatarContainer" className="flex flex-col">
                    <h2 className="text-2xl font-semibold text-primary mt-4">AVATAR OF THE DAY</h2>
                    <div className="h-1 bg-comp-1 my-1 w-full"></div>
                    <div className="bg-comp-1 rounded-xl p-6 w-full h-auto flex justify-center">
                        <div className='flex flex-col Emoji text-color w-1/2 h-auto items-center'>
                            <img className="w-1/3"/>
                            <h3 className="text-center font-bold text-xl">150 CalCoins</h3>
                        </div>
                    </div>
                    <p className="text-secondary text-2xl font-semibold">CalCoins: { user.calCoins}</p>
                </div>
            </div>
        </div>
    );
}

export default Shop;