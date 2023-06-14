import React from 'react'
import './group_comments.css'

const GroupComment = ({ comment, user }) => {
    return (
        <div className="card">
            <div className="card-body">
            <h6 className="card-subtitle">
                <strong>@{user?.username}</strong>
            </h6>
            <p className="card-text">{comment.content}</p>
            </div>
        </div>
    );
}

export default GroupComment;
