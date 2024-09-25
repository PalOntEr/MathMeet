import SideBar from '../Components/SideBar.jsx'
import Emote1 from '../Images/Calc Emote1.png'
import Emote2 from '../Images/Calc Emote2.png'
import Emote3 from '../Images/Calc Emote3.png'
import Emote4 from '../Images/Calc Emote4.png'
import Emote5 from '../Images/Calc Emote5.png'
import './Shop.css'


function Shop() {
    return (
            <div className="container px-4 ">
                <h1 className="text-7xl font-bold text-primary text-center mt-4 mb-12">MEET <span className="text-secondary">SHOP</span></h1>
                <h2 className="text-2xl font-semibold text-primary">EMOJIS</h2>
                <div className="h-1 bg-comp-1 my-1"></div>
                <div id="EmojisContainer" className="w-full bg-comp-1 flex overflow-x-auto whitespace-nowrap rounded-xl p-8 justify-between mt-2">
                    <div className="Emoji w-1/6 min-w-[16%] h-1/6 text-color">
                        <img src={Emote1} alt="CalcEmote1" className="w-auto h-auto" />
                        <h3 className="text-center font-bold text-xl">150 CalCoins</h3>
                    </div>
                    
                    <div className="Emoji w-1/6 min-w-[16%] h-1/6 text-color">
                        <img src={Emote2} alt="CalcEmote1" className="w-auto h-auto" />
                        <h3 className="text-center font-bold text-xl">150 CalCoins</h3>
                    </div>
                    <div className="Emoji w-1/6 min-w-[16%] h-1/6 text-color">
                        <img src={Emote3} alt="CalcEmote1" className="w-auto h-auto" />
                        <h3 className="text-center font-bold text-xl">150 CalCoins</h3>
                    </div>
                    <div className="Emoji w-1/6 min-w-[16%] h-1/6 text-color">
                        <img src={Emote4} alt="CalcEmote1" className="w-auto h-auto" />
                        <h3 className="text-center font-bold text-xl">150 CalCoins</h3>
                    </div>
                </div>
                <div className="flex space-x-4 h-auto">
                    <div id="TitlesContainer" className="w-2/3 flex flex-col justify-between">
                    <div>
                    <h2 className="text-2xl font-semibold text-primary mt-4">TITLES</h2>
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
                        <p className="text-secondary text-2xl font-semibold">CalCoins: 1500</p>
                    </div>
                    <div id="AvatarContainer" className="w-1/3 h-full">
                    <h2 className="text-2xl font-semibold text-primary mt-4">AVATAR OF THE DAY</h2>
                    <div className="h-1 bg-comp-1 my-1 w-full "></div>
                        <div className="w-full h-full bg-comp-1 rounded-xl p-6 justify-center flex">
                            <div className='flex flex-col Emoji text-color w-3/4 h-3/4'>
                            <img src={Emote5} className="w-auto h-auto"/>
                            <h3 className="text-center font-bold text-xl">150 CalCoins</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Shop;