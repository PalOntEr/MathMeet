import './SideBar.css'
import { useState } from 'react';
import { SideBarData } from './SideBarData'
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom'
import SideBarInfo from './SideBarInfo.jsx'
import Dropdown from 'rsuite/Dropdown';
import 'react-dropdown/style.css';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min.js';

function SideBar() {
    const location = useLocation();
    const locationpaths = "/ModifyUser";
    const locationpaths2 = "/VideoChat";
    var SideBarWidth;
    var SideBar2Width;
    var SideBarColor;

    if(location.pathname === locationpaths2)
    {
        SideBarWidth = '';
        SideBar2Width = 'w-full';
        SideBarColor = 'bg-comp-1';
    }
    else{
        if(location.pathname === locationpaths)
        {
            SideBarWidth = 'w-1/2';
        }
        else{
            SideBarWidth= 'w-1/4 md:w-1/3';
        }
        SideBarColor = '';
        SideBar2Width = 'w-16'
    }

    return (
        <div className={"SideBar flex " + SideBarWidth}>
            <div className={'SideBarList flex flex-col items-center ' + SideBarColor + ' ' + SideBar2Width}>
                <div className="row-User text-primary flex items-center justify-center my-8">
                    <Dropdown placement="bottomEnd" animation="fade" trigger="hover" icon={<PersonIcon style={{ fontSize: "32px" }} />}>
                        <div id="User-DropDown" className="font-bold text-comp-1 rounded-xl p-2 flex justify-center flex-col space-y-2 bg-primary">
                            <Dropdown.Item>
                                <Link to="/ModifyUser">
                                    <p className="text-xs">Modify User</p>
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link to="/">
                                    <p className="text-xs">Log Out</p>
                                </Link>
                            </Dropdown.Item>
                        </div>
                    </Dropdown>
                </div>
                <ul className="SideBarItems space-y-6">
                    {SideBarData.map((val, key) => {
                        return (
                            <li
                                className='row'
                                key={key}
                                id={window.location.pathname == val.link ? "active" : ""}
                            >
                                <Link to={val.link}>
                                    <div className="Icon">{val.icon}</div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>

            </div>
            <SideBarInfo/>
        </div>
    );
}

export default SideBar;