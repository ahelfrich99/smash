import { useEffect, useState } from "react";

const UseUser = (token) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/token`;
      const res = await fetch(url, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      setUser(result.account);
    };

    if (token) {
      getUser();
    }
  }, [token]);

  return { user: user };
};

export default UseUser;
