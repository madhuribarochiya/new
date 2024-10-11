import React, { useState } from 'react';

const UploadTool = () => {
  const [toolName, setToolName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [price, setPrice] = useState('');
  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the upload logic
    // console.log({ toolName, description, image, video, price, files });
  };

  return (
    <div className="mt-24 p-8">
      <h1 className="text-2xl font-bold mb-6">Upload AI Tool</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-secondary-dark-bg p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Tool Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            placeholder="Enter tool name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Description</label>
          <textarea
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter tool description"
            rows="4"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Image</label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button
              type="button"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-white dark:bg-gray-800 dark:text-white flex items-center justify-center"
            >
              Choose Image
            </button>
          </div>
        </div>

        {/* Video Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Video</label>
          <div className="relative">
            <input
              type="file"
              accept="video/*"
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              onChange={(e) => setVideo(e.target.files[0])}
            />
            <button
              type="button"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-white dark:bg-gray-800 dark:text-white flex items-center justify-center"
            >
              Choose Video
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Price</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter tool price"
          />
        </div>

        {/* Additional Files Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Additional Files</label>
          <div className="relative">
            <input
              type="file"
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files))}
            />
            <button
              type="button"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-700 bg-white dark:bg-gray-800 dark:text-white flex items-center justify-center"
            >
              Choose Files
            </button>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Upload Tool
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadTool;
