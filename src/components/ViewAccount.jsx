import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaShareAlt, FaCommentAlt } from 'react-icons/fa'; // Import necessary icons
import axios from 'axios';

// Sample data for channel details

// Channel Details Component (Hidden until button is clicked)
const ChannelDetails = ({ details, currentMode,user }) => {
  return (
    <div className={`p-4 rounded-lg w-full max-w-sm ${currentMode === 'Dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      <h3 className="text-lg font-semibold">Channel details</h3>
      <p className="mt-2">URL: <a href={`https://fronted_url/${user.username}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">{`https://fronted_url/${user.username}`}</a></p>
      <p className="mt-2">Subscribers: {details.subscribers}</p>
      <p className="mt-2">No of tools: {details.noOfTools}</p>
      <p className="mt-2">Views: {details.views}</p>
    </div>
  );
};

// AI Tool Card Component
const ToolCard = ({ title, description, image, currentMode, onLike, onDislike, onShare, onComment, likeCount, dislikeCount, commentCount }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      setComment('');
      onComment(title, comment); // Pass comment to parent handler
    }
  };


  return (
    <div className={`relative rounded-2xl p-4 m-3 w-full ${currentMode === 'Dark' ? 'bg-secondary-dark-bg text-white' : 'bg-white text-black'}`}>
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-md" />
      <h2 className="text-lg font-semibold mt-2">{title}</h2>
      <p className="text-sm text-gray-400">{description}</p>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button onClick={onLike} className="flex items-center text-gray-500 hover:text-blue-500">
          <FaThumbsUp className="mr-1" />  {likeCount}
        </button>
        <button onClick={onDislike} className="flex items-center text-gray-500 hover:text-red-500">
          <FaThumbsDown className="mr-1" />  {dislikeCount}
        </button>
        <button onClick={onShare} className="flex items-center text-gray-500 hover:text-green-500">
          <FaShareAlt className="mr-1" />
        </button>
        <button onClick={() => setShowCommentBox(!showCommentBox)} className="flex items-center text-gray-500 hover:text-purple-500">
          <FaCommentAlt className="mr-1" />  {commentCount}
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

const ViewAccount = () => {
  const navigate = useNavigate();
  const handleManageAITools = () => {
    console.log("Manage AI Tools button clicked");
    navigate('/UploadedTools');
  };
  const { user,currentColor, currentMode } = useStateContext(); // Assuming currentMode has 'Light' or 'Dark'
  const [showChannelDetails, setShowChannelDetails] = useState(false);

  const [details, setDetails] = useState({
    url: '',
    subscribers: 0,
    noOfTools: 0,
    views: 0
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (user && user.username) {
          const response = await axios.get(`http://localhost:4000/channel/getDetails/${user?.username}`, {
            withCredentials: true,
          });
          if (response.data.success) {
            setDetails(response.data.data)
          }
        }
      } catch (error) {
        console.error("Error fetching user data",error);
      }
    };

    fetchDetails();
  }, []);

  const tools = [
    { title: 'AI Tool 1', description: 'Description of AI Tool 1', image: 'https://via.placeholder.com/150' },
    { title: 'AI Tool 2', description: 'Description of AI Tool 2', image: 'https://via.placeholder.com/150' },
    { title: 'AI Tool 3', description: 'Description of AI Tool 3', image: 'https://via.placeholder.com/150' },
  ];

  const [likes, setLikes] = useState(Array(tools.length).fill(0));
  const [dislikes, setDislikes] = useState(Array(tools.length).fill(0));
  const [comments, setComments] = useState(Array(tools.length).fill(0));

  const handleToggleDetails = () => {
    setShowChannelDetails(!showChannelDetails);
  };

  // Handlers for actions
  const handleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index] += 1;
    setLikes(newLikes);
  };

  const handleDislike = (index) => {
    const newDislikes = [...dislikes];
    newDislikes[index] += 1;
    setDislikes(newDislikes);
  };

  const handleShare = (tool) => {
    console.log(`Shared ${tool.title}`);
  };

  const handleComment = (index, comment) => {
    const newComments = [...comments];
    newComments[index] += 1;
    setComments(newComments);
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }
  
  return (
    <div className="mt-24">
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className={`rounded-full p-4 ${currentMode === 'Dark' ? 'bg-secondary-dark-bg' : 'bg-white'}`}>
            <img
              src="https://via.placeholder.com/150"
              alt="User Avatar"
              className="rounded-full w-32 h-32 object-cover"
            />
          </div>
          <h2 className="text-xl font-bold mt-4">{user.username}</h2>
          {/* <p className={`text-gray-500 ${currentMode === 'Dark' ? 'text-gray-400' : ''}`}>@madhuri1672 - 17 subscribers - 1 video</p> */}
        </div>
      </div>

      {/* Options Section */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={handleToggleDetails}
          className={`py-2 px-4 rounded-md hover:opacity-80 ${currentMode === 'Dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}
        >
          {showChannelDetails ? 'Hide Channel Details' : 'Show Channel Details'}
        </button>
        <button
          onClick={handleManageAITools}
          className="py-2 px-4 rounded-md hover:opacity-80 bg-green-500 text-white"
        >
          Manage AI Tools
        </button>
      </div>

      {/* Conditional Rendering of Channel Details */}
      <div className="mt-8 flex justify-center">
        {showChannelDetails && <ChannelDetails details={details} currentMode={currentMode} user={user}/>}
      </div>

      {/* AI Tool Cards with Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 mt-8">
        {tools.map((tool, index) => (
          <ToolCard
            key={index}
            title={tool.title}
            description={tool.description}
            image={tool.image}
            currentMode={currentMode}
            onLike={() => handleLike(index)}
            onDislike={() => handleDislike(index)}
            onShare={() => handleShare(tool)}
            onComment={() => handleComment(index)}
            likeCount={likes[index]}
            dislikeCount={dislikes[index]}
            commentCount={comments[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewAccount;
