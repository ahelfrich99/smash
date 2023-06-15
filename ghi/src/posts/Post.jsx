import { useEffect, useState } from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import PostBanger from "./PostBanger";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";

import "./posts.css";

export default function Post({ postData, bangers, token, getPosts, user }) {
  const [comments, setComments] = useState([]);
  const [showCreateCommentModal, setShowCreateCommentModal] = useState(false);
  const [liked, setLiked] = useState(postData.liked);

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
      getPosts();
    }
  };

  const likePost = async () => {
    const data = {
      user_id: user.id,
      post_id: postData.id,
    };

    const likeUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/likes`;
    const fetchConfigUrl = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(likeUrl, fetchConfigUrl);

    if (response.ok) {
      setLiked(true);
      getPosts();
    }
  };

  const unlikePost = async (id) => {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/likes/${id}`;
    const fetchConfigUrl = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, fetchConfigUrl);

    if (response.ok) {
      setLiked(false);
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
    setLiked(postData.liked);
  }, [postData.id, postData.liked]);

  if (!user) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="screen-container" key={postData.id}>
        <div className="post-body">
          <div className="post-section">
            <div className="left-section">
              <h5 className="post-title">
                {postData.first_name} {postData.last_name}
              </h5>
              <h6 className="post-username">@{postData.username}</h6>
              <br />
              <p className="post-content2">{postData.text}</p>
              <br />
              <h6 className="banger-artist">{postData.like_count} Likes</h6>
              <br />
              {token &&
                (!liked ? (
                  <button className="btn btn-danger" onClick={() => likePost()}>
                    {<AiOutlineHeart />}
                  </button>
                ) : (
                  <button
                    className="btn btn-danger"
                    onClick={() => unlikePost(postData.id)}
                  >
                    {<AiFillHeart />}
                  </button>
                ))}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleOpenModal}
              >
                {<FaRegComment />}
              </button>
              {user.id === postData.user_id && (
                <button
                  onClick={() => handleDelete(postData.id)}
                  className="btn btn-secondary"
                >
                  {<BsFillTrash3Fill />}
                </button>
              )}
            </div>
            <div className="right-section">
              <div className="post-card1">
                <PostBanger
                  banger={bangers.find(
                    (banger) => banger.id === postData.banger_id
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="post-body">
        <div>
          {comments?.map((comment) => {
            return (
              <div key={comment.id}>
                <Comment commentData={comment} allComments={comments} />
              </div>
            );
          })}
        </div>
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
