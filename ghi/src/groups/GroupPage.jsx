import { useEffect, useState } from "react";
import GroupCard from "./GroupCard";
import CreateGroup from "./CreateGroup";

import "./groups.css"

const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

    async function fetchGroupData() {
        const groupUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/groups`;
        const response = await fetch(groupUrl);
        if (response.ok) {
            const data = await response.json();
            setGroups(data);
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
        <div className="container mt-4 text-center">
                <button
                    type="button"
                    className="btn btn-lg btn-block"
                    onClick={handleOpenModal}
                    style={{ backgroundColor: 'rgba(254,97,82,255)', fontFamily: "Retro" }}
                    >
                        Create a Group
                </button>
        <div className="container mt-4">
        <div className="row gy-3">
            <GroupCard key={groups.id} groups={groups} />
        </div>
        </div>
        </div>
        {showCreateGroupModal && (
            <CreateGroup onGroupCreated={fetchGroupData} onClose={handleCloseModal} />
        )}
        </>
    );
}

export default Groups;
