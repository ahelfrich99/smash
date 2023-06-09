import "bootstrap/dist/css/bootstrap.min.css";
import "./group.css";
import { useParams } from "react-router-dom";
import GroupProfile from "./GroupProfile";

const GroupContainer = ({ user }) => {
    const { id } = useParams();
  return (
    <div className="group-profile-container">
      {user && (
        <>
          <div className="group-post-container" style={{ width: "65%" }}>
            <GroupProfile id={id} />
          </div>
          <div className="group-post-container" style={{ width: "65%" }}>
            <div>User ID: {user.id}</div>{" "}
            {/* This is where the user ID is printed */}
          </div>
        </>
      )}
    </div>
  );
};

export default GroupContainer;
