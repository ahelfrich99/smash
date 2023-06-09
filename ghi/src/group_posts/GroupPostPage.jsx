import { useEffect, useState } from "react";
import GroupPostCard from "./GroupPostCard";
import CreateGroupPost from "./CreateGroupPost";

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
        <br />
        <h1 className="text-center text-3xl font-bold mt-8">Group Posts</h1>
        <br />
        <div className="container mt-4 text-end">
            <button
                type="button"
                className="btn btn-primary btn-md btn-block"
                onClick={handleOpenModal}
            >
                Create a Group Post
            </button>
        </div>
        {showCreateGroupModal && (
            <CreateGroupPost
            onGroupPostCreated={fetchGroupPostData}
            onClose={handleCloseModal}
            />
        )}

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
        </>
    );
};

export default GroupPosts;
