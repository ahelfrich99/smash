import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useParams } from "react-router-dom";
import GroupPostCard from "../group_posts/GroupPostCard";

const GroupProfile = ({ user }) => {
  const { id } = useParams();
  const { token } = useToken();
  const [profileImageB64, setProfileImageB64] = useState(null);
  const [group, setGroup] = useState("");
  //const [groupPost, setGroupPost] = useState("");
  const { fetchWithCookie } = useToken();






  // This useEffect hook runs when the component mounts and whenever the userData state changes.
 useEffect(() => {
   const fetchHomieDataAndImage = async () => {
     const groupUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/groups/${id}`;
     const response = await fetch(groupUrl);
     if (response.ok) {
       const data = await response.json();
       setGroup(data);

       try {
         let imageId = "";
         if (data && data.group_img) {
           imageId = data.group_img;
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
     }
   };

   // const fetchGroupPostData = async () => {
   //   const groupPostUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/group_posts/${id}`;
   //   const groupPostResponse = await fetch(groupPostUrl);
   //   if (groupPostResponse.ok) {
   //     const data = await groupPostResponse.json();
   //     setGroupPost(data);
   //   }
   // };

   fetchHomieDataAndImage();
   //  fetchGroupPostData();
 }, [token, id, fetchWithCookie]);

  // This condition checks if the userData state is null or undefined.
  if (!group) {
    return <div>Loading...</div>;
  }

  // This returns the profile page content.
  return (
    <>
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={`data:image/png;base64,${profileImageB64}`}
        alt="Profile"
        style={{ maxWidth: "300px" }}
      />
      <div className="card-body">
        <h5 className="card-title">
          <strong>{`${group.group_name}`}</strong>
        </h5>
        <p className="card-text">
          <strong>Group:</strong> {group.group_name} <br />
          <strong>Description:</strong> {group.description}
        </p>
      </div>

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
    <div>
      <GroupPostCard />
    </div>
    </>
  );
};
export default GroupProfile;
