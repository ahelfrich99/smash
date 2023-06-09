import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";

const DeleteGroupPost = ({ id }) => {
    const [showModal, setShowModal] = useState(false);
    const { token } = useToken();

    const handleDelete = async () => {
        try {
            const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/group_posts/${id}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                window.location.reload();

            } else {
                throw new Error("Failed to delete group post.")
            }
        } catch (error) {
            console.error(error);
        }
        setShowModal(false);
        // window.location.reload();
    }

    return (
        <>
        <button className="btn btn-danger" onClick={() => setShowModal(true)}>
            Delete Group Post
        </button>

        {showModal && (
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirm Delete</h5>
                    <button type="button" className="close" onClick={() => setShowModal(false)}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>No cap, you really want to delete this group post? You sure?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                    <button data-bs-dismiss="modal" type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
                </div>
            </div>
            </div>
        )}
        </>
    );
}

export default DeleteGroupPost;
