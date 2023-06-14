import { useEffect, useState } from "react";
import GroupPostCard from "./GroupPostCard";
import CreateGroupPost from "./CreateGroupPost";

import "./group_posts.css"

const GroupPosts = ({user}) => {
    const [groupPosts, setGroupPosts] = useState([]);
    const [bangers, setBangers] = useState([]);
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

    async function fetchGroupPostData() {
        const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/group_posts`;
        const response = await fetch(url);
        if (response.ok) {
        const data = await response.json();
        setGroupPosts(data);
        }
    }

    async function fetchBangerData() {
        const bangerUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/bangerz`;
        const response = await fetch(bangerUrl);
        if (response.ok) {
        const data = await response.json();
        setBangers(data);
        }
    }

    const handleCloseModal = () => {
        setShowCreateGroupModal(false);
    };

    const handleOpenModal = () => {
        setShowCreateGroupModal(true);
    };

    useEffect(() => {
        fetchGroupPostData();
        fetchBangerData();
    }, []);

    return (
        <>
        <div className="container mt-4 text-start">
            <div className="text-center">
                <button
                    type="button"
                    className="btn btn-lg btn-block"
                    onClick={handleOpenModal}
                    style={{ backgroundColor: 'rgba(254,97,82,255)', fontFamily: "Retro" }}
                >
                    Create a Group Post
                </button>
            </div>
            <div className="container mt-4">
                <div className="row gy-3">
                    {groupPosts?.map((groupPost) => {
                        return (
                            <div key={groupPost.id}>
                                <GroupPostCard
                                    groupPost={groupPost}
                                    user={user}
                                    bangers={bangers}
                                />
                            </div>
                        )
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

export default GroupPosts;
