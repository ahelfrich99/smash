import { useEffect, useState } from "react";
import GroupCard from "./GroupCard";
import CreateGroup from "./CreateGroup";

const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

    async function fetchGroupData() {
        const groupUrl = "http://localhost:8000/groups/";
        const response = await fetch(groupUrl);
        if (response.ok) {
            const data = await response.json();
            setGroups(data.groups);
        }
    }

    const handleCloseModal = () => {
        setShowCreateGroupModal(false)
    }

    const handleOpenModal = () => {
        setShowCreateGroupModal(true);
    }

    useEffect(() => {
        fetchGroupData()
    }, []);

    return (
        <>
        <br />
        <h1 className="text-center text-3xl font-bold mt-8">Group List</h1>
        <br />
            <div className="container mt-4">
                <div className="row justify-content-end text-center">
                    <button
                        type="button"
                        className="btn btn-primary btn-lg btn-block"
                        onClick={handleOpenModal}
                        >
                            Create a Group
                    </button>
                </div>
            </div>
            {showCreateGroupModal && (
                <CreateGroup onGroupCreated={fetchGroupData} onClose={handleCloseModal} />
            )}

            <div className="container mt-4">
            <div className="row gy-3">
                <GroupCard groups={groups} />
            </div>
            </div>
        </>
    );
}

export default Groups;
