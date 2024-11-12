// AITool.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaShareAlt, FaArrowLeft } from 'react-icons/fa';
import Modal from 'react-modal';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
import { toast, ToastContainer } from "react-toastify";

Modal.setAppElement('#root');

const AITool = () => {
    const navigate = useNavigate();
    const [tool, setTool] = useState(null);
    const { currentMode } = useStateContext();
    const [newComment, setNewComment] = useState('');

    const fetchTool = async () => {
        const toolId = window.location.pathname.split('/').pop();
        const response = await axios.get(`http://localhost:4000/tools/getDetails/${toolId}`, { withCredentials: true });
        if (response.data.success) {
            setTool(response.data.data);
        }
    };

    const addView = async () => {
        try {
            const toolId = window.location.pathname.split('/').pop();
            await axios.post(`http://localhost:4000/tools/addView/${toolId}`, {}, { withCredentials: true });
        } catch (error) {
            console.error("Error adding view:", error);
        }
    };

    const handleLike = async () => {
        try {
            const toolId = window.location.pathname.split('/').pop();
            const res = await axios.post(`http://localhost:4000/tools/addLike/${toolId}`, {}, { withCredentials: true });
            console.log(res)
            fetchTool();
        } catch (error) {
            console.error("Error liking tool:", error);
        }
    };

    const handleDislike = async () => {
        try {
            const toolId = window.location.pathname.split('/').pop();
            const res = await axios.post(`http://localhost:4000/tools/addDislike/${toolId}`, {}, { withCredentials: true });
            console.log(res)
            fetchTool();
        } catch (error) {
            console.error("Error disliking tool:", error);
        }
    };

    const handleAddComment = async () => {
        try {
            const toastId = toast.loading("Adding comment");
            const toolId = window.location.pathname.split('/').pop();
            const res = await axios.post(`http://localhost:4000/tools/addComment/${toolId}`, { text: newComment }, { withCredentials: true });
            if (res.data.success) {
                toast.update(toastId, { render: "Comment added", type: "success", isLoading: false, autoClose: 3000 });
            }else{
                toast.update(toastId, { render: "Error adding Comment", type: "error", isLoading: false, autoClose: 3000 });
            }
            setNewComment('');
            fetchTool();
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    useEffect(() => {
        addView();
        fetchTool();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className={`flex flex-col items-center min-h-screen p-8`}>
                <button
                    onClick={() => navigate(-1)}
                    className="text-blue-500 underline mb-4 self-start text-2xl"
                >
                    <FaArrowLeft className="inline-block mr-2" />
                    Go Back
                </button>

                {/* Centered Image */}
                <img
                    src={`http://localhost:4000/load/${tool?.image[0]}`} // Updated to handle image array
                    alt={tool?.name}
                    className="w-3/4 h-64 object-cover rounded-lg mb-8 shadow-lg"
                />

                <h1 className={`text-3xl text-${currentMode === "Dark" ? 'white' : 'black'} font-bold mb-4`}>{tool?.name}</h1>
                <p className={`text-lg text-${currentMode === "Dark" ? 'white' : 'black'} mb-6 text-start`}>{tool?.description}</p>

                <div className="flex space-x-6 mb-8">
                    <button className="flex items-center text-blue-500">
                        <FaThumbsUp className="mr-2" onClick={handleLike} /> {tool?.likes}
                    </button>
                    <button className="flex items-center text-red-500">
                        <FaThumbsDown className="mr-2" onClick={handleDislike} /> {tool?.dislikes}
                    </button>
                    <button
                        className="flex items-center text-purple-500"
                        onClick={() => navigator.clipboard.writeText(window.location.href)}
                    >
                        <FaShareAlt className="mr-2" /> Share
                    </button>
                </div>

                {/* Videos Section */}
                {tool?.videos.length > 0 && (
                    <div className="w-full mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Videos</h2>
                        <ul className="space-y-4">
                            {tool.videos.map((video, index) => (
                                <li key={index} className="text-gray-700">
                                    <video controls className="w-full h-auto rounded-lg shadow-md">
                                        <source src={`http://localhost:4000/load/${video}`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Files Section */}
                {tool?.files.length > 0 && (
                    <div className="w-full mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Files</h2>
                        <ul className="space-y-4">
                            {tool.files.map((file, index) => (
                                <li key={index} className="text-gray-700">
                                    <a href={`http://localhost:4000/load/${file}`} className="text-blue-500 underline" download>
                                        {file}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Comments Section */}
                <div className="w-4/5 mt-8">
                    <h2 className={`text-2xl text-${currentMode === "Dark" ? 'white' : 'black'} font-semibold mb-4`}>Comments</h2>
                    <ul className="space-y-4">
                        {tool?.comments.length > 0 ? (
                            tool.comments.map((comment, index) => (
                                <li key={index} className={`border-b pb-2 mb-2 text-${currentMode === "Dark" ? 'white' : 'black'}`}>
                                    <div className="font-semibold">{comment.userId.username}</div>
                                    <div className="text-sm text-gray-500">{new Date(comment.timestamp).toLocaleString()}</div>
                                    <div className="mt-1">{comment.text}</div>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500">No comments available.</li>
                        )}
                    </ul>
                    {/* UI to add a comment */}
                    <div className="mt-4">
                        <textarea
                            className="w-full p-2 border rounded"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button
                            className="mt-2 bg-blue-500 text-white p-2 rounded"
                            onClick={handleAddComment}
                        >
                            Submit Comment
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default AITool;
