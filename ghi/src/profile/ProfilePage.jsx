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

  const handleCloseModal = () => {
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
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={`data:image/png;base64,${profileImageB64}`}
        alt="Profile"
        style={{ maxWidth: "300px" }}
      />
      <div className="card-body">
        <h5 className="card-title">{`${user.first_name} ${user.last_name}`}</h5>
        <p className="card-text">
          <strong>Username:</strong> {user.username} <br />
          <strong>Email:</strong> {displayUser.email}
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleOpenModal}
        >
          Update Profile
        </button>
      </div>

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
              <button className="btn btn-secondary" onClick={handleCloseModal}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="pt-6 mx-6 mt-6 text-center border-t border-black-200 dark:border-gray-700/50">
        <div className="flex flex-wrap justify-center">
          <div className="w-full px-6">
            <p className="mb-4 font-light leading-relaxed text-black-600 dark:text-black-400"></p>
          </div>
        </div>
      </div>
      <div className="relative h-6 overflow-hidden translate-y-6 rounded-b-xl">
        <div className="absolute flex -space-x-12 rounded-b-2xl">
          <div className="w-36 h-8 transition-colors duration-200 delay-75 transform skew-x-[35deg] bg-blue-400/90 group-hover:bg-blue-600/90 z-10"></div>
          <div className="w-28 h-8 transition-colors duration-200 delay-100 transform skew-x-[35deg] bg-blue-300/90 group-hover:bg-blue-500/90 z-20"></div>
          <div className="w-28 h-8 transition-colors duration-200 delay-150 transform skew-x-[35deg] bg-blue-200/90 group-hover:bg-blue-400/90 z-30"></div>
          <div className="w-28 h-8 transition-colors duration-200 delay-200 transform skew-x-[35deg] bg-blue-100/90 group-hover:bg-blue-300/90 z-40"></div>
          <div className="w-28 h-8 transition-colors duration-200 delay-300 transform skew-x-[35deg] bg-blue-50/90 group-hover:bg-blue-200/90 z-50"></div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
