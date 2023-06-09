import { useState, useEffect } from "react";
import React from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import BangerzForm from './BangerzForm';
import UseUser from '../useUser';

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

function BangerzPage() {
    const [bangerz, setBangerz] = useState([]);
    const [showBangerzFormModal, setShowBangerzFormModal] = useState(false);
    const { token, fetchWithCookie } = useToken();
    const { user } = UseUser(token);

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/bangerz`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setBangerz(data);
    }
  };

    const handleDelete = async (id) => {
        if (bangerz) {
            const deleteUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/bangerz/${id}`;
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
        });
          if (response.ok) {
              fetchData();
          }
        }
    };

    const handleCloseModal = () => {
      setShowBangerzFormModal(false);
    };

    const handleOpenModal = () => {
      setShowBangerzFormModal(true);
    };



    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        <div className="container mt-4">
          <div className="row justify-content-end text-center">
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={handleOpenModal}
            >
              Add a Banger
            </button>
          </div>
        </div>
        {showBangerzFormModal && (
          <BangerzForm
            onPostCreated={fetchData}
            onClose={handleCloseModal}
            user={user}
          />
        )}
        <ul className="divide-y divide-gray-100">
            {bangerz?.map(banger => {
                return (
                    <li className="flex justify-between gap-x-6 py-5" key={banger.id}>
                        <div className="flex gap-x-4">
                            <BangerImage
                                banger={banger}
                                fetchWithCookie={fetchWithCookie}
                            />
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{banger.song_title}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-700">{banger.artist}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{banger.album}</p>
                        </div>
                        </div>
                        <React.Fragment>
                          <BangerSound
                                  banger={banger}
                                  fetchWithCookie={fetchWithCookie}
                          />
                        </React.Fragment>
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <div className="mt-1 flex items-center gap-x-1.5">
                                <p className="text-xs leading-5 text-gray-500">{banger.date}</p>
                            </div>
                            <div className="mt-1 flex items-center gap-x-1.5">
                                <button
                                    onClick={() => handleDelete(banger.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 text-sm rounded"
                                    >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
      </>
    );
}

export default BangerzPage;
