import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";



const ProfilePage = ({ user}) => {
  const { token } = useToken();
  const [profileImageB64, setProfileImageB64] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const { fetchWithCookie } = useToken();

  // This function fetches the profile image from the server.
  const fetchImage = async () => {

    //console.log("!!!Profile " +token);
    try {
      let imageId = "";
      if (user && user.profile_img) {
        imageId = user.profile_img;
      }


      if (!imageId) {
        // Handle case when there is no image
        return;
      }
      const imageData = await fetchWithCookie(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/files/${imageId}`
      );
      setProfileImageB64(imageData.file_data);
    } catch (error) {
      console.error("Error fetching profile image", error);
    }
  };



  // This useEffect hook runs when the component mounts and whenever the userData state changes.
  useEffect(() => {
    {
      fetchImage();
    }
  }, [token]);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const UpdateUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/accounts/${user.user_id}`;
      const fetchUpdateUrl = {
        method: "PUT",
        body: JSON.stringify({
          email: newEmail,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(UpdateUrl, fetchUpdateUrl);

      if (response.ok) {
        setNewEmail("");
      }

      setModalVisible(false);
      // Ideally you'd want to re-fetch the user data here
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  // This condition checks if the userData state is null or undefined.
  if (!user) {
    return <div>Loading...</div>;
  }

  // This returns the profile page content.
  return (
    <div>
      <h1>{`${user.first_name} ${user.last_name}`}</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      {profileImageB64 && (
        <img
          src={`data:image/png;base64,${profileImageB64}`}
          alt="Profile"
          style={{ maxWidth: "300px" }}
        />
      )}
      <button
        type="button"
        className="btn btn-primary btn-lg btn-block"
        onClick={handleOpenModal}
      >
        Update Profile
      </button>

      {isModalVisible && (
        <div>
          <h2>Update Profile</h2>
          <form onSubmit={handleUpdate}>
            <label>
              New Email:
              <input
                type="email"
                value={newEmail}
                onChange={handleEmailChange}
                required
              />
            </label>

            <br />
            <button className="btn btn-primary btn-lg btn-block" type="submit">
              Update
            </button>
          </form>
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
export default ProfilePage;
