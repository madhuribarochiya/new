/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    DOB: '',
    gender: '',
    Description: '',
    About: '',
    username: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    setFormData({ ...formData, profileImage: file }); // Update the state with the file
  };

  // const handleGoogleSuccess = (response) => {
  //   console.log('Google login successful:', response);
  //   navigate('/'); // Redirect to home or desired route
  // };

  // const handleGoogleError = (error) => {
  //   console.log('Google login error:', error);
  // };

  const handleNext = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading('Sending data...');
    const response = await axios.post('http://localhost:4000/user/signup', formData);
    if (response.data.success) {
      toast.update(loadingToastId, { render: response.data.message, type: 'success', isLoading: false, autoClose: 3000 });
      setCurrentPage(2);
    } else {
      toast.update(loadingToastId, { render: response.data.message, type: 'error', isLoading: false, autoClose: 3000 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading('Sending data...');
    const response = await axios.post('http://localhost:4000/user/addDetails', formData);
    if (response.data.success) {
      toast.update(loadingToastId, { render: response.data.message, type: 'success', isLoading: false, autoClose: 3000 });
      toast.info('The user is created.Please verify the email and login');
      setTimeout(() => navigate('/home'), 7000);
    } else {
      toast.update(loadingToastId, { render: response.data.message, type: 'error', isLoading: false, autoClose: 3000 });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Sign Up
            </h2>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-gray-500 dark:text-gray-300"
            >
              <MdOutlineCancel size={24} />
            </button>
          </div>

          <form onSubmit={currentPage === 1 ? handleNext : handleSubmit}>
            {/* Page 1 */}
            {currentPage === 1 && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="example@example.com"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="johndoe"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Next
                </button>
              </>
            )}

            {/* Page 2 */}
            {currentPage === 2 && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Date of Birth
                  </label>
                  <input
                    id="DOB"
                    name="DOB"
                    type="date"
                    value={formData.DOB}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Description
                  </label>
                  <textarea
                    id="Description"
                    name="Description"
                    value={formData.Description}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="Tell us about yourself"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="About"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    About
                  </label>
                  <input
                    id="About"
                    name="About"
                    type="text"
                    value={formData.About}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="LinkedIn ID, etc."
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="profileImage"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Profile Image
                  </label>
                  <input
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    accept="image/*" // Accept only image files
                    onChange={handleFileChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </>
            )}
          </form>

          {/* Link to Login */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
