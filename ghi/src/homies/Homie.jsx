import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useParams, useLocation } from "react-router-dom";

const Homie = ({ user }) => {
  const { id } = useParams();
  const { token } = useToken();
  const [profileImageB64, setProfileImageB64] = useState(null);
  const [homie, setHomie] = useState("");
  const { fetchWithCookie } = useToken();
  const [isFollowing, setIsFollowing] = useState(false);
  const location = useLocation();


  const fetchHomieDataAndImage = async () => {
    const groupUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/accounts/${id}`;
    const response = await fetch(groupUrl);
    if (response.ok) {
      const data = await response.json();
      setHomie(data);

      try {
        let imageId = "";
        if (data && data.profile_img) {
          imageId = data.profile_img;
        }

        if (!imageId) {
          // Handle case when there is no data passing in.
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

    // Grab page address contains followed, assign the value to isFollowed

    const isFollowed = location.pathname.includes("followed");

    if (isFollowed) {
      setIsFollowing(true);
    }

  };

  const followHomie = async (event) => {
    event.preventDefault();

    const data = {};
    data.user_id = user.id;
    data.homie_id = id;
    // Fetch homie endpoint to follow homie
    const followUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/homies`;
    const response = await fetch(followUrl, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setIsFollowing(true);
    } else {
      throw new Error("Error following homie");
    }
  };

  const unFollowHomie = async (event) => {
    event.preventDefault();
    const followUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/homies/${user.id}/${homie.id}`;
    // Fetch homie endpoint to unfollow homie
    const response = await fetch(followUrl, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setIsFollowing(false);
    } else {
      throw new Error("Error unfollowing homie");
    }
  };



 useEffect(() => {
  fetchHomieDataAndImage();
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [id]);


  // Wait for homie data before render the component.
  if (!homie) {
    return <div>Loading...</div>;
  }

  // This returns the homie profile page content.
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={`data:image/png;base64,${profileImageB64}`}
        alt="Profile"
        style={{ maxWidth: "300px" }}
      />
      <div className="card-body">
        <h5 className="card-title">{`${homie.first_name} ${homie.last_name}`}</h5>
        <p className="card-text">
          <strong>Username:</strong> {homie.username} <br />
          <strong>Email:</strong> {homie.email}
        </p>
        {token &&
          (!isFollowing ? (
            <button className="btn btn-success" onClick={followHomie}>
              Follow Homie
            </button>
          ) : (
            <button className="btn btn-danger" onClick={unFollowHomie}>
              Unfollow Homie
            </button>
          ))}
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
  );
};
export default Homie;
