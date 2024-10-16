/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStateContext } from '../contexts/ContextProvider';

// Sample data for channel details

// Channel Details Component (Hidden until button is clicked)
const ChannelDetails = ({ details, currentMode }) => (
  <div className={`p-4 rounded-lg w-full max-w-sm ${currentMode === 'Dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
    <h3 className="text-lg font-semibold">Channel details</h3>
    <p className="mt-2">URL: <a href={`https://fronted_url/${details.username}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">{`https://fronted_url/${details.username}`}</a></p>
    <p className="mt-2">Subscribers: {details.subscribers}</p>
    <p className="mt-2">No of tools: {details.noOfTools}</p>
    <p className="mt-2">Views: {details.views}</p>
  </div>
);

// AI Tool Card Component
// const ToolCard = ({ title, description, image, currentMode, onLike, onDislike, onShare, onComment, likeCount, dislikeCount, commentCount }) => {
//   const [showCommentBox, setShowCommentBox] = useState(false);
//   const [comment, setComment] = useState('');
//   const [comments, setComments] = useState([]);

//   // Handle comment submission
//   const handleCommentSubmit = () => {
//     if (comment.trim() !== '') {
//       setComments([...comments, comment]);
//       setComment('');
//       onComment(title, comment); // Pass comment to parent handler
//     }
//   };

//   return (
//     <div className={`relative rounded-2xl p-4 m-3 w-full ${currentMode === 'Dark' ? 'bg-secondary-dark-bg text-white' : 'bg-white text-black'}`}>
//       <img src={`http://localhost:4000/load/${image || 'default tool icon.jpeg'}`} className="w-full h-48 object-cover rounded-md" />
//       <h2 className="text-lg font-semibold mt-2">{title}</h2>
//       <p className="text-sm text-gray-400">{description}</p>

//       {/* Action Buttons */}
//       <div className="flex justify-between items-center mt-4">
//         <button type="button" onClick={onLike} className="flex items-center text-gray-500 hover:text-blue-500">
//           <FaThumbsUp className="mr-1" />  {likeCount}
//         </button>
//         <button type="button" onClick={onDislike} className="flex items-center text-gray-500 hover:text-red-500">
//           <FaThumbsDown className="mr-1" />  {dislikeCount}
//         </button>
//         <button type="button" onClick={onShare} className="flex items-center text-gray-500 hover:text-green-500">
//           <FaShareAlt className="mr-1" />
//         </button>
//         <button type="button" onClick={() => setShowCommentBox(!showCommentBox)} className="flex items-center text-gray-500 hover:text-purple-500">
//           <FaCommentAlt className="mr-1" />  {commentCount}
//         </button>
//       </div>

//       {/* Comment Section (Hidden until the Comment button is clicked) */}
//       {showCommentBox && (
//         <div className="mt-4">
//           <textarea
//             className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
//             rows="2"
//             placeholder="Add a comment..."
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
//           <button
//             type="button"
//             onClick={handleCommentSubmit}
//             className="mt-2 py-1 px-3 rounded-md bg-blue-500 text-white hover:bg-blue-600"
//           >
//             Submit
//           </button>

//           <div className="mt-4">
//             {comments.map((com, index) => (
//               <div key={index} className="text-sm text-gray-500 mt-1">
//                 {com}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

const ViewAccount = () => {
  const navigate = useNavigate();
  const handleManageAITools = () => {
    navigate('/UploadedTools');
  };
  const { setUser, user, currentMode } = useStateContext();

  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (user && user.username) {
          const response = await axios.get(`http://localhost:4000/channel/getDetails/${user?.username}`, {
            withCredentials: true,
          });
          if (response.data.success) {
            setDetails(response.data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchDetails();
  }, [user]);

  const handleImgClick = async (e) => {
    try {
      e.preventDefault();
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append('image', image);
      const loadingToastId = toast.loading('Uploading image...');

      const response = await axios.post('http://localhost:4000/user/addImg', formData, { withCredentials: true });

      if (response.data.success) {
        setDetails((prevDetails) => ({ ...prevDetails, ProfilePic: response.data.data.key }));
        setUser((prevUser) => ({ ...prevUser, ProfilePic: response.data.data.key }));
        toast.update(loadingToastId, { render: response.data.message, type: 'success', isLoading: false, autoClose: 3000 });
      } else {
        toast.update(loadingToastId, { render: response.data.message, type: 'error', isLoading: false, autoClose: 3000 });
      }
    } catch (error) {
      toast.error('An error occurred while uploading the image.');
    }
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <ToastContainer />
      <div className="mt-24">
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className={`rounded-full p-4 ${currentMode === 'Dark' ? 'bg-secondary-dark-bg' : 'bg-white'}`}>
              <label htmlFor="profilePic" className="cursor-pointer">
                <img
                  src={user ? `http://localhost:4000/load/${user.ProfilePic}` : ''}
                  alt="User Avatar"
                  className="rounded-full w-32 h-32 object-cover"
                />
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImgClick}
                />
              </label>
            </div>
            <p className={`text-4xl font-bold mt-4 text-${currentMode === 'Dark' ? 'white' : 'black'}`}>@{user.username}</p>
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <button
            type="button"
            onClick={() => document.getElementById('profilePic').click()} // Trigger file input on hover
            className="py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            Edit Image
          </button>
          <button
            type="button"
            onClick={handleManageAITools}
            className="py-2 px-4 rounded-md hover:opacity-80 bg-green-500 text-white"
          >
            Manage AI Tools
          </button>
        </div>

        {/* Conditional Rendering of Channel Details */}
        <div className="mt-8 flex justify-center">
          <ChannelDetails details={details} currentMode={currentMode} />
        </div>
      </div >
    </>
  );
};

export default ViewAccount;
