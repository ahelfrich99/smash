import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import "./SidebarButton.css";

export default function SidebarButtonSignup(props) {
    return (
        <Link to={props.to}>
        <div className='btn-body'>
            <IconContext.Provider value={{ size: "24px", className: "btn-icon" }}>
            {props.icon}
            <p className="btn-title">{props.title}</p>
            </IconContext.Provider>
        </div>
        </Link>
    );
}
