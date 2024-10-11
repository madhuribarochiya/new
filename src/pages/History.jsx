import React, { useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import aiToolImage from '../data/image.png'; // Example image
import { IoIosMore } from 'react-icons/io';
import { FaThumbsUp, FaThumbsDown, FaShareAlt, FaCommentAlt, FaTrash } from 'react-icons/fa';

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

// Tool Card Component with Delete Option
const ToolCard = ({ title, description, image, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  const handleDislike = () => {
    setDislikeCount(dislikeCount + 1);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      setComment('');
      setCommentCount(commentCount + 1);
    }
  };

  return (
    <div className="relative bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-4 m-3 w-full">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-md" />
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
        <button onClick={handleLike} className="flex items-center text-gray-500 hover:text-blue-500">
          <FaThumbsUp className="mr-1" /> {likeCount}
        </button>
        <button onClick={handleDislike} className="flex items-center text-gray-500 hover:text-red-500">
          <FaThumbsDown className="mr-1" /> {dislikeCount}
        </button>
        <button className="flex items-center text-gray-500 hover:text-green-500">
          <FaShareAlt className="mr-1" />
        </button>
        <button onClick={() => setShowCommentBox(!showCommentBox)} className="flex items-center text-gray-500 hover:text-purple-500">
          <FaCommentAlt className="mr-1" /> {commentCount}
        </button>
        <button onClick={onDelete} className="flex items-center text-gray-500 hover:text-red-500">
          <FaTrash className="mr-1" />
        </button>
      </div>

      {/* Comment Section (Hidden until the Comment button is clicked) */}
      {showCommentBox && (
        <div className="mt-4">
          <textarea
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
            rows="2"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 py-1 px-3 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            Submit
          </button>

          {/* Display Comments */}
          <div className="mt-4">
            {comments.map((com, index) => (
              <div key={index} className="text-sm text-gray-500 mt-1">
                {com}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// History Component
const History = () => {
  const { currentMode } = useStateContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewedTools, setViewedTools] = useState([
    { title: 'AI Tool 1', description: 'Description of AI Tool 1', image: aiToolImage },
    { title: 'AI Tool 2', description: 'Description of AI Tool 2', image: aiToolImage },
    { title: 'AI Tool 3', description: 'Description of AI Tool 3', image: aiToolImage },
    { title: 'AI Tool 4', description: 'Description of AI Tool 4', image: aiToolImage },
  ]);

  // Handle delete tool from the viewed list
  const handleDelete = (indexToDelete) => {
    setViewedTools(viewedTools.filter((_, index) => index !== indexToDelete));
  };

  // Filter tools based on search input
  const filteredTools = viewedTools.filter((tool) =>
    tool.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-24">
      {/* Search Bar */}
      <SearchBar setSearchTerm={setSearchTerm} currentMode={currentMode} />

      {/* Viewed Tools Section */}
      <h2 className="text-2xl font-bold mb-4">Viewed Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
        {filteredTools.map((tool, index) => (
          <ToolCard
            key={index}
            title={tool.title}
            description={tool.description}
            image={tool.image}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default History;
