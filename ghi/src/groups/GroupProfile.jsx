import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useParams } from "react-router-dom";
import GroupPostCard from "../group_posts/GroupPostCard";
import CreateGroupPost from "../group_posts/CreateGroupPost";

import "./group-profile.css"

const GroupProfile = () => {
  const { id } = useParams();
  const { token } = useToken();
  const [profileImageB64, setProfileImageB64] = useState(null);
  const [group, setGroup] = useState("");
  const [groupPosts, setGroupPosts] = useState([]);
  const [bangers, setBangers] = useState([]);
  const { fetchWithCookie } = useToken();
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showUpdateModal, setUpdateModal] = useState(false)
  const [newDescription, setNewDescription] = useState("");
  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  }

  const fetchGroupDataAndImage = async () => {
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

  async function fetchBangerData() {
    const bangerUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/bangerz`;
    const response = await fetch(bangerUrl);
    if (response.ok) {
      const data = await response.json();
      setBangers(data);
    }
  }

  const fetchGroupPostData = async () => {
    const groupPostUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/group_posts/`;
    const groupPostResponse = await fetch(groupPostUrl);
    if (groupPostResponse.ok) {
      const data = await groupPostResponse.json();
      setGroupPosts(data)
    }
  }

  const handleCloseModal = () => {
    setShowCreateGroupModal(false);
  };

  const handleOpenModal = () => {
    setShowCreateGroupModal(true);
  };

  const handleOpenUpdateModal = () => {
    setUpdateModal(true);
  }

  const handleCloseUpdateModal = () => {
    setUpdateModal(false);
  }

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      if (!newDescription) {
        console.error("New description is missing or empty.");
        return;
      }
      const updateUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/groups/${id}`
      const fetchUpdateUrl = {
        method: "PUT",
        body: JSON.stringify({
          description: newDescription,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(updateUrl, fetchUpdateUrl);

      if (response.ok) {
        setNewDescription("");
        setUpdateModal(false);
      } else {
        console.error("Error updating group. Response:", response);
      }

    } catch (error) {
      console.error("Error updating group.", error);
    }
  };

  // This useEffect hook runs when the component mounts and whenever the userData state changes.
  useEffect(() => {
    fetchGroupDataAndImage();
    fetchGroupPostData();
    fetchBangerData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // This returns the profile page content.
  return (
    <>
      <div className="screen-container2">
        <div className="left-section1">
          <div className="gp-card">
            <img
              className="card-image"
              src={`data:image/png;base64,${profileImageB64}`}
              alt="Profile"
            />
            <div className="card-body">
              <h5 className="card-body-title">
                <strong>{`${group.group_name}`}</strong>
              </h5>
              <p className="card-body-text">
                {group.description}
              </p>
            </div>
            <div className="splitter">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-6">
                  <p className="splitter2"></p>
                </div>
              </div>
            </div>
            <div className="gp-buttons">
              <button
                className="update-button"
                onClick={handleOpenUpdateModal}
              >
                Update Group
              </button>
              <button
                className="create-button"
                onClick={handleOpenModal}
              >
                Create Group Post
              </button>
            </div>
          </div>
            {showUpdateModal && (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title" style={{ fontFamily: "Retro", color: "white" }}>Update Group</h5>
                  <form onSubmit={handleUpdate} className="form-css">
                    <div className="form-group">
                      <label>
                        New Description:
                        <textarea
                          type="text"
                          value={newDescription}
                          onChange={handleDescriptionChange}
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
                      onClick={handleCloseUpdateModal}
                    >
                      Close
                    </button>
                  </form>
                </div>
              </div>
            )}
        </div>
        <br />
        <div className="right-section1">
          <div className="group-post">
            {groupPosts?.map((groupPost) => {
              return (
                <div key={groupPost.id} className="group-post2">
                  <GroupPostCard groupPost={groupPost} group={group} bangers={bangers} />
                  <br />
                </div>
              );
            })}
          </div>
          </div>
        </div>
      {showCreateGroupModal && (
        <CreateGroupPost
          onGroupPostCreated={fetchGroupPostData}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
export default GroupProfile;
