import { AuthProvider, useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

// example imports
import Example from "./mock-pages/Example";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  const { token } = useAuthContext();

  return (
    <div className="container">
      <BrowserRouter basename={basename}>
        <Navbar />
        <br />
        <AuthProvider baseUrl={process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/signup" element={<SignupForm />} />
            <Route exact path="/login" element={<LoginForm />} />

            <Route exact path="/home" element={<Main token={token} />} />
            <Route exact path="/profile" element={<ProfilePage />} />
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
