import React from "react";
import { useEffect, useState } from "react";
import DeleteGroupPost from "./DeleteGroupPost";
import CreateGroupComment from "../group_comments/CreateGroupComment";
import GroupComment from "../group_comments/GroupComment";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "./group_posts.css"

const BangerImage = ({ banger, fetchWithCookie }) => {
        const [image, setImage] = useState(null);

        useEffect(() => {
            const fetchImage = async () => {
            const Response = await fetchWithCookie(
                `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/files/${banger.song_img}`
            );
            const imgUrl = Response;
            setImage(imgUrl.file_data);
            };
            fetchImage();
        }, [banger, fetchWithCookie]);

        return (
            <img
            src={`data:image/jpg;base64,${image}`}
            alt="banger"
            className="image"
            />
        );
    };

const BangerSound = ({ banger, fetchWithCookie }) => {
    const [song, setSong] = useState(null);

    useEffect(() => {
        const fetchSong = async () => {
        const Response = await fetchWithCookie(
            `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/files/${banger.song_upload}`
        );
        const songUrl = Response;
        setSong(songUrl.file_data);
        };
        fetchSong();
    }, [banger, fetchWithCookie]);

    return (
        <audio src={`data:audio/mp3;base64,${song}`} alt="banger" controls />
    );
};

const GroupPostCard = ({ groupPost, group, bangers }) => {
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [showCreateComment, setShowCreateComment] = useState(false);
    const { token } = useToken();
    const { fetchWithCookie } = useToken();

    const getGroupComments = async (id) => {
        const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/group_posts/${id}/group_comments`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setComments(data)
        }
    }

    const getUsers = async () => {
        const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/accounts`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setUsers(data);
        }
    }

    const handleCloseModal = () => {
        setShowCreateComment(false);
    }

    const handleOpenModal = () => {
        setShowCreateComment(true);
    }

    const user = users.find((user) => user.id === groupPost.user_id);
    const banger = bangers.find((banger) => banger.id === groupPost.banger_id);

    useEffect(() => {
        getGroupComments(groupPost.id);
        getUsers();
    }, [groupPost.id]);

    return (
        <div>
            <div className="screen-container" key={groupPost.id}>
            <div className="post-body">
                <div className="post-section">
                    <div className="left-section">
                        <h5 className="post-title">
                            <strong>
                            {user
                                ? `${user.first_name} ${user.last_name}`
                                : "Unknown user"}
                            </strong>
                        </h5>
                        <h6 className="post-username">
                            <strong>
                            @{user ? `${user.username}` : "unknown username"}
                            </strong>
                        </h6>
                        <br />
                        <h6 className="banger-title">
                            <strong>Banger:</strong>
                            <p className="banger-title2">
                                {banger
                                ? `${banger.song_title} by ${banger.artist}`
                                : "Unknown banger"}
                            </p>
                        </h6>
                        <br />
                        <h6 className="post-content">
                            <strong>Content:</strong>
                            <p className="post-content2">
                                {groupPost.content}
                            </p>
                        </h6>
                        <br />
                        <DeleteGroupPost id={groupPost.id} />
                        <button
                        type="button"
                        className="btn btn-secondary btn-md"
                        onClick={handleOpenModal}
                        >
                        Comment
                        </button>
                    </div>
                    <div className="right-section">
                        <div className="post-card1">
                            <div className="post-card">
                                <div>
                                    <BangerImage
                                    banger={banger}
                                    fetchWithCookie={fetchWithCookie}
                                    />
                                </div>
                                <br />
                            </div>
                            <div className="right-content">
                                <div className="sound">
                                    <BangerSound banger={banger} fetchWithCookie={fetchWithCookie} />
                                </div>
                                <br />
                                <div>
                                    <p className="banger-subtitle">
                                        {banger ? `${banger.song_title}` : `Unknown song title`}
                                    </p>
                                    <p className="banger">
                                        {banger ? `${banger.album}` : `Unknown album`}
                                    </p>
                                    <p className="banger-artist">
                                        {banger ? `${banger.artist}` : `Unknown artist`}
                                    </p>
                                    <p className="banger-date">
                                        {banger ? `${banger.date}` : `Unknown date`}
                                    </p>
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            <div>
            {comments?.map((comment) => {
                return (
                    <div key={comment.id}>
                    <GroupComment comment={comment} user={user} />
                </div>
                );
            })}
            </div>
            </div>
            {showCreateComment && (
                <CreateGroupComment
                onCommentCreated={(id) => getGroupComments(id)}
                onClose={handleCloseModal}
                token={token}
                groupPost={groupPost}
                group={group}
                users={users}
            />
            )}
        </div>
    );
}

export default GroupPostCard;
