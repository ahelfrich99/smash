import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

const ProfilePage = ({ user }) => {
  const { token } = useToken();
  const [profileImageB64, setProfileImageB64] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const { fetchWithCookie } = useToken();
  const [displayUser, setDisplayUser] = useState(user);

  const fetchEmail = async () => {
    try {
      let fetchUser = "";
      if (user && user.id) {
        fetchUser = user.id;
      }

      if (!fetchUser) {
        // Handle case when user is not passing in time
        return;
      }
      const data = await fetchWithCookie(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/accounts/${fetchUser}`
      );
      setDisplayUser(data);
    } catch (error) {
      console.error("Error fetching profile image", error);
    }
  };

  useEffect(() => {
    // This function fetches the profile image from the server.
    const fetchImage = async () => {
      try {
        let imageId = "";
        if (user && user.profile_img) {
          imageId = user.profile_img;
        }

        if (!imageId) {
          // Handle case when user is not passing in time
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

    fetchImage();
  }, [user, fetchWithCookie]);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

const handleCloseModal = (event) => {
  event.stopPropagation();
  setModalVisible(false);
};

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      let imageID = user.profile_img;

      const UpdateUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/accounts/${user.id}`;
      const fetchUpdateUrl = {
        method: "PUT",
        body: JSON.stringify({
          email: newEmail,
          profile_img: imageID,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(UpdateUrl, fetchUpdateUrl);

      if (response.ok) {
        setNewEmail("");
        fetchEmail();
      }

      setModalVisible(false);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  // This condition to wait for the user data to pass in.
  if (!user) {
    return <div>Loading...</div>;
  }

  // Return Profile Info
  return (
<div className="container mt-4">
  <div className="row gy-3">
    <div className="screen-container9">
      <div className="group-body9">
        <div className="group-card9 text-center">
          <div>
            <img
              src={`data:image/png;base64,${profileImageB64}`}
              alt="Profile"
              style={{ maxWidth: "300px" }}
              className="mx-auto"
            />
          </div>
          <br />
          <p className="group-title9" style={{ color: "#30E5BE" }}>{`${user.first_name} ${user.last_name}`}</p>
          <br />
          <p className="group-subtitle9">
            <strong>Username:</strong> {user.username} <br />
            <strong>Email:</strong> {displayUser.email}
          </p>
          <br />
          <button
            type="button"
            className="btn btn-primary update-button"
            onClick={handleOpenModal}
          >
            Update Profile
          </button>

          {isModalVisible && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Update Profile</h5>
                <form onSubmit={handleUpdate}>
                  <div className="form-group">
                    <label>
                      New Email:
                      <input
                        type="email"
                        value={newEmail}
                        onChange={handleEmailChange}
                        required
                        className="form-control"
                      />
                    </label>
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Update
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={(event) => handleCloseModal(event)}
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>


  );
};
export default ProfilePage;
