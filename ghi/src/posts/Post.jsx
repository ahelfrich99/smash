export default function Post({ postData, allPosts, token }) {
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
    }
  };

  return (
    <div className="card" key={postData.id}>
      <div className="card-body">
        <h5 className="card-title">
          {postData.first_name} {postData.last_name}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">@{postData.username}</h6>
        <p>
          Banger: {postData.song_title} by {postData.artist}
        </p>
        <p className="card-text">{postData.text}</p>
        <button
          onClick={() => handleDelete(postData.id)}
          className="btn btn-secondary btn-sm"
        >
          Delete
        </button>
        <button type="button" className="btn btn-secondary btn-sm">
          Like
        </button>
        <p>Like count: {postData.like_count}</p>
      </div>
    </div>
  );
}
