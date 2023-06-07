import { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import CreatePost from "./CreatePost";
import Post from "./Post";

export default function Posts() {
  const { token } = useToken();

  const [posts, setPosts] = useState([]);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const getPosts = async () => {
    const url = "http://localhost:8000/posts/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setPosts(data);
    }
  };

  const handleCloseModal = () => {
    setShowCreatePostModal(false);
  };

  const handleOpenModal = () => {
    setShowCreatePostModal(true);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="container mt-4">
        <div className="row justify-content-end text-center">
          <button
            type="button"
            className="btn btn-primary btn-lg btn-block"
            onClick={handleOpenModal}
          >
            Create a Post
          </button>
        </div>
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
              <Post postData={post} allPosts={posts} token={token} />
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
}
