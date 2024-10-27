import React, { useState, useEffect } from 'react';
import { IoIosMore } from 'react-icons/io';
import { FaThumbsUp, FaThumbsDown, FaShareAlt, FaCommentAlt } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

// Search Bar Component
// const SearchBar = ({ setSearchTerm, currentMode }) => (
//   <div className="mb-8">
//     <input
//       type="text"
//       placeholder="Search tools..."
//       onChange={(e) => setSearchTerm(e.target.value)}
//       className={`w-full p-2 border rounded-md 
//       ${currentMode === 'Dark' ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
//     />
//   </div>
// );

// Tool Card Component with Delete Option
const ToolCard = ({ title, description, image, tool }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toolImage = Array.isArray(image) && image.length > 0 ? image[0] : 'default tool icon.jpeg';

  const toggleMenu = () => {
    setMenuOpen(prev => !prev); // Use functional update for better state management
  };

  const handleShare = (toolID) => {
    navigator.clipboard.writeText(`frontend_url/${toolID}`);
  };

  const handleRemove = async (toolID) => {
    const tID = toast.loading("Removing tool from library...");
    try {
      const response = await axios.delete(`http://localhost:4000/user/removeFromLibrary`, { _id: toolID }, { withCredentials: true });
      console.log(response);
      if (response.data.success) {
        toast.update(tID, { render: "Tool removed from library!", type: "success", isLoading: false, autoClose: 3000 }); // Success toast
      } else {
        toast.update(tID, { render: "Unauthorized", type: "error", isLoading: false, autoClose: 3000 }); // Error toast
      }
    } catch (error) {
      toast.update(tID, { render: "An error occurred while removing the tool.", type: "error", isLoading: false, autoClose: 3000 }); // Error toast
    }
  };

  return (
    <div className="relative bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-4 m-3 w-full">
      <img src={`http://localhost:4000/load/${toolImage}`} alt={title} className="w-full h-48 object-cover rounded-md" />
      <h2 className="text-lg font-semibold mt-2">{title}</h2>
      <p className="text-sm text-gray-400">{description}</p>

      {/* Three Dots Menu */}
      <div className="absolute top-4 right-4">
        <button onClick={toggleMenu} className="focus:outline-none">
          <IoIosMore size={24} />
        </button>
        {menuOpen && (
          <div className="absolute bg-white dark:bg-gray-800 p-2 rounded-md shadow-lg right-0 mt-2 z-10 w-48">
            <ul>
              <li onClick={(toolID) => { handleRemove(toolID) }} className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 cursor-pointer">Remove from Library</li>
            </ul>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-4">
        <p className="flex items-center text-blue-500">
          <FaThumbsUp className="mr-1" /> {tool.likes}
        </p>
        <p className="flex items-center text-red-500">
          <FaThumbsDown className="mr-1" /> {tool.dislikes}
        </p>
        <p className="flex items-center text-green-500">
          <FaCommentAlt className="mr-1" /> {tool.comments ? tool.comments.length : 0} {/* Added check for tool.comments */}
        </p>
        <button onClick={() => handleShare(tool._id)} className="flex items-center text-purple-500">
          <FaShareAlt className="mr-1" />
        </button>
      </div>
    </div>
  );
};

// History Component
const History = () => {
  // const [searchTerm, setSearchTerm] = useState('');
  const [viewedTools, setViewedTools] = useState([]);

  const fetchTools = async () => {
    try {
      const response = await axios.get('http://localhost:4000/user/getHistory', { withCredentials: true });
      if (response.data.success) {
        setViewedTools(response.data.data);
      } else {
        console.error("Failed to fetch tools."); // Error toast
      }
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  // Load initial tools
  useEffect(() => {
    fetchTools(); // Fetch tools on component mount
  }, []);

  // Filter tools based on search input
  // const filteredTools = viewedTools ? viewedTools.filter((tool) =>
  //   tool.title && tool.title.toLowerCase().includes(searchTerm.toLowerCase()) // Changed from tool.name to tool.title
  // ) : ([]);

  return (
    <>
      <ToastContainer />
      <div className="">
        {/* Search Bar */}
        {/* <SearchBar setSearchTerm={setSearchTerm} currentMode={currentMode} /> */}

        {/* Viewed Tools Section */}
        {/* <h2 className="text-2xl font-bold mb-4">Viewed Tools</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
          {viewedTools.map((tool, index) => (
            tool && (
              <ToolCard
                key={index}
                title={tool.toolId.title}
                description={tool.toolId.description}
                image={tool.toolId.image}
                tool={tool.toolId}
              />
            )
          ))}
        </div>
      </div>
    </>
  );
};

export default History;
