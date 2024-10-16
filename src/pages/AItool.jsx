// AITool.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaCommentAlt, FaShareAlt, FaArrowLeft } from 'react-icons/fa';
import Modal from 'react-modal'; // Import react-modal

// Set the root element for Modal
Modal.setAppElement('#root');

const AITool = () => {
    const navigate = useNavigate();

    // Dummy tool data
    const tool = {
        name: 'Dummy AI Tool',
        description: 'This tool showcases AI-based functionalities that assist with data generation and predictions.',
        likes: 150,
        dislikes: 10,
        comments: [
            { id: 1, text: 'Great tool! It helped me a lot.' },
            { id: 2, text: 'Needs better documentation.' },
            { id: 3, text: 'Is there a pro version available?' },
        ],
        image: 'https://via.placeholder.com/600x300', // Placeholder image
    };

    // Modal state for comments section
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);

    const openComments = () => setIsCommentsOpen(true);
    const closeComments = () => setIsCommentsOpen(false);

    return (
        <div className={`flex flex-col items-center min-h-screen p-8`}>
            <FaArrowLeft
                onClick={() => navigate(-1)}
                className="text-blue-500 underline mb-4 self-start text-4xl" // Increased size
            >
                Go Back
            </FaArrowLeft >

            {/* Centered Image */}
            <img
                src={tool.image}
                alt={tool.name}
                className="w-3/4 h-64 object-cover rounded-lg mb-8 shadow-lg"
            />

            <h1 className="text-3xl font-bold mb-4">{tool.name}</h1>
            <p className="text-lg text-gray-600 mb-6 text-center">{tool.description}</p>

            <div className="flex space-x-6 mb-8">
                <button className="flex items-center text-blue-500">
                    <FaThumbsUp className="mr-2" /> {tool.likes}
                </button>
                <button className="flex items-center text-red-500">
                    <FaThumbsDown className="mr-2" /> {tool.dislikes}
                </button>
                <button
                    className="flex items-center text-green-500"
                    onClick={openComments} // Open the comments modal
                >
                    <FaCommentAlt className="mr-2" /> {tool.comments.length} Comments
                </button>
                <button
                    className="flex items-center text-purple-500"
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                >
                    <FaShareAlt className="mr-2" /> Share
                </button>
            </div>

            {/* Lightbox Modal for Comments */}
            <Modal
                isOpen={isCommentsOpen}
                onRequestClose={closeComments}
                className="fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                    <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                    <ul className="space-y-4">
                        {tool.comments.map((comment) => (
                            <li key={comment.id} className="text-gray-700 border-b pb-2">
                                {comment.text}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={closeComments}
                        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default AITool;