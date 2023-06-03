import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

const Homie = ({ userId }) => {
  // We are expecting userId as a prop here
  const [userData, setUserData] = useState(null); // Added this line
  const [profileImageB64, setProfileImageB64] = useState(null);
  const { fetchWithCookie } = useToken();

  // This function fetches the user data from the server.
  const handleFetchUserData = async () => {
    try {
        userId = 1;
        const response = await fetchWithCookie(
            `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/accounts/${userId}`
        );
        const data = await response.json();
        setUserData(data);
    }
    catch (error) {
        console.error("Error fetching user data", error);
    }
  };

  // This function fetches the profile image from the server.
  const handleFetchProfileImage = async () => {
    try {
      const imageId = userData.profile_img;
      if (!imageId) {
        // Handle case when there is no image
        return;
      }
      const response = await fetchWithCookie(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/files/${imageId}`
      );
      const imageData = await response.json();
      setProfileImageB64(imageData.file_data);
    } catch (error) {
      console.error("Error fetching profile image", error);
    }
  };

  // This useEffect hook runs when the component mounts and fetches user data.
  useEffect(() => {
    handleFetchUserData();
  }, []);

  // This useEffect hook runs whenever the userData state changes and fetches profile image.
  useEffect(() => {
    if (userData && userData.profile_img) {
      handleFetchProfileImage();
    }
  }, [userData]);

  // This condition checks if the userData state is null or undefined.
  if (!userData) {
    return <div>Loading...</div>;
  }

  // This returns the profile page content.
  return (
    <div>
      <h1>{`${userData.first_name} ${userData.last_name}`}</h1>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      {profileImageB64 && (
        <img
          src={`data:image/png;base64,${profileImageB64}`}
          alt="Profile"
          style={{ maxWidth: "300px" }}
        />
      )}
    </div>
  );
};

export default Homie;
