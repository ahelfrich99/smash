import "bootstrap/dist/css/bootstrap.min.css";
import "./homie.css";
import { useParams } from "react-router-dom";

import Homie from "./Homie";
//import ProfilePost from "./ProfilePost";
import PostsPage from "../posts/PostsPage";


const HomieContainer = ({ user }) => {
const { id } = useParams();
// homie page container.
  return (
    <div className="homie-container">
      <div className="homie-post-container" style={{ width: "30%" }}>
        <Homie user={user} />
      </div>
      <div className="homie-post-container" style={{ width: "50%" }}>
        <PostsPage user={id} />
      </div>
    </div>
  );
};

export default HomieContainer;
