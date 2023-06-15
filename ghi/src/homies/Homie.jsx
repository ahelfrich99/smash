import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useParams, useLocation } from "react-router-dom";
import "./profile.css";

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

    // Fetching homie data

    const isFollowed = location.pathname.includes("followed");

    if (isFollowed) {
      setIsFollowing(true);
    }
    // const homieUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/homies/${user.id}`;
    // const homieResponse = await fetch(homieUrl, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   },
    // });

    // if (homieResponse.ok) {
    //   const homiesData = await homieResponse.json();

    //   console.log("homieData", homiesData);

    //   // Check if the user is following the homie
    //   const isUserFollowing = homiesData.some((item) => item.homie_id === id);

    //   setIsFollowing(isUserFollowing);
    // }
  };

  const followHomie = async (event) => {
    event.preventDefault();

    const data = {};
    data.user_id = user.id;
    data.homie_id = id;
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

  // This condition checks if the userData state is null or undefined.
  if (!homie) {
    return <div>Loading...</div>;
  }

  // This returns the homie profile page content.
  return (
    <div className="container mt-4">
      <div className="row gy-3 justify-content-center">
        <div className="screen-container">
          <div className="group-body">
            <div className="group-card text-center">
              <div>
                <img
                  className="card-img-top"
                  src={`data:image/png;base64,${profileImageB64}`}
                  alt="Profile"
                  style={{ maxWidth: "300px", margin: "0 auto" }}
                />
              </div>
              <br />
              <br />
              <p className="group-title" style={{ color: "#30E5BE" }}>
                {`${homie.first_name} ${homie.last_name}`}
              </p>
              <br />
              <p className="group-subtitle">
                <strong>Username:</strong> {homie.username} <br />
                <strong>Email:</strong> {homie.email}
              </p>
              <br />
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {token &&
                  (!isFollowing ? (
                    <button className="btn btn-success" onClick={followHomie}>
                      Follow
                    </button>
                  ) : (
                    <button className="btn btn-danger" onClick={unFollowHomie}>
                      Unfollow
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Homie;
