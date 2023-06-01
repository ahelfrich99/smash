import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                //const tokenResponse = await axios.get('http://localhost:8000/token');
                //console.log(tokenResponse.data);
                const user_id = 1
                const response = await axios.get(`http://localhost:8000/accounts/${user_id}`);
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user', error);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    // Decode profile_img from base64 to an image URL
    const profileImgUrl = `data:image/jpeg;base64,${user.profile_img}`;

    return (
        <div>
            <h1>{`${user.first_name} ${user.last_name}`}</h1>

            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default ProfilePage;
