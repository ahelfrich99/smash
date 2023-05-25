import LoginForm from './login-signup/LoginForm';
// import 'bootstrap/dist/js/bootstrap.bundle';
import "react-json-pretty/themes/monikai.css";
import TokenCard from './token/TokenCard';
import useToken from "@galvanize-inc/jwtdown-for-react";

const BannerAlert = () => {
    return (
        <div className="alert alert-info mt-3 mb-3" role="alert">
            <i className="bi bi-info-circle-fill"></i> Please log in with username and password.
        </div>
    );
};

export const Main = () => {
    const { token } = useToken();
    return (
        <div>
            <BannerAlert />
            {!token && <LoginForm />}
            {token && <TokenCard />}
        </div>
    );
};
