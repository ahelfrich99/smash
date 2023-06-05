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
import HomieList from "./homies/HomieList";
import useToken from "@galvanize-inc/jwtdown-for-react";
// example imports
import Example from "./mock-pages/Example";
import UseUser from "./useUser";

// This function fetches the user data from the server.

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  const { token, logout } = useToken();
  const { user } = UseUser(token);


  return (
    <div className="container">
      <BrowserRouter basename={basename}>

          <Navbar />
          <br />

          <Routes>
            {/* <Route exact path="/" element={<Main />} /> */}

            <Route exact path="/signup" element={<SignupForm />} />
            <Route exact path="/login" element={<LoginForm />} />

            <Route exact path="/" element={<Main />} />
            <Route exact path="/useUser" element={<UseUser />} />
            <Route
              exact
              path="/"
              element={
                <ProfilePage
                  user={user}
                />
              }
            />
            <Route
              exact
              path="/profile"
              element={
                <ProfilePage
                 user={user}

                />
              }
            />
            <Route exact path="homieList" element={<HomieList />} />
            <Route exact path="/mock" element={<Example />} />
            <Route exact path="/groups" element={<Groups />} />
            <Route exact path="/group_posts" element={<GroupPosts />} />
          </Routes>
          <br />
          {/* <Footer /> */}

        <br />
      </BrowserRouter>
    </div>
  );
}

export default App;
