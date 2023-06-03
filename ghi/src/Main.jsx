import LoginForm from './login-signup/LoginForm';
import ProfilePage from './profile/ProfilePage';
// import 'bootstrap/dist/js/bootstrap.bundle';
import "react-json-pretty/themes/monikai.css";
import TokenCard from './token/TokenCard';
import UserDataCard from './token/UserDataCard';
import useToken from "@galvanize-inc/jwtdown-for-react";


export const Main = () => {
    const { token } = useToken();
    return (
      <div>
        {/* <BannerAlert /> */}
        { <TokenCard />}
        {<UserDataCard />}
      </div>
    );
};
