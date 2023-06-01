import { useEffect, useState } from "react";
import GroupPostCard from "./GroupPostCard";
import CreateGroupPost from "./CreateGroupPost";

const GroupPosts = () => {
    const [groupPosts, setGroupPosts] = useState([]);
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

    async function fetchGroupPostData() {
        const url = "http://localhost:8000/group_posts/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setGroupPosts(data);
            // console.log(data)
        }
    }

    const handleCloseModal = () => {
        setShowCreateGroupModal(false);
    };

    const handleOpenModal = () => {
        setShowCreateGroupModal(true);
    };

    useEffect(() => {
        fetchGroupPostData()
    }, []);

    return (
        <>
        <br />
        <h1 className="text-center text-3xl font-bold mt-8">Group Posts</h1>
        <br />
            <div className="container mt-4">
                <div className="row justify-content-end text-center">
                    <button
                        type="button"
                        className="btn btn-primary btn-lg btn-block"
                        onClick={handleOpenModal}
                        >
                            Create a Group Post
                    </button>
                </div>
            </div>
            {showCreateGroupModal && (
                <CreateGroupPost onGroupPostCreated={fetchGroupPostData} onClose={handleCloseModal} />
            )}

            <div className="container mt-4">
            <div className="row gy-3">
                <GroupPostCard groupPosts={groupPosts} />
            </div>
            </div>
        </>
    );
}

export default GroupPosts;
