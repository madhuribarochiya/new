/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";

const UploadTool = () => {
  const naviagte = useNavigate();
  const [toolName, setToolName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [files, setFiles] = useState([]);
  const [toolsID, setToolsID] = useState()
  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentPage === 1) {
      const data = {
        name: toolName,
        description: description,
        price: parseInt(price),
        category: ["AI"],
      }
      const response = await axios.post("http://localhost:4000/tools/add", data, { withCredentials: true });
      if (response.data.success) {
        setToolsID(response.data.data.toolID)
        setCurrentPage(2); // Move to the next page
      }
    } else {
      const formData = new FormData();
      if (image) {
        formData.append('images', image);
      }
      if (video) {
        formData.append('videos', video);
      }
      if (files.length > 0) {
        files.forEach((file) => {
          formData.append('files', file);
        });
      }

      const loadingToastId = toast.loading('Sending data...');
      // Check if formData has any entries
      if (formData.has('images') || formData.has('videos') || formData.has('files')) {
        const response = await axios.post(`http://localhost:4000/tools/${toolsID}/media`, formData, { withCredentials: true });
        if (response.data.success) {
          toast.update(loadingToastId, { render: "Tool's files Uploaded", type: 'success', isLoading: false, autoClose: 3000 });
          setTimeout(() => {
            naviagte('/UploadedTools')
          }, 3000)
        }
      } else {
        toast.update(loadingToastId, { render: "Error Occured", type: 'error', isLoading: false, autoClose: 3000 });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Upload AI Tool</h1>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-secondary-dark-bg p-8 rounded-lg shadow-lg">
          {currentPage === 1 && ( // First page
            <>
              <div className="mb-4">
                <label htmlFor="toolName" className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Tool Name</label>
                <input
                  type="text"
                  id="toolName"
                  className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                  placeholder="Enter tool name"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Description" className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Description</label>
                <textarea
                  className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
                  value={description}
                  id="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter tool description"
                  rows="4"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Price</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white appearance-none" // Added appearance-none
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter tool price"
                />
              </div>
            </>
          )}

          {currentPage === 2 && ( // Second page
            <>
              {/* Image Upload */}
              <div className="mb-4">
                {image && (
                  <div className="mb-4">
                    <h2 className="font-semibold">Uploaded Image:</h2>
                    <p className="text-gray-700">{image.name}</p>
                  </div>
                )}
                <label htmlFor="image" className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">Image</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    id="image"
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
                {video && (
                  <div className="mb-4">
                    <h2 className="font-semibold">Uploaded Video:</h2>
                    <p className="text-gray-700">{video.name}</p>
                  </div>
                )}
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

              {/* Additional Files Upload */}
              <div className="mb-4">
                {files.length > 0 && (
                  <div className="mb-4">
                    <h2 className="font-semibold">Uploaded Files:</h2>
                    <ul className="mt-2">
                      {files.map((file, index) => (
                        <li key={index} className="text-gray-700">{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
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
            </>
          )}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
            >
              {currentPage === 1 ? 'Next' : 'Upload Tool'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadTool;
