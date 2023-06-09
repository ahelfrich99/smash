import { useState } from "react";

export default function CreateComment({
  onCommentCreated,
  onClose,
  token,
  postData,
}) {
  const [content, setContent] = useState("");

  const handleUpdate = (event, stateFunction) => {
    const value = event.target.value;
    stateFunction(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const id = postData.id;

    const data = {
      post_id: id,
      content: content,
    };

    const commentsUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/posts/${id}/comments`;
    const fetchConfigUrl = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(commentsUrl, fetchConfigUrl);

    if (response.ok) {
      setContent("");
      onCommentCreated(postData.id);
      onClose();
    }
  };

  const handleCancel = () => {
    setContent("");
    onClose();
  };

  return (
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
              New Comment
            </h1>
            <label
              htmlFor="text"
              className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
            >
              Content
            </label>
            <input
              id="text"
              className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="ex. Check out my great new song!"
              type="text"
              value={content}
              onChange={(event) => handleUpdate(event, setContent)}
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
  );
}
