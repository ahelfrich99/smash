import { useEffect, useState } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import PostBanger from "./PostBanger";

export default function Post({ postData, allPosts, bangers, token, getPosts }) {
  const [comments, setComments] = useState([]);
  const [showCreateCommentModal, setShowCreateCommentModal] = useState(false);

  const getComments = async (id) => {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/posts/${id}/comments`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setComments(data);
    }
  };

  const handleDelete = async (id) => {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/posts/${id}`;
    const fetchConfigUrl = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, fetchConfigUrl);

    if (response.ok) {
      allPosts.filter((post) => post.id !== id);
      getPosts();
    }
  };

  const handleCloseModal = () => {
    setShowCreateCommentModal(false);
  };

  const handleOpenModal = () => {
    setShowCreateCommentModal(true);
  };

  useEffect(() => {
    getComments(postData.id);
  }, [postData.id]);

  return (
    <div>
      <div className="card" key={postData.id}>
        <div className="card-body">
          <h5 className="card-title">
            {postData.first_name} {postData.last_name}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            @{postData.username}
          </h6>
          <div>
            <PostBanger
              banger={bangers.find(
                (banger) => banger.id === postData.banger_id
              )}
            />
          </div>
          <p className="card-text">{postData.text}</p>
          <button
            onClick={() => handleDelete(postData.id)}
            className="btn btn-secondary btn-sm"
          >
            Delete
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleOpenModal}
          >
            Comment
          </button>
        </div>
      </div>
      <div>
        {comments?.map((comment) => {
          return (
            <div key={comment.id}>
              <Comment commentData={comment} allComments={comments} />
            </div>
          );
        })}
      </div>
      {showCreateCommentModal && (
        <CreateComment
          onCommentCreated={(id) => getComments(id)}
          onClose={handleCloseModal}
          token={token}
          postData={postData}
        />
      )}
    </div>
  );
}
