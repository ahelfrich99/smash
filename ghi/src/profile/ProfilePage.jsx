import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

 const ProfilePage = ({ userData }) => {
   const [profileImageB64, setProfileImageB64] = useState(null);
   const { fetchWithCookie } = useToken();



   // This function fetches the profile image from the server.
   const handleFetchProfileImage = async () => {
     try {
       const imageId = userData.account.profile_img;
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
     if (userData && userData.account && userData.account.profile_img) {
       handleFetchProfileImage();
     }
   }, [userData]);

   // This condition checks if the userData state is null or undefined.
   while (!userData || !userData.account) {
     return <div>Loading...</div>;
   }

   // This returns the profile page content.
   return (
     <div>
       <h1>{`${userData.account.first_name} ${userData.account.last_name}`}</h1>
       <p>Username: {userData.account.username}</p>
       <p>Email: {userData.account.email}</p>
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

 export default ProfilePage;
