import { AuthProvider, useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import { Main } from "./Main";
import LoginForm from "./login-signup/LoginForm";
import Navbar from "./Navbar";
// import { Footer } from "./Footer";
import SignupForm from "./login-signup/SignupForm";
import Groups from "./groups/GroupPage";
import GroupPosts from "./group_posts/GroupPostPage";
import ProfilePage from "./profile/ProfilePage";
import Homie from "./homies/Homie";
import useToken from "@galvanize-inc/jwtdown-for-react";


// example imports
import Example from "./mock-pages/Example";

// This function fetches the user data from the server.

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  const [userData, setUserData] = useState(null);
  const { fetchWithCookie } = useToken();

  // const { token } = useAuthContext();
  const handleFetchWithJFR = async () => {
    const data = await fetchWithCookie(
      `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`
    );
    setUserData(data);
  };

  useEffect(() => {
    handleFetchWithJFR();
  }, [userData]);
  return (
    <div className="container">
      <BrowserRouter basename={basename}>
        <Navbar />
        <br />
        <AuthProvider baseUrl={process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}>
          <Routes>
            {/* <Route exact path="/" element={<Main />} /> */}
            <Route exact path="/signup" element={<SignupForm />} />
            <Route exact path="/login" element={<LoginForm />} />

            <Route exact path="/main" element={<Main />} />
            <Route
              exact
              path="/"
              element={<ProfilePage userData={userData} />}
            />
            <Route
              exact
              path="/profile"
              element={<ProfilePage userData={userData} />}
            />
            <Route
              exact
              path="/homie"
              element={<Homie userData={userData} />}
            />
            <Route exact path="/mock" element={<Example />} />
            <Route exact path="/groups" element={<Groups />} />
            <Route exact path="/group_posts" element={<GroupPosts />} />
          </Routes>
          <br />
          {/* <Footer /> */}
        </AuthProvider>
        <br />
      </BrowserRouter>
    </div>
  );
}

export default App;
