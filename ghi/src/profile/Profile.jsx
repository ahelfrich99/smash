import "bootstrap/dist/css/bootstrap.min.css";
import "./profile.css";
import ProfilePage from "./ProfilePage";
import PostsPage from "../posts/PostsPage";

const Profile = ({ user }) => {
  //Return Profile Container
  return (
    <div>
      {user && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {/* ProfilePage content */}
          <div className="profile-content" style={{ width: "25%" }}>
            <ProfilePage user={user} />
          </div>
          <div style={{ color: "transparent" }}>
            ProfilePost content
          </div>
          <div className="profile-posts" style={{ width: "70%" }}>
            <PostsPage user={user.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
