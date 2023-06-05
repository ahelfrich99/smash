import { useEffect, useState } from "react";

const UseUser = (token) => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const getUser = async () => {
      //console.log("UseUser token, " + token);
      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`;
      const res = await fetch(url, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      //console.log("UseUser Result, " + result.account.username);
      setUser(result.account);

      //console.log("UseUser user, " + user);
    };
    //console.log("Hello, " + user);
    if (token) {
      getUser();
    }
  }, [token]);

  return { user: user };
};

export default UseUser;
