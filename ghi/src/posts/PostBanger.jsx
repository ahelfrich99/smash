import { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import React from "react";

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
      style={{ maxWidth: "150px" }}
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
    <div className="flex justify-between gap-x-6 py-5">
      <div className="flex gap-x-4">
        <BangerImage banger={banger} fetchWithCookie={fetchWithCookie} />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {banger?.song_title}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-700">
            {banger?.artist}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {banger?.album}
          </p>
        </div>
      </div>
      <React.Fragment>
        <BangerSound banger={banger} fetchWithCookie={fetchWithCookie} />
      </React.Fragment>
    </div>
  );
}

export default PostBanger;
