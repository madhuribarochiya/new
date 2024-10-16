/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { IoLogInSharp, IoCreate, IoLogOut } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const UserProfile = () => {
  const { user, isLoggedIn } = useStateContext();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.get('http://localhost:4000/user/logout', { withCredentials: true });
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed:', error);
    }
  };

  const userProfileData = [
    {
      title: 'Switch Account',
      desc: 'Switch to a different account',
      icon: <MdOutlineCancel />, // Replace with the desired icon
      iconColor: 'blue',
      iconBg: '#E5F3FF',
      onClick: () => navigate('/login'), // Use navigate to redirect to login
    },
    {
      title: 'View Account',
      desc: 'View account details',
      icon: <IoLogInSharp />, // Replace with the desired icon
      iconColor: 'green',
      iconBg: '#E5FFEB',
      onClick: () => navigate('/viewAccount'), // Use navigate to redirect to view account
    },
    {
      title: 'Logout',
      desc: 'Logout of Current Account',
      icon: <IoLogOut />, // Replace with the desired icon
      iconColor: 'red',
      iconBg: '#E5FFEB',
      onClick: handleLogout, // Use navigate to redirect to view account
    },
  ];
  const LoginData = [
    {
      title: 'Login Account',
      desc: 'Log in to an account',
      icon: <IoLogInSharp />,
      iconColor: 'blue',
      iconBg: '#E5F3FF',
      onClick: () => navigate('/login'),
    },
    {
      title: 'Create Account',
      desc: 'Create a new account',
      icon: <IoCreate />,
      iconColor: 'blue',
      iconBg: '#E5F3FF',
      onClick: () => navigate('/signup'),
    },
  ];

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      {isLoggedIn ? (
        <><p className="font-semibold text-lg dark:text-gray-200">User Profile</p><div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
          <img
            className="rounded-full h-24 w-24"
            src={user ? `http://localhost:4000/load/${user.ProfilePic}` : ''}
            alt="user-profile"
          />
          <div>
            <p className="font-semibold text-xl dark:text-gray-200">{user.name}</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">{user.username}</p>
            <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">{user.email}</p>
          </div>
        </div>
          <div>
            {userProfileData.map((item, index) => (
              <div
                key={index}
                className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]"
                onClick={item.onClick}
              >
                <button
                  type="button"
                  style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                  className="text-xl rounded-lg p-3 hover:bg-light-gray"
                >
                  {item.icon}
                </button>

                <div>
                  <p className="font-semibold dark:text-gray-200">{item.title}</p>
                  <p className="text-gray-500 text-sm dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div>
            {LoginData.map((item, index) => (
              <div
                key={index}
                className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]"
                onClick={item.onClick}
              >
                <button
                  type="button"
                  style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                  className="text-xl rounded-lg p-3 hover:bg-light-gray"
                >
                  {item.icon}
                </button>

                <div>
                  <p className="font-semibold dark:text-gray-200">{item.title}</p>
                  <p className="text-gray-500 text-sm dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="mt-5">
            <Button
              color="white"
              bgColor={currentColor}
              text="Logout"
              borderRadius="10px"
              width="full"
              onClick={handleLogout}
            />
          </div> */}
        </>
      )}
    </div>
  );
};

export default UserProfile;
