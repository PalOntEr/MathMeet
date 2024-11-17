import './SideBar.css'
import { useState, useEffect } from 'react';
import { SideBarData } from './SideBarData'
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import SideBarInfo from './SideBarInfo.jsx'
import Dropdown from 'rsuite/Dropdown';
import 'react-dropdown/style.css';
import { useLocation, useNavigate } from 'react-router-dom';

function SideBar() {
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const locationpaths = "/ModifyUser";
    const navigate = useNavigate();
    const locationpaths2 = "/videochat";
    const locationpaths3 = "/Shop";
    const [logOutAtt, setLogOutAtt] = useState(false);

    var SideBarWidth;
    var SideBar2Width;
    var SideBarColor;

    if (location.pathname === locationpaths2 || location.pathname === "/Shop") {
        SideBarWidth = '';
        SideBar2Width = 'w-full';
        SideBarColor = 'bg-comp-1';
    }
    else {
        if (location.pathname === locationpaths) {
            SideBarWidth = 'w-1/2';
        }
        else {
            SideBarWidth = 'w-1/4 md:w-1/3';
        }
        SideBarColor = '';
        SideBar2Width = 'w-16'
    }

    useEffect(() => {
        if (!logOutAtt) return;

        const LogOutUpdate = async () => {
            try {
                const response = await fetch("usuarios", {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        matricula: user.Matricula,
                        status: 0,
                        calCoins: 0
                    }),
                });

                const data = response.text();

                if (!response.ok) {
                    throw new Error("Hubo un error gg");
                }
                console.log(data);
                navigate("/");
            } catch (error) {
                console.error("Hubo un error en algun lado gg", error);
            }
            }

        LogOutUpdate();
            localStorage.setItem("user", null);
        });
    const handleLogOut = () => {
        setLogOutAtt(true);
    };
    return (
        <div className={"SideBar flex " + SideBarWidth}>
            <div className={'SideBarList flex flex-col items-center ' + SideBarColor + ' ' + SideBar2Width}>
                <div className="row-User text-primary flex items-center justify-center my-8">
                    <Dropdown placement="bottomEnd" animation="fade" trigger="click" icon={<PersonIcon style={{ fontSize: "32px" }} />}>
                        <div id="User-DropDown" className="font-bold text-comp-1 rounded-xl p-2 flex justify-center flex-col space-y-2 bg-primary absolute z-50">
                            <Dropdown.Item>
                                <Link to="/ModifyUser">
                                    <p className="text-xs">Modify User</p>
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <p className="text-xs" onClick={handleLogOut}>Log Out</p>
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
            <SideBarInfo />
        </div>
    );
}

export default SideBar;