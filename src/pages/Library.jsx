import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { IoIosMore } from 'react-icons/io';
import { FaThumbsUp, FaThumbsDown, FaShareAlt, FaCommentAlt } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

// Search Bar Component
const SearchBar = ({ setSearchTerm, currentMode }) => (
  <div className="mb-8">
    <input
      type="text"
      placeholder="Search tools..."
      onChange={(e) => setSearchTerm(e.target.value)}
      className={`w-full p-2 border rounded-md 
      ${currentMode === 'Dark' ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
    />
  </div>
);

// Tool Card Component
const ToolCard = ({ title, description, image, tool, set }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleShare = (toolID) => {
    navigator.clipboard.writeText(`frontend_url/${toolID}`);
  };

  const handleRemove = async (toolID) => {
    const tID = toast.loading("Removing tool from library...");
    try {
      const response = await axios.post(`http://localhost:4000/user/remove`, { _id: toolID }, { withCredentials: true });
      console.log(response);
      if (response.data.success) {
        toast.update(tID, { render: "Tool removed from library!", type: "success", isLoading: false, autoClose: 3000 }); // Success toast
        set((prevTools) => prevTools.filter(tool => tool._id !== toolID)); // Remove from viewed tools
      } else {
        toast.update(tID, { render: response.data.message, type: "error", isLoading: false, autoClose: 3000 }); // Error toast
      }
    } catch (error) {
      toast.update(tID, { render: "An error occurred while removing the tool.", type: "error", isLoading: false, autoClose: 3000 }); // Error toast
    }
  };

  return (
    <div className="relative bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-4 m-3 w-full">
      <img src={`http://localhost:4000/load/${image}`} alt={title} className="w-full h-48 object-cover rounded-md" />
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
              <li onClick={(e) => { handleRemove(tool._id) }} className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 cursor-pointer">Remove from Library</li>
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
          <FaCommentAlt className="mr-1" /> {tool.comments.length}
        </p>
        <button onClick={() => handleShare(tool._id)} className="flex items-center text-purple-500">
          <FaShareAlt className="mr-1" />
        </button>
      </div>
    </div>
  );
};

// Library Component
const Library = () => {
  const { currentMode } = useStateContext();
  const [tools, setTools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTools = async () => {
    try {
      const response = await axios.get('http://localhost:4000/user/library', { withCredentials: true });
      if (response.data.success) {
        setTools(response.data.data.library);
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
  const filteredToolLists = tools.filter((tool) =>
    tool.name && tool.name.toLowerCase().includes(searchTerm.toLowerCase()) // Added check for tool.title
  );

  return (
    <>
      <ToastContainer />
      <div className="">
        {/* Search Bar */}
        <SearchBar setSearchTerm={setSearchTerm} currentMode={currentMode} />

        {/* Render each ToolList category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
          {filteredToolLists.map((tool, toolIndex) => (
            <ToolCard
              key={toolIndex}
              title={tool.name}
              description={tool.description}
              image={tool.image[0]}
              tool={tool}
              set={setTools}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Library;
