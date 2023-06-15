// react imports
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

// sidebar imports
import './Sidebar.css'
import SidebarButton from "./sidebarButtons/SidebarButton";
import SidebarButtonLogout from "./sidebarButtons/SidebarButtonLogout";
import SidebarButtonSignup from "./sidebarButtons/SidebarButtonSignup";

// react icon imports
import {SiHomeadvisor} from 'react-icons/si'
import {BsFillFilePersonFill} from 'react-icons/bs'
import {BsFillPeopleFill} from 'react-icons/bs'
import {BsFillPersonPlusFill} from 'react-icons/bs'
import {MdLibraryMusic} from 'react-icons/md'
import {HiUserGroup} from 'react-icons/hi'
import {IoMdChatboxes} from 'react-icons/io'
import {HiLogin} from 'react-icons/hi'
import {HiLogout} from 'react-icons/hi'
import {HiFire} from 'react-icons/hi2'

const Sidebar = () => {
    const { token, logout } = useToken();
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();

        navigate('/login');
    };

    return (
        <div className="sidebar-container">
            <div>
                <img
                    src="https://i.imgur.com/FSGwmJ6.png"
                    className='profile-img'
                    alt='Logo'
                />
                <h1 className="profile-img-text">S.M.A.S.H</h1>
            </div>
            <div>
                <SidebarButton title="Home" to="/home" icon={<SiHomeadvisor />} />
                {token !== null && (
                <>
                <SidebarButton title="Profile" to="/profile" icon={<BsFillFilePersonFill />} />
                <SidebarButton title="My Homies" to="/myHomieList" icon={<BsFillPeopleFill />} />
                <SidebarButton title="Find Homies" to="/homieList" icon={<BsFillPersonPlusFill />} />
                <SidebarButton title="Bangerz" to="/bangerz" icon={<HiFire />} />
                <SidebarButton title="Find Groups" to="/groups" icon={<HiUserGroup />} />
                <SidebarButton title="Group Posts" to="/group_posts" icon={<IoMdChatboxes />} />
                </>
                )}
            </div>
            {token === null && (
                <>
                    <SidebarButton title="Login" to="/login" icon={<HiLogin />} />
                </>
            )}
            {token && (
                <button onClick={handleLogout} className="btn-trans">
                    <SidebarButtonLogout title="Logout" icon={<HiLogout />} />
                </button>
            )}
            {!token && (
                <>
                    <SidebarButtonSignup title="Signup" to="/signup" icon={<MdLibraryMusic />} />
                </>
            )}
        </div>
    );
}

export default Sidebar;
