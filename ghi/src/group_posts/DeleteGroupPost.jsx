import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";

import "./delete.css"

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
        <button className="delete" onClick={() => setShowModal(true)}>
            Delete Group Post
        </button>

        {showModal && (
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title-1">
                        <h5 className="modal-title">Confirm Delete</h5>
                    </div>
                    {/* <div className="button-hide">
                        <button type="button" className="close" onClick={() => setShowModal(false)}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div> */}
                </div>
                <div className="delete-modal">
                    <div className="modal-body">
                        <p>Homie, you sure you want to delete this group post? On god?</p>
                    </div>
                </div>
                <div className="font1">
                    <div className="modal-footer">
                        <div className="font2">
                            <button onClick={() => setShowModal(false)}>Close</button>
                        </div>
                        <div className="font3">
                            <button data-bs-dismiss="modal" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}
        </>
    );
}

export default DeleteGroupPost;
