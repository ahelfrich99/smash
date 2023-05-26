import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { logout } = useToken();
    const navigate = useNavigate();
    const handleSignupClick = () => navigate('/signup');
    const handleLogoutClick = () => {
        logout({ returnTo: '/login' });
    };

    return (
        <div className="mt-3">
            <span className="d-flex">
            <h1 className="flex-fill" style={{ fontSize: '2rem' }}>
                <strong>S.M.A.S.H</strong>
            </h1>
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group me-2 mb-3" role="group">
                <div className="btn-group mb-3" role="group">
                    <button className="btn btn-danger" onClick={handleLogoutClick}>
                    Logout <i className="bi bi-skip-backward-fill"></i>
                    </button>

                    <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSignupClick}
                    >
                    Signup <i className="bi bi-music-note-list"></i>
                    </button>
                </div>
                </div>
            </div>
            </span>
        </div>
    );
}

export default Navbar;
