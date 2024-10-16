import React, { useState, useEffect, useRef } from 'react';
import { IoIosMore } from 'react-icons/io'; // For three dots menu icon
import { useStateContext } from '../contexts/ContextProvider';
import { FaThumbsUp, FaThumbsDown, FaShareAlt, FaCommentAlt } from 'react-icons/fa';
import axios from 'axios';

const ToolCard = ({ title, description, image }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-4 m-3 w-full">
      <img src={`http://localhost:4000/load/${image}`} alt={title} className="w-full h-48 object-cover rounded-md" />
      <h2 className="text-lg font-semibold mt-2">{title}</h2>
      <p className="text-sm text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">{description}</p>

      {/* Three Dots Menu */}
      <div className="absolute top-4 right-4">
        <button onClick={toggleMenu} className="focus:outline-none">
          <IoIosMore size={24} />
        </button>
        {menuOpen && (
          <div className="absolute bg-white dark:bg-gray-800 p-2 rounded-md shadow-lg right-0 mt-2 z-10 w-48">
            <ul>
              <li className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 cursor-pointer">Save to Watch Later</li>
              <li className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 cursor-pointer">Bookmark</li>
              <li className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 cursor-pointer">Share</li>
              <li className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 cursor-pointer">Not interested</li>
              <li className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 cursor-pointer">Don't recommend channel</li>
            </ul>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-4">
        {/* <button onClick={ } className="flex items-center text-gray-500 hover:text-blue-500">
          <FaThumbsUp className="mr-1" /> { }
        </button>
        <button onClick={ } className="flex items-center text-gray-500 hover:text-red-500">
          <FaThumbsDown className="mr-1" /> { }
        </button>
        <button className="flex items-center text-gray-500 hover:text-green-500">
          <FaShareAlt className="mr-1" />
        </button>
        <button onClick={ } className="flex items-center text-gray-500 hover:text-purple-500">
          <FaCommentAlt className="mr-1" /> { }
        </button> */}
      </div>
    </div>
  );
};



const Home = () => {
  const { currentMode } = useStateContext();
  const [displayedTools, setDisplayedTools] = useState([]); // New state for displayed tools

  const [tools, setTools] = useState([]);
  const containerRef = useRef(null);

  const fetchTools = async () => {
    try {
      const response = await axios.get('http://localhost:4000/tools/tools', { withCredentials: true });
      if (response.data.success) {
        setTools(prevTools => [...prevTools, ...response.data.data]); // Append new tools
        setDisplayedTools(response.data.data); // Set displayed tools initially
      }
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  // Load initial tools
  useEffect(() => {
    fetchTools(); // Fetch tools on component mount
  }, []);

  // Infinite scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          fetchTools(); // Fetch more tools when at the bottom
        }
      }
    };

    const currentContainer = containerRef.current;
    currentContainer.addEventListener('scroll', handleScroll);

    return () => {
      currentContainer.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef]);

  return (
    <div className="mt-24" ref={containerRef} style={{ overflowY: 'auto', maxHeight: '80vh' }}>
      {/* Search Bar */}
      {/* <SearchBar setSearchTerm={setSearchTerm} currentMode={currentMode} /> */}

      {/* Adjusted Grid Layout for Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
        {tools.map((tool, index) => (
          <ToolCard
            key={index}
            title={tool.title}
            description={tool.description}
            image={tool.image[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
