// deployment is making get rid of useAuthContext from the above import
// if you need it just add it back in after pulling this
// - Adrianna
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import { Main } from "./Main";
import LoginForm from "./login-signup/LoginForm";
import Sidebar from "./sidebar/Sidebar";
import SignupForm from "./login-signup/SignupForm";
import Groups from "./groups/GroupPage";
import GroupPosts from "./group_posts/GroupPostPage";
import MyHomieList from "./homies/MyHomieList";
import HomieList from "./homies/HomieList";
import useToken from "@galvanize-inc/jwtdown-for-react";
import PostsPage from "./posts/PostsPage";
import UseUser from "./useUser";
import GroupProfile from "./groups/GroupProfile";
import Profile from "./profile/Profile";
import BangerzPage from "./bangerz/BangerzPage";
import HomieContainer from "./homies/HomieContainer";

// example imports
import Example from "./mock-pages/Example";

// This function fetches the user data from the server.

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  const { token } = useToken();
  const { user } = UseUser(token);

  return (
    <div className="main-body">
      <BrowserRouter basename={basename}>
        <Sidebar />
        <br />
        <Routes>
          <Route exact path="/signup" element={<SignupForm />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/" element={<Main />} />
          <Route exact path="/useUser" element={<UseUser />} />
          <Route path="/profile" element={<Profile user={user} />} />

          <Route
            exact
            path="myHomieList"
            element={<MyHomieList user={user} />}
          />
          <Route exact path="/homieList" element={<HomieList user={user} />} />
          <Route path="/homie/:id" element={<HomieContainer user={user} />} />
          <Route
            path="/homie/followed/:id"
            element={<HomieContainer user={user} />}
          />
          <Route exact path="/mock" element={<Example />} />
          <Route exact path="/groups" element={<Groups />} />
          <Route
            exact
            path="/groups/:id"
            element={<GroupProfile user={user} />}
          />
          <Route
            exact
            path="/group_posts"
            element={<GroupPosts user={user} />}
          />
          <Route exact path="/home" element={<PostsPage user={user} />} />
          <Route exact path="/bangerz" element={<BangerzPage user={user} />} />
          <Route exact path="/home" element={<PostsPage />} />
          <Route exact path="/mock" element={<Example />} />
        </Routes>
        <br />
        <br />
      </BrowserRouter>
    </div>
  );
}

export default App;
