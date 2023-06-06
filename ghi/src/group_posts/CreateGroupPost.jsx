import { useEffect, useState } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';

const CreateGroupPost = ({ onClose, onGroupPostCreated }) => {
    const { token } = useToken();

    const [groups, setGroups] = useState([])
    const [group, setGroup] = useState('')
    const handleGroupChange = (e) => {
        setGroup(e.target.value);
    }
    const [users, setUsers] = useState([])
    const [user, setUser] = useState('')
    const handleUserChange = (e) => {
        setUser(e.target.value);
    }
    const [bangerz, setBangerz] = useState([])
    const [banger, setBanger] = useState('')
    const handleBangerChange = (e) => {
        setBanger(e.target.value);
    }
    const [content, setContent] = useState('')
    const handleContentChange = (e) => {
        setContent(e.target.value);
    }
    const [date, setDate] = useState('')
    const handleDateChange = (e) => {
        setDate(e.target.value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const postData = {
            group_id: group,
            user_id: user,
            banger_id: banger,
            content: content,
            date: date,
            };

            const postUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/group_posts`;
            const postFetchConfig = {
            method: 'post',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            };

            // Create a new group post
            const postResponse = await fetch(postUrl, postFetchConfig);
            if (postResponse.ok) {
            const newGroupPostRecord = await postResponse.json();

            const newGroupPost = {
                groupPostRecord: newGroupPostRecord,
                group: group,
                user: user,
                banger: banger,
            };
            console.log('New Group Post:', newGroupPost);

            setGroup('');
            setUser('');
            setBanger('');
            setContent('');
            setDate('');

            onGroupPostCreated();
            } else {
                console.error('Failed to create a new group post');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const fetchUserData = async () => {
        const userUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/accounts`;
        const response = await fetch(userUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setUsers(data);
        }
    }

    const fetchBangerData = async () => {
        const bangerUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/bangerz`;
        const response = await fetch(bangerUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setBangerz(data);
        }
    }

    const fetchGroupData = async () => {
        const groupUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/groups`;
        const response = await fetch(groupUrl);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setGroups(data);
        }
    }

    const handleCancel = () => {
        setGroup('');
        setUser('');
        setBanger('');
        setContent('');
        setDate('');

        onClose();
    }

    useEffect(() => {
        fetchUserData();
        fetchBangerData();
        fetchGroupData();
    }, []);

    return (
        <>
        <div>
            <div
                className="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
                id="creategrouppost"
            >
                <form
                    onSubmit={handleSubmit}
                    className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
                >
                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                    <div className="w-full flex justify-start text-gray-600 mb-3">
                    </div>
                    <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Create a Group Post</h1>
                    <label htmlFor="group" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Group:</label>
                    <select
                        id="group"
                        className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        value={group}
                        onChange={handleGroupChange}
                    >
                        <option value="">Select a group</option>
                        {groups?.map(group => {
                            return (
                                <option value={group.id} key={group.id}>{group.group_name}</option>
                        )
                        })}
                    </select>
                    <label htmlFor="user" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">User:</label>
                    <select
                        id="user"
                        className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        value={user}
                        onChange={handleUserChange}
                    >
                        <option value="">Select a user</option>
                        {users?.map(user => {
                            return (
                                <option value={user.id} key={user.id}>{user.username}</option>
                            )
                        })}
                    </select>
                    <label htmlFor="banger" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Banger:</label>
                    <select
                        id="banger"
                        className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        value={banger}
                        onChange={handleBangerChange}
                    >
                        <option value="">Select a banger</option>
                        {bangerz?.map(banger => {
                            return (
                                <option value={banger.id} key={banger.id}>{banger.song_title}</option>
                            )
                        })}
                    </select>
                    <label htmlFor="content" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Content</label>
                    <textarea
                        id="content"
                        className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        placeholder="Tell us more about this banger!"
                        // type="text"
                        value={content}
                        onChange={handleContentChange}
                    />
                    <label htmlFor="date" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Date</label>
                    <input
                        id="date"
                        className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        type="date"
                        value={date}
                        onChange={handleDateChange}
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
    );
}

export default CreateGroupPost;
