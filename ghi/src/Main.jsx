import LoginForm from "./login-signup/LoginForm";
import "react-json-pretty/themes/monikai.css";
import useToken from "@galvanize-inc/jwtdown-for-react";
import ProfilePage from "./profile/ProfilePage";

export const Main = () => {
  const { token } = useToken();
  return (
    <div>
      {/* <BannerAlert /> */}
      {token ? <ProfilePage /> : <LoginForm />}
    </div>
  );
};
