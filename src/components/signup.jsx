import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    description: '',
    about: '',
    profileImage: null,
    username: ''
  });

  const [currentPage, setCurrentPage] = useState(1); // State to manage page navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    setFormData({ ...formData, profileImage: file }); // Update the state with the file
  };

  const handleGoogleSuccess = (response) => {
    console.log('Google login successful:', response);
    navigate('/'); // Redirect to home or desired route
  };

  const handleGoogleError = (error) => {
    console.log('Google login error:', error);
  };

  const handleNext = (e) => {
    e.preventDefault(); // Prevent default form submission
    setCurrentPage(2); // Go to the next page
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Form Data Submitted:', formData);
    // Handle final submission logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Sign Up
          </h2>
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 dark:text-gray-300"
          >
            <MdOutlineCancel size={24} />
          </button>
        </div>

        {/* Google Sign-Up Button */}
        <div className="mb-6">
          <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID"
            buttonText="Sign Up with Google"
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            className="w-full"
          />
        </div>

        {/* Form */}
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
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
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
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="mt-1 p-2 border rounded-md w-full"
                  placeholder="Tell us about yourself"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  About
                </label>
                <input
                  id="about"
                  name="about"
                  type="text"
                  value={formData.about}
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
  );
};

export default Signup;
