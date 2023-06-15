import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import "./SidebarButtonLogout.css";

export default function SidebarButtonLogout(props) {
    return (
        <Link>
        <div className='btn-body1'>
            <IconContext.Provider value={{ size: "24px", className: "btn-icon" }}>
            {props.icon}
            <p className="btn-title1">{props.title}</p>
            </IconContext.Provider>
        </div>
        </Link>
    );
}
