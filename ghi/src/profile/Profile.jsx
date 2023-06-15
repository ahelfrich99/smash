import "bootstrap/dist/css/bootstrap.min.css";
import "./profile.css";
import ProfilePage from "./ProfilePage";
import ProfilePost from "./ProfilePost";

const Profile = ({ user }) => {
  //Return Profile Container
  return (
    <div>
      {user && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {/* ProfilePage content */}
          <div className="profile-content" style={{ width: "100%" }}>
            <ProfilePage user={user} />
          </div>

          ProfilePost content
          <div className="profile-posts" style={{ width: "70%" }}>
            <ProfilePost user={user.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
