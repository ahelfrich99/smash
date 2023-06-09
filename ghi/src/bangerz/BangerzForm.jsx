import React, { useEffect, useState } from 'react';

function BangerzForm({ user, onClose, onPostCreated }) {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [img, setImg] = useState('');
    const [song, setSong] = useState('');
    const [date, setDate] = useState('');

    const handleTitleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
    }

    const handleArtistChange = (event) => {
        const value = event.target.value;
        setArtist(value);
    }

    const handleAlbumChange = (event) => {
        const value = event.target.value;
        setAlbum(value);
    }

    const handleImgChange = (event) => {
        const file = event.target.files[0];
        setImg(file);
    }

    const handleSongChange = (event) => {
        const file = event.target.files[0];
        setSong(file);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let uploadedFileImg;
        let uploadedFileSong;
        if (img) {
            const formData = new FormData();
            formData.append('file', img);
            formData.append('file_type', 'image');
            const response = await fetch(`${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/files`, {
                method: 'POST',
                body: formData
            });
            const dataId = await response.json();
            uploadedFileImg = dataId.id;
        }

        if (song) {
            const formData = new FormData();
            formData.append("file", song);
            formData.append("file_type", "audio");
            const response = await fetch(
              `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/files`,
              {
                method: "POST",
                body: formData,
              }
            );
            const dataId = await response.json();
            uploadedFileSong = dataId.id;
        }

        const data = {
            song_title: title,
            artist: artist,
            album: album,
            song_img: uploadedFileImg,
            song_upload: uploadedFileSong,
            date: date,
            user_id: user.id,
        };

        const bangerzUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/bangerz`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(bangerzUrl, fetchConfig);
        if (response.ok) {
            setTitle('');
            setArtist('');
            setAlbum('');
            setImg('');
            setSong('');
            onPostCreated();
            onClose();
        }
      };

    useEffect(() => {
        const fetchData = async () => {
            let id = "";
            if (user && user.id) {
                id = user.id;
            }
            if (!id) {
                return;
            }
            const accountsUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/accounts/${id}`;
            const response = await fetch(accountsUrl);

            if (response.ok) {
                return;
            }
        };

        fetchData();
        const currentDate = new Date().toISOString().slice(0, 10);
        setDate(currentDate);
    }, [user]);

      const handleCancel = () => {
        setTitle('');
        setArtist('');
        setAlbum('');
        setImg('');
        setSong('');
        setDate('');
        onClose();
      };

    return (
        <>
        <div>
            <div
                className="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
                id="createbanger"
            >
                <form
                    onSubmit={handleSubmit}
                    className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
                >
                <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                    <div className="w-full flex justify-start text-gray-600 mb-3">
                    </div>
                    <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Add a Banger</h1>
                    <label htmlFor="title" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Song Title</label>
                    <input
                        id="title"
                        className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        placeholder="Song Title"
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <label htmlFor="artist" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Artist</label>
                    <input
                        id="artist"
                        className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        placeholder="Artist"
                        type="text"
                        value={artist}
                        onChange={handleArtistChange}
                    />
                    <label htmlFor="album" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Album</label>
                    <input
                        id="album"
                        className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        placeholder="Album"
                        type="text"
                        value={album}
                        onChange={handleAlbumChange}
                    />
                    <label htmlFor="img" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Picture Upload</label>
                    <input
                        id="img"
                        className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        type="file"
                        accept="image/*"
                        onChange={handleImgChange}
                    />
                    <label htmlFor="song" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Song Upload</label>
                    <input
                        id="song"
                        className=" mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                        type="file"
                        accept="audio/*"
                        onChange={handleSongChange}
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

export default BangerzForm;
