import { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import CreatePost from "./CreatePost";
import Post from "./Post";

import "./posts.css";

export default function Posts({ user }) {
  const { token } = useToken();
  const [posts, setPosts] = useState([]);
  const [bangers, setBangers] = useState([]);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const getPosts = async () => {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/posts`;
    const fetchConfigUrl = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchConfigUrl);

    if (response.ok) {
      const data = await response.json();
      setPosts(data);
    }
  };

  const getBangerz = async () => {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/bangerz`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setBangers(data);
    }
  };

  const handleCloseModal = () => {
    setShowCreatePostModal(false);
  };

  const handleOpenModal = () => {
    setShowCreatePostModal(true);
  };

  useEffect(() => {
    if (token) {
      getPosts();
    }
    getBangerz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="container mt-4 text-start">
      <div className="text-center">
        {token !== null && (
          <div>
            <button
              type="button"
              className="btn btn-lg btn-block"
              onClick={handleOpenModal}
              style={{
                backgroundColor: "rgba(254,97,82,255)",
                fontFamily: "Retro",
              }}
            >
              Create a Post
            </button>
          </div>
        )}
      </div>
      {showCreatePostModal && (
        <CreatePost
          onPostCreated={getPosts}
          onClose={handleCloseModal}
          token={token}
        />
      )}
      <br />
      <div>
        {posts?.map((post) => {
          return (
            <div key={post.id}>
              <Post
                postData={post}
                bangers={bangers}
                token={token}
                getPosts={getPosts}
                user={user}
              />
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
}
