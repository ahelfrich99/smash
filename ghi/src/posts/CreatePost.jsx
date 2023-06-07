import { useState, useEffect } from "react";

export default function CreatePost({ onPostCreated, onClose, token }) {
  const [bangerz, setBangerz] = useState([]);
  const [text, setText] = useState("");
  const [banger, setBanger] = useState("");

  const getBangerz = async () => {
    const url = "http://localhost:8000/bangerz/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setBangerz(data);
    }
  };

  const handleUpdate = (event, stateFunction) => {
    const value = event.target.value;
    stateFunction(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      banger_id: banger,
      text: text,
    };

    const postsUrl = "http://localhost:8000/posts/";
    const fetchConfigUrl = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(postsUrl, fetchConfigUrl);

    if (response.ok) {
      setText("");
      onPostCreated();
      onClose();
    }
  };

  const handleCancel = () => {
    setText("");
    onClose();
  };

  useEffect(() => {
    getBangerz();
  }, []);

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
              <div className="w-full flex justify-start text-gray-600 mb-3"></div>
              <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                Create a Post
              </h1>
              <label
                htmlFor="banger"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Choose a Banger
              </label>
              <select
                id="banger"
                className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="banger"
                value={banger}
                onChange={(event) => handleUpdate(event, setBanger)}
              >
                <option value="">No selection</option>
                {bangerz?.map((banger) => {
                  return (
                    <option key={banger.id} value={banger.id}>
                      {banger.song_title}
                    </option>
                  );
                })}
              </select>
              <label
                htmlFor="text"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Text
              </label>
              <input
                id="text"
                className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="ex. Check out my great new song!"
                type="text"
                value={text}
                onChange={(event) => handleUpdate(event, setText)}
                required
              />
              <div className="flex items-center justify-start w-full">
                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition duration-150 ease-in-out hover:bg-blue-600 bg-blue-700 rounded text-white px-8 py-2 text-sm">
                  Submit
                </button>
                <button
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-red-400 ml-3 bg-red-100 transition duration-150 text-white-600 ease-in-out hover:border-red-400 hover:bg-red-300 border rounded px-8 py-2 text-sm"
                  onClick={handleCancel}
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
