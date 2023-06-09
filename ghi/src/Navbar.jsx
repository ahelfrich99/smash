import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const { token, logout } = useToken();
  const navigate = useNavigate();

  const handleSignupClick = () => navigate("/signup");

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();

    navigate("/login");
  };

  return (
    <div className="mt-3 d-flex justify-content-between align-items-center">
      <h1 style={{ fontSize: "2rem" }}>
        <strong>S.M.A.S.H</strong>
      </h1>

      <div className="d-flex align-items-center">
        {token !== null && (
          <Link to="/profile" className="text-decoration-none">
            <button className="btn btn-outline-dark mx-2">Profile</button>
          </Link>
        )}
        {token !== null && (
          <Link to="/myHomieList" className="text-decoration-none">
            <button className="btn btn-outline-dark mx-2">My Homies</button>
          </Link>
        )}
        {token !== null && (
          <Link to="/homieList" className="text-decoration-none">
            <button className="btn btn-outline-dark mx-2">
              Discover Homies
            </button>
          </Link>
        )}
        {token !== null && (
          <Link to="/groups" className="text-decoration-none">
            <button className="btn btn-outline-dark mx-2">Find Groups</button>
          </Link>
        )}
        <div className="d-flex align-items-center">
          {token !== null && (
            <Link to="/group_posts" className="text-decoration-none">
              <button className="btn btn-outline-dark mx-2">Group Posts</button>
            </Link>
          )}
          {token !== null && (
            <Link to="/bangerz" className="text-decoration-none">
              <button className="btn btn-outline-dark mx-2">Bangerz</button>
            </Link>
          )}
          <Link to="/home" className="text-decoration-none">
            <button className="btn btn-outline-dark mx-2">Home</button>
          </Link>

          <div className="btn-group mb-3" role="group">
            {token && (
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout <i className="bi bi-box-arrow-left"></i>
              </button>
            )}
            {!token && (
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSignupClick}
              >
                Signup <i className="bi bi-person-plus"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
