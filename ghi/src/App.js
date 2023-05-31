import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
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

// example imports
import Example from "./mock-pages/Example";

function App() {
  // const basename = 'localhost:3000';

  return (
    <div className="container">
      <BrowserRouter>
        <AuthProvider baseUrl="http://localhost:8000">
          <Navbar />
          <br />
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/signup" element={<SignupForm />} />
            <Route exact path="/login" element={<LoginForm />} />

            <Route exact path="/home" element={<Main />} />
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
