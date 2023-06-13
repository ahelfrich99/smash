import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import "./SidebarButton.css";

export default function SidebarButtonLogout(props) {
    return (
        <Link>
        <div className='btn-body active'>
            <IconContext.Provider value={{ size: "24px", className: "btn-icon" }}>
            {props.icon}
            <p className="btn-title">{props.title}</p>
            </IconContext.Provider>
        </div>
        </Link>
    );
}
