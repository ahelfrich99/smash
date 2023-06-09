export default function Comment({ commentData }) {
  return (
    <div className="card">
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">
          @{commentData.username}
        </h6>
        <p className="card-text">{commentData.content}</p>
      </div>
    </div>
  );
}
