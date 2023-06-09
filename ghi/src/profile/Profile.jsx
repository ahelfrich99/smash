import "bootstrap/dist/css/bootstrap.min.css";
import "./profile.css";
import ProfilePage from "./ProfilePage";
import PostsPage from "../posts/PostsPage";

const Profile = ({ user }) => {


  //Return Profile Container
  return (
    <div className="profile-container">
      {user && (
        <>
          <div className="profile-post-container" style={{ width: "65%" }}>
            <ProfilePage user={user} />
          </div>
          <div className="profile-post-container" style={{ width: "65%" }}>
            <PostsPage user={user.id} />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
