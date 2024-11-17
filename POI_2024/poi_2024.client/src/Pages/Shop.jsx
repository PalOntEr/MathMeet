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
        <div className="container px-4 w-full flex flex-col justify-between ml-14">
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
            <div className="flex space-x-4">
                <div id="TitlesContainer" className="w-full flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-primary mt-4">TITLES - Proximamente...</h2>
                        <div className="h-1 bg-comp-1 my-1"></div>
                        <div className="bg-comp-1 space-y-2 rounded-xl">
                            <div className="w-full p-4">
                                <div className="flex justify-between">
                                    <h4 className="text-secondary font-bold text-2xl">LA CABRA - 50 CalCoins</h4>
                                    <button className="bg-primary p-1 rounded-lg text-sm font-semibold">Comprar</button>
                                </div>
                            </div>
                            <div className="w-full p-4">
                                <div className="flex justify-between">
                                    <h4 className="text-secondary font-bold text-2xl">Calc's No. 1 - 50 CalCoins</h4>
                                    <button className="bg-primary p-1 rounded-lg text-sm font-semibold">Comprar</button>
                                </div>
                            </div>
                            <div className="w-full p-4">
                                <div className="flex justify-between">
                                    <h4 className="text-secondary font-bold text-2xl">Pro Matlete - 50 CalCoins</h4>
                                    <button className="bg-primary p-1 rounded-lg text-sm font-semibold">Comprar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-secondary text-2xl font-semibold">CalCoins: {user.calCoins }</p>
                </div>
            </div>
        </div>
    );
}

export default Shop;