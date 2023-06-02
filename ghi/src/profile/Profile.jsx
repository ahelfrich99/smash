import React, { useState, useEffect } from "react";
import axios from "axios";
import JSONPretty from "react-json-pretty";
import useToken from "@galvanize-inc/jwtdown-for-react";

const ProfilePage = () => {
  // const [user, setUser] = useState();
  // const { fetchWithCookie } = useToken();

  // const handleFetchWithJFR = async (e) => {
  //   e.preventDefault();
  //   const data = await fetchWithCookie(
  //     `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`
  //   );


  //   setUser(data);

  //   console.log(user);
  // };

  // useEffect(() => {
  //   handleFetchWithJFR();
  // }, []);

  // Decode profile_img from base64 to an image URL
  //const profileImgUrl = `data:image/jpeg;base64,${user.profile_img}`;

  return (
    <div>
      {/* <h1>{`${user.account.first_name} ${user.account.last_name}`}</h1> */}

      {/* <p>Username: {user.account.username}</p> */}
      {/* <p>Email: {user.account.email}</p> */}
    </div>
  );
};

export default ProfilePage;
