import { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import React from "react";

import "./posts.css";

const BangerImage = ({ banger, fetchWithCookie }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const Response = await fetchWithCookie(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/files/${banger.song_img}`
      );
      const imgUrl = Response;
      setImage(imgUrl.file_data);
    };
    fetchImage();
  }, [banger, fetchWithCookie]);

  return (
    <img
      src={`data:image/jpg;base64,${image}`}
      alt="banger"
      className={"image"}
    />
  );
};

const BangerSound = ({ banger, fetchWithCookie }) => {
  const [song, setSong] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      const Response = await fetchWithCookie(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/files/${banger.song_upload}`
      );
      const songUrl = Response;
      setSong(songUrl.file_data);
    };
    fetchSong();
  }, [banger, fetchWithCookie]);

  return <audio src={`data:audio/mp3;base64,${song}`} alt="banger" controls />;
};

function PostBanger({ banger }) {
  const { fetchWithCookie } = useToken();

  return (
    <div className="post-card1">
      <div className="post-card">
        <BangerImage banger={banger} fetchWithCookie={fetchWithCookie} />
      </div>
      <div className="right-content">
        <div className="sound">
          <React.Fragment>
            <BangerSound banger={banger} fetchWithCookie={fetchWithCookie} />
          </React.Fragment>
        </div>
        <br />
        <p className="banger-subtitle">{banger?.song_title}</p>
        <p className="banger">{banger?.artist}</p>
        <p className="banger-artist">{banger?.album}</p>
      </div>
    </div>
  );
}

export default PostBanger;
