import "bootstrap/dist/css/bootstrap.min.css";
import "./profile.css";
import ProfilePage from "./ProfilePage";
import ProfilePost from "./ProfilePost";

const Profile = ({ user }) => {


  //Return Profile Container
  return (
    <div className="profile-container">
      {user && (
        <>
          <div className="profile-post-container" style={{ width: "30%" }}>
            <ProfilePage user={user} />
          </div>
          <div className="profile-post-container" style={{ width: "70%" }}>
            <ProfilePost user={user.id} />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
