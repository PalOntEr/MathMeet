import {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import GroupImg from '../Images/DAMN.png'
import './SideBarInfo.css'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

import { Link } from 'react-router-dom'
function SideBarInfo() {
    const pagina = useLocation();
    console.log(pagina);
    if (pagina.pathname == '/Chats')
        return (
            <div className='SideBarInfo px-4 bg-comp-1 flex flex-col justify-between w-full'>
                <ul className="overflow-y-auto flex flex-col min-h-[96]">
                    <li id="Active" value="Group" className="cursor-pointer border-b-2 border-[var(--primary-color)] py-3 w-full justify-between flex flex-row">
                        <div className="flex flex-row w-full">
                            <img src={GroupImg} className="w-1/6 xs:w-1/5 ImgGroup rounded-full mx-2" />
                            <div className="w-full justify-center flex flex-col">
                                <h1 id="GroupName" className="text-xl xs:text-3xl text-color font-bold flex justify-between"> GRUPO 1 <span className="text-xs xs:text-sm font-bold text-background">9:54 AM</span></h1>
                                <p id="LastMessageSent" className="text-xs xs:text-sm text-color">Ultimo Mensaje Enviado</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <button id="AddChat" className="w-full rounded-xl font-bold py-1"><AddIcon /> Nuevo Chat </button>
            </div>

        );

    if (pagina.pathname === '/Shop')
        return (
            <div className='SideBarInfo h-full px-4 bg-comp-1 flex flex-col justify-between w-full'>
                <ul className="overflow-y-auto h-[98%]">
                    <li id="RewardContainer" className="border-b-2 border-[var(--primary-color)] py-3 flex">
                        <div className="text-background flex self-center"><WorkspacePremiumIcon style={{ fontSize: "50px" }} /></div>
                        <div className='GroupInformation'>
                            <h1 id="RewardName" className="text-2xl text-color font-bold flex">ENTREGA 10 TAREAS</h1>
                            <p id="Reward" className="text-sm text-color font-semibold">8/10 - 100 CalCoins</p>
                        </div>
                    </li>
                </ul>
            </div>
        );

    if (pagina.pathname === '/Assignments' || pagina.pathname === '/ReviewAssignments')
        return (
            <div className='SideBarInfo h-full px-4 bg-comp-1 flex flex-col justify-between w-full'>
                <ul className="overflow-y-auto h-[97%]">
                    <li id="TaskContainer" class="border-b-2 border-[var(--primary-color)] py-4 flex">
                        <div className='text-background'><AssignmentIcon style={{ fontSize: "50px" }} /></div>
                        <div className='text-color'>
                            <h1 id="TaskName" className="text-2xl font-bold">Nombre de Tarea</h1>
                            <p id="DateDue" className="text-sm font-semibold">Vencimiento 25/04/2024</p>
                        </div>
                    </li>
                </ul>
                <div id="AssignmentSwitch" className="flex h-[3%] justify-evenly space-x-2 my-4">
                    <button className="bg-primary w-full rounded-xl font-bold text-sm"><Link to="/Assignments">Assignments</Link></button>
                    <button className="bg-primary w-full rounded-xl font-bold text-sm"><Link to="/ReviewAssignments">Review Assignments</Link></button>
                </div>
            </div>
        );

    if (pagina.pathname === '/ModifyUser')
        return (
            <div className='SideBarInfo w-full h-full bg-comp-1 px-16 flex flex-col'>
                <h1 className="text-center text-primary text-5xl my-10 font-semibold">Modificar <span className="text-secondary">Usuario</span></h1>
                <form className="flex flex-col justify-evenly h-full">
                    <div className="inputbox space-y-4">
                        <p p className="text-primary font-bold">Nombre Completo</p>
                        <input className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' name="Matricula" type="text" />
                    </div>
                    <div className="inputbox space-y-4">
                        <p p className="text-primary font-bold">Matricula</p>
                        <input className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' name="Matricula" type="text" />
                    </div>
                    <div className="inputbox space-y-4">
                        <p p className="text-primary font-bold">Contraseña</p>
                        <input className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' name="Contraseña" type="password" />
                    </div>
                    <div className="inputbox space-y-4">
                        <p p className="text-primary font-bold">Confirmar Contraseña</p>
                        <input className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' name="Contraseña" type="password" />
                    </div>
                    <div>
                        <label htmlFor="TitleSelector" className="text-primary font-bold">Title</label>
                    <select className="w-full py-2 rounded-xl bg-color text-color font-semibold outline-none" name="TitleSelector" id="TitleSelector">
                        <option value="Title 0">Select a Title...</option>
                        <option value="Title 1">La Cabra</option>
                        <option value="Title 2">Calc's No. 1</option>
                        <option value="Title 3">Pro Mathlete</option>
                    </select>
                    </div>
                    <input type="submit" value="Update" className="bg-primary py-2 rounded-xl font-bold"/>
                </form>
            </div>
        );
}

export default SideBarInfo;