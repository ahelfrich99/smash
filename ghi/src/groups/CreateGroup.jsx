import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

const CreateGroup = ({ onGroupCreated, onClose }) => {
    const { token } = useToken();

    const [groupName, setGroupName] = useState("");
    const handleGroupNameChange = (e) => {
        setGroupName(e.target.value);
    }
    const [groupSize, setGroupSize] = useState("");
    const handleGroupSizeChange = (e) => {
        setGroupSize(e.target.value);
    };
    const [groupImg, setGroupImg] = useState("");

    const [description, setDescription] = useState("");
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let uploadedFile;
        if (groupImg) {
        const formData = new FormData();
        formData.append('file', groupImg);
        formData.append('file_type', 'image');
        const response = await fetch(`${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/files`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        uploadedFile = data.id;
        }

        const data = {};
        data.group_name = groupName;
        data.group_size = groupSize;
        data.group_img = uploadedFile;
        data.description = description;

        console.log(data)

        const groupUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/groups`;
        const fetchConfigUrl = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
        const response = await fetch(groupUrl, fetchConfigUrl);

        if (response.ok) {
            setGroupName('')
            setGroupSize('')
            setGroupImg('')
            setDescription('')

            onGroupCreated();
        }
    }

    const handleCancel = () => {
        setGroupName('');
        setGroupSize('');
        setDescription('');
        setGroupImg('');

        onClose();
    };

    const onFileChange = (e) => {
        setGroupImg(e.target.files[0]);
    };

    return (
        <>
        <div>
            <div
                className="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
                id="creategroup"
            >
                <form
                    onSubmit={handleSubmit}
                    className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
                >
                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                    <div className="w-full flex justify-start text-gray-600 mb-3">
                    </div>
                    <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Create a Group</h1>
                    <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Group Name</label>
                    <input
                        id="groupname"
                        className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        placeholder="B JUN, MEIMEI, etc."
                        type="text"
                        value={groupName}
                        onChange={handleGroupNameChange}
                    />
                    <label htmlFor="groupsize" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Group Size</label>
                    <input
                        id="groupsize"
                        className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        type="number"
                        placeholder="10,100,1000, etc."
                        value={groupSize}
                        onChange={handleGroupSizeChange}
                    />
                    <label htmlFor="description" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Description</label>
                    <textarea
                        id="description"
                        className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        placeholder="Tell us about your group!"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    <label htmlFor="groupimg" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Group Picture Upload</label>
                    <input
                        id="groupimg"
                        className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        type="file"
                        onChange={onFileChange}
                    />
                    <div className="flex items-center justify-start w-full">
                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition duration-150 ease-in-out hover:bg-blue-600 bg-blue-700 rounded text-white px-8 py-2 text-sm">Submit</button>
                    <button className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-red-400 ml-3 bg-red-100 transition duration-150 text-white-600 ease-in-out hover:border-red-400 hover:bg-red-300 border rounded px-8 py-2 text-sm" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
                </form>
                </div>
            </div>
        </>
    )
}

export default CreateGroup;
