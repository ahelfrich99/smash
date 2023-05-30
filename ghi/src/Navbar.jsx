import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
    const { logout } = useToken();
    const navigate = useNavigate();
    const handleSignupClick = () => navigate('/signup');
    const handleLogoutClick = () => {
        logout({ returnTo: '/login' });
    };

    return (
        <div className="mt-3 d-flex justify-content-between align-items-center">
            <h1 style={{ fontSize: "2rem" }}>
            <strong>S.M.A.S.H</strong>
            </h1>
            <div className="d-flex align-items-center">
            <Link to="/groups" className="text-decoration-none">
                <button className="btn btn-outline-dark mx-2">Group Page</button>
            </Link>
            <div className="btn-group" role="group">
                <button className="btn btn-danger" onClick={handleLogoutClick}>
                Logout <i className="bi bi-box-arrow-left"></i>
                </button>
                <button
                className="btn btn-success ms-2"
                onClick={handleSignupClick}
                >
                Signup <i className="bi bi-person-plus"></i>
                </button>
            </div>
            </div>
        </div>
    );
}

export default Navbar;
