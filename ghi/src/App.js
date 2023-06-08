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
import SignupForm from "./login-signup/SignupForm";
import Groups from "./groups/GroupPage";
import GroupPosts from "./group_posts/GroupPostPage";
import ProfilePage from "./profile/ProfilePage";
import MyHomieList from "./homies/MyHomieList";
import HomieList from "./homies/HomieList";
import Homie from "./homies/Homie";
import useToken from "@galvanize-inc/jwtdown-for-react";
import PostsPage from "./posts/PostsPage";
import UseUser from "./useUser";
import GroupProfile from "./groups/GroupProfile"
import BangerzPage from "./bangerz/BangerzPage";
import BangerzForm from "./bangerz/BangerzForm";


function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  const { token } = useToken();
  const { user } = UseUser(token);

  // const { token } = useAuthContext();

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
          <Route exact path="/" element={<ProfilePage user={user} />} />
          <Route exact path="/profile" element={<ProfilePage user={user} />} />
          <Route
            exact
            path="myHomieList"
            element={<MyHomieList user={user} />}
          />
          <Route exact path="/homieList" element={<HomieList />} />
          <Route path="/homie/:id" element={<Homie user={user} />} />

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
          <Route path="bangerz">
              <Route exact path="" element={<BangerzPage />} />
              <Route exact path="new" element={<BangerzForm user={user} />} />
          </Route>
          <Route exact path="/home" element={<PostsPage />} />
        </Routes>

        <br />
        {/* <Footer /> */}

        <br />
      </BrowserRouter>
    </div>
  );
}

export default App;
