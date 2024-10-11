import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { FaThumbsUp, FaThumbsDown, FaCommentAlt, FaShareAlt, FaChartBar, FaTrash, FaPlus } from 'react-icons/fa';

const UploadedTools = () => {
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  // State for managing uploaded tools
  const [tools, setTools] = useState([
    {
      id: 1,
      name: 'AI Model A',
      description: 'This is a powerful AI model for predictive analysis.',
      image: 'src/data/image.png',
      likes: 10,
      dislikes: 2,
      comments: 5,
    },
    {
      id: 2,
      name: 'AI Tool B',
      description: 'A tool to automate machine learning workflows.',
      image: 'src/data/image.png',
      likes: 15,
      dislikes: 3,
      comments: 7,
    },
  ]);

  // Functions to handle user actions
  const handleLike = (toolId) => {
    // console.log(`Liked tool with id ${toolId}`);
  };

  const handleDislike = (toolId) => {
    // console.log(`Disliked tool with id ${toolId}`);
  };

  const handleComment = (toolId) => {
    // console.log(`Commented on tool with id ${toolId}`);
  };

  const handleShare = (toolId) => {
    // console.log(`Shared tool with id ${toolId}`);
  };

  const handleAnalytics = (toolId) => {
    // console.log(`View analytics for tool with id ${toolId}`);
  };

  const handleDelete = (toolId) => {
    setTools(tools.filter((tool) => tool.id !== toolId));
  };

  // Redirect to the UploadTool page
  const redirectToUploadTool = () => {
    navigate('/UploadTool'); // Specify the route to navigate to
  };

  return (
    <div className="mt-24 p-8">
      <h1 className="text-2xl font-bold mb-6">Uploaded AI Tools</h1>
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mb-6 hover:bg-blue-600 flex items-center"
        onClick={redirectToUploadTool} // Use the redirect function on button click
      >
        <FaPlus className="mr-2" /> Upload New Tool
      </button>

      {/* Display Uploaded Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div key={tool.id} className="bg-white dark:bg-secondary-dark-bg p-6 rounded-lg shadow-lg relative">
            <img src={tool.image} alt={tool.name} className="w-full h-32 object-cover rounded-lg mb-4" />
            <h2 className="text-lg font-semibold mb-2 dark:text-gray-200">{tool.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{tool.description}</p>
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-4">
                <button onClick={() => handleLike(tool.id)} className="flex items-center text-gray-500 hover:text-blue-500">
                  <FaThumbsUp className="mr-1" /> {tool.likes}
                </button>
                <button onClick={() => handleDislike(tool.id)} className="flex items-center text-gray-500 hover:text-red-500">
                  <FaThumbsDown className="mr-1" /> {tool.dislikes}
                </button>
                <button onClick={() => handleComment(tool.id)} className="flex items-center text-gray-500 hover:text-green-500">
                  <FaCommentAlt className="mr-1" /> {tool.comments}
                </button>
                <button onClick={() => handleShare(tool.id)} className="flex items-center text-gray-500 hover:text-purple-500">
                  <FaShareAlt className="mr-1" /> Share
                </button>
              </div>
              <button onClick={() => handleAnalytics(tool.id)} className="bg-blue-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-blue-600">
                <FaChartBar className="mr-1" /> Analytics
              </button>
            </div>
            <button
              onClick={() => handleDelete(tool.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadedTools;
