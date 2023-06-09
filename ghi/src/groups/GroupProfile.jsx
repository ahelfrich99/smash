import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useParams } from "react-router-dom";
import GroupPostCard from "../group_posts/GroupPostCard";
import CreateGroupPost from "../group_posts/CreateGroupPost";

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
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card" style={{ width: "18rem" }}>
              <img
                className="card-img-top"
                src={`data:image/png;base64,${profileImageB64}`}
                alt="Profile"
                style={{ maxWidth: "300px" }}
              />
              <div className="card-body">
                <h5 className="card-title fs-3">
                  <strong>{`${group.group_name}`}</strong>
                </h5>
                <p className="card-text fs-6">
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
              <div className="container mt-4 text-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleOpenUpdateModal}
                >
                  Update Group
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-md btn-block"
                  onClick={handleOpenModal}
                >
                  Create Group Post
                </button>
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
          </div>
        </div>
        {showCreateGroupModal && (
          <CreateGroupPost
            onGroupPostCreated={fetchGroupPostData}
            onClose={handleCloseModal}
          />
        )}
        {showUpdateModal && (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Update Group</h5>
              <form onSubmit={handleUpdate}>
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
        <br />
        <div className="col-md-6 mt-4">
          <div>
            {groupPosts?.map((groupPost) => {
              return (
                <div key={groupPost.id}>
                  <GroupPostCard groupPost={groupPost} group={group} bangers={bangers} />
                  <br />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default GroupProfile;
