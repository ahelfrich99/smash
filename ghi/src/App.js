import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
// deployment is making get rid of useAuthContext from the above import
// if you need it just add it back in after pulling this
// - Adrianna
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
// import Profile from "./profile/Profile";
import PostsPage from "./posts/PostsPage";

// example imports
import Example from "./mock-pages/Example";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  // const { token } = useAuthContext();

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

            <Route exact path="/home" element={<PostsPage />} />

            {/* <Route exact path="/profile" element={<Profile />} /> */}
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
