import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { FaThumbsUp, FaThumbsDown, FaCommentAlt, FaShareAlt, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-modal';

// Ensure the app element exists in your HTML
Modal.setAppElement('#root'); // Ensure this ID matches an existing element

const UploadedTools = () => {
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const { user, currentMode } = useStateContext();
  // State for managing uploaded tools
  const [tools, setTools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [toolToDelete, setToolToDelete] = useState(null); // State to hold the tool ID to delete

  useEffect(() => {
    const fetchUserTools = async () => {
      try {
        if (user && user.username) {
          const response = await axios.get(`http://localhost:4000/channel/getTools/${user?.username}`, {
            withCredentials: true,
          });
          if (response.data.success) {
            setTools(Array.isArray(response.data.data) ? response.data.data : []); // Ensure tools is an array
          }
        }
      } catch (error) {
        console.error('Error fetching user tools', error);
      }
    };
    fetchUserTools();
  }, [user]);

  const handleShare = (toolID) => {
    navigator.clipboard.writeText(`localhost:3000/tool/${toolID}`);
  };

  const openModal = (toolId) => {
    setToolToDelete(toolId); // Set the tool ID to delete
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setToolToDelete(null); // Reset the tool ID
  };

  const handleDelete = async () => {
    if (!toolToDelete) return; // Exit if no tool is set
    const toastid = toast.loading("Deleting tool..."); // Show loading toast
    try {
      const response = await axios.delete(`http://localhost:4000/tools/deleteTool/${toolToDelete}`, { withCredentials: true });
      if (response.data.success) {
        toast.update(toastid, { render: "Tool deleted", type: 'success', isLoading: false, autoClose: 3000 });
        setTools(tools.filter((tool) => tool._id !== toolToDelete)); // Use _id instead of id
      } else {
        toast.update(toastid, { render: "Error deleting tool", type: 'error', isLoading: false, autoClose: 3000 });
      }
    } catch (error) {
      toast.update(toastid, { render: "Error deleting tool", type: 'error', isLoading: false, autoClose: 3000 });
      console.error('Error deleting tool', error); // Log the error for debugging
    }
    closeModal(); // Close the modal after deletion
  };

  // Redirect to the UploadTool page
  const redirectToUploadTool = () => {
    navigate('/UploadTool'); // Specify the route to navigate to
  };

  return (
    <>
      <ToastContainer />
      {/* Modal for confirmation */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50 bg-transparent"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white border-2 border-gray-300 rounded-3xl p-6 max-w-sm w-full"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50">
          <h2 className="text-lg font-semibold mb-4" >Confirm Deletion</h2>
          <p className="mb-6">Are you sure you want to delete this tool?</p>
          <div className="flex justify-end">
            <button onClick={handleDelete} className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md mr-2">Yes, Delete</button>
            <button onClick={closeModal} className="bg-gray-300 text-black font-semibold py-2 px-4 rounded-md">Cancel</button>
          </div>
        </div>
      </Modal>
      <div className="p-8">
        <h1 className={`text-${currentMode === "Dark" ? 'white' : "black"} text-2xl font-bold mb-6`}>Uploaded AI Tools</h1>
        <button
          type="button"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mb-6 hover:bg-blue-600 flex items-center"
          onClick={redirectToUploadTool} // Use the redirect function on button click
        >
          <FaPlus className="mr-2" /> Upload New Tool
        </button>

        {/* Display Uploaded Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool._id}
              className="bg-white dark:bg-secondary-dark-bg p-6 rounded-lg shadow-lg relative"
            >
              <img src={`http://localhost:4000/load/${tool.image[0] || 'default tool icon.jpeg'}`} alt={tool.name} className="w-full h-32 object-cover rounded-lg mb-4" onClick={() => navigate(`/tool/${tool._id}`)}/>
              <h2 className="text-lg font-semibold mb-2 dark:text-gray-200">{tool.name}</h2>
              <p className="overflow-hidden text-sm text-gray-500 dark:text-gray-400 mb-4">{tool.description.length > 100 ? `${tool.description.substring(0, 100)}...` : tool.description}</p>
              <div className="flex justify-between mb-4">
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
                  <FaShareAlt className="mr-1" /> Share
                </button>
              </div>
              <button
                type="button"
                onClick={() => openModal(tool._id)} // Open modal on delete button click
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UploadedTools;
