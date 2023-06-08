import { useEffect, useState } from "react";

export const UserImage = ({ user, fetchWithCookie }) => {
    console.log("user:", user);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            const Response = await fetchWithCookie(
                `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/files/${user.profile_img}`
            );
            const imgUrl = Response;
            setImage(imgUrl.file_data);
        }
        fetchImage();
    }, [user, fetchWithCookie]);

    return (
        <img
        src={`data:image/jpg;base64,${image}`}
        alt="User"
        className="rounded-full h-8 w-8"
        // style={{ maxWidth: "160px", maxHeight: "115px" }}
        />
    );
};

const GroupPosts = ({user}) => {

    return <>${user}`</>;
};

export default GroupPosts;
