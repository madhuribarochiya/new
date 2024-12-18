import React, { useState, useEffect, useRef } from 'react';
import { IoIosMore } from 'react-icons/io'; // For three dots menu icon
import { useStateContext } from '../contexts/ContextProvider';
import { FaThumbsUp, FaThumbsDown, FaShareAlt, FaCommentAlt } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Importing toast
import { useNavigate } from 'react-router-dom';

const ToolCard = ({ tool }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentMode } = useStateContext();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleShare = (toolID) => {
    navigator.clipboard.writeText(`http://localhost:3000/tool/${toolID}`);
    toast.info("Link Copied", { autoClose: 1000 });
  };

  const handleSave = async (toolID) => {
    const tID = toast.loading("Saving tool to library..."); // Loading toast
    try {
      const response = await axios.post("http://localhost:4000/user/addToLibrary", { _id: toolID }, { withCredentials: true });
      if (response.data.success) {
        toast.update(tID, { render: "Tool saved to library!", type: "success", isLoading: false, autoClose: 3000 }); // Success toast
      } else {
        toast.update(tID, { render: response.data.message, type: "error", isLoading: false, autoClose: 3000 }); // Error toast
      }
    } catch (error) {
      toast.update(tID, { render: "An error occurred while saving the tool.", type: "error", isLoading: false, autoClose: 3000 }); // Error toast
    }
  };

  return (
    <div className="relative bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-4 w-full">
      <img
        src={`http://localhost:4000/load/${tool.image.length !== 0 ? tool.image[0] : 'default tool icon.jpeg'}`}
        onClick={() => navigate(`/tool/${tool._id}`)}
        alt={tool.name}
        className="w-full h-48 object-cover rounded-md hover:cursor-pointer"
      />
      <h2 className="underline-on-hover text-lg font-semibold mt-2" onClick={() => navigate(`/tool/${tool._id}`)}>{tool.name}</h2>
      <p className={`text-sm text-${currentMode === "Dark" ? 'gray-400' : 'black'} overflow-hidden text-ellipsis whitespace-nowrap`}>{tool.description}</p>

      {/* Three Dots Menu */}
      <div className="absolute top-4 right-4">
        <button onClick={toggleMenu} className="focus:outline-none">
          <IoIosMore size={24} />
        </button>
        {menuOpen && (
          <div className="absolute bg-white dark:bg-gray-800 p-2 rounded-md shadow-lg right-0 mt-2 z-10 w-48">
            <ul>
              <li onClick={() => { handleSave(tool._id) }} className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 cursor-pointer">Save to Library</li>
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
          <FaCommentAlt className="mr-1" />{tool.comments.length}
        </p>
        <button onClick={() => handleShare(tool._id)} className="flex items-center text-purple-500">
          <FaShareAlt className="mr-1" />
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const containerRef = useRef(null);
  const [page, setPage] = useState(1);    // State for current page

  const { user, isLoggedIn } = useStateContext();

  const fetchTools = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      if (isLoggedIn === null) {
        console.log("dont do anything")
      }
      else if (isLoggedIn === true) {
        const response = await axios.get(`http://127.0.0.1:8000/recommendations?user_id=${user._id}&page=${page}`);
        if (response.data.success) {
          setTools(prevTools => [...prevTools, ...response.data.data]); // Append new tools
        } else {
          console.log("Failed to fetch tools."); // Error toast
        }
      } else {
        console.log(false)
        const response = await axios.get(`http://localhost:4000/tools/tools`, { withCredentials: true });
        if (response.data.success) {
          setTools(prevTools => [...prevTools, ...response.data.data]); // Append new tools
        } else {
          console.log("Failed to fetch tools."); // Error toast
        }
      }
    } catch (error) {
      console.log('Error fetching tools:', error);
    } finally {
      setLoading(false); // Set loading to false when fetching ends
    }
  };

  // Load initial tools
  useEffect(() => {
    fetchTools(); // Fetch tools on component mount
  }, [page, isLoggedIn]);

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          setPage(prevPage => prevPage + 1); // Fetch more tools when at the bottom
        }
      }
    };
  
    const currentContainer = containerRef.current;
  
    // Check if the element exists before adding the event listener
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      // Check if the element exists before removing the event listener
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [containerRef]);
  

  return (
    <>
      <ToastContainer />
      {loading ? ( // Show loading screen while loading
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="ml-4">Loading tools...</p>
        </div>
      ) : (
        <div className="" ref={containerRef} style={{ overflowY: 'auto', maxHeight: '80vh' }}>
          {/* Adjusted Grid Layout for Tool Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
            {tools.map((tool, index) => (
              <div key={index} >
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
