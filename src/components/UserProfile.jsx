// // // import React from 'react';
// // // import { MdOutlineCancel } from 'react-icons/md';
// // // import { useNavigate } from 'react-router-dom'; // Import useNavigate
// // // import { Button } from '.';
// // // import { useStateContext } from '../contexts/ContextProvider';
// // // import avatar from '../data/avatar.jpg';

// // // const UserProfile = () => {
// // //   const { currentColor } = useStateContext();
// // //   const navigate = useNavigate(); // Initialize the useNavigate hook

// // //   // Custom user profile options with onClick handlers
// // //   const userProfileData = [
// // //     {
// // //       title: 'Switch Account',
// // //       desc: 'Switch to a different account',
// // //       icon: <MdOutlineCancel />, // Replace with the desired icon
// // //       iconColor: 'blue',
// // //       iconBg: '#E5F3FF',
// // //       onClick: () => navigate('/login'), // Use navigate to redirect to login
// // //     },
// // //     {
// // //       title: 'View Account',
// // //       desc: 'View account details',
// // //       icon: <MdOutlineCancel />, // Replace with the desired icon
// // //       iconColor: 'green',
// // //       iconBg: '#E5FFEB',
// // //       onClick: () => navigate('/view-account'), // Use navigate to redirect to view account
// // //     },
// // //   ];

// // //   return (
// // //     <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
// // //       <div className="flex justify-between items-center">
// // //         <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
// // //         <Button
// // //           icon={<MdOutlineCancel />}
// // //           color="rgb(153, 171, 180)"
// // //           bgHoverColor="light-gray"
// // //           size="2xl"
// // //           borderRadius="50%"
// // //         />
// // //       </div>
// // //       <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
// // //         <img
// // //           className="rounded-full h-24 w-24"
// // //           src={avatar}
// // //           alt="user-profile"
// // //         />
// // //         <div>
// // //           <p className="font-semibold text-xl dark:text-gray-200">Michael Roberts</p>
// // //           <p className="text-gray-500 text-sm dark:text-gray-400">Administrator</p>
// // //           <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">info@shop.com</p>
// // //         </div>
// // //       </div>
// // //       <div>
// // //         {userProfileData.map((item, index) => (
// // //           <div
// // //             key={index}
// // //             className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]"
// // //             onClick={item.onClick} // Call the onClick handler
// // //           >
// // //             <button
// // //               type="button"
// // //               style={{ color: item.iconColor, backgroundColor: item.iconBg }}
// // //               className="text-xl rounded-lg p-3 hover:bg-light-gray"
// // //             >
// // //               {item.icon}
// // //             </button>

// // //             <div>
// // //               <p className="font-semibold dark:text-gray-200">{item.title}</p>
// // //               <p className="text-gray-500 text-sm dark:text-gray-400">{item.desc}</p>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //       <div className="mt-5">
// // //         <Button
// // //           color="white"
// // //           bgColor={currentColor}
// // //           text="Logout"
// // //           borderRadius="10px"
// // //           width="full"
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default UserProfile;
// // import React from 'react';
// // import { MdOutlineCancel } from 'react-icons/md';
// // import { useNavigate } from 'react-router-dom'; // Import useNavigate
// // import { Button } from '.';
// // import { useStateContext } from '../contexts/ContextProvider';
// // import avatar from '../data/avatar.jpg';

// // const UserProfile = () => {
// //   const { currentColor, user, setUser,isLoggedIn } = useStateContext();
// //   const navigate = useNavigate(); // Initialize the useNavigate hook

// //   const handleLogout = () => {
// //     setUser(null); // Set user to null on logout
// //     navigate('/login'); // Redirect to login page
// //   };

// //   return (
// //     <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
// //       <div className="flex justify-between items-center">
// //         <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
// //         <Button
// //           icon={<MdOutlineCancel />}
// //           color="rgb(153, 171, 180)"
// //           bgHoverColor="light-gray"
// //           size="2xl"
// //           borderRadius="50%"
// //         />
// //       </div>

// //       {/* Conditionally render content based on user authentication */}
// //       {isLoggedIn ? (
// //         <>
// //           <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
// //             <img
// //               className="rounded-full h-24 w-24"
// //               src={avatar} // You can replace this with the user's actual profile image
// //               alt="user-profile"
// //             />
// //             <div>
// //               <p className="font-semibold text-xl dark:text-gray-200">{user.name}</p>
// //               <p className="text-gray-500 text-sm dark:text-gray-400">{user.role}</p>
// //               <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">{user.email}</p>
// //             </div>
// //           </div>
// //           <div className="mt-5">
// //             <Button
// //               color="white"
// //               bgColor={currentColor}
// //               text="Logout"
// //               borderRadius="10px"
// //               width="full"
// //               onClick={handleLogout} // Logout the user
// //             />
// //           </div>
// //         </>
// //       ) : (
// //         <div className="mt-5">
// //           <Button
// //             color="white"
// //             bgColor={currentColor}
// //             text="Login"
// //             borderRadius="10px"
// //             width="full"
// //             onClick={() => navigate('/login')} // Redirect to login page
// //           />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default UserProfile;
// // import React from 'react';
// // import { MdOutlineCancel } from 'react-icons/md';
// // import { useNavigate } from 'react-router-dom'; // Import useNavigate
// // import { Button } from '.';
// // import { useStateContext } from '../contexts/ContextProvider';
// // import avatar from '../data/avatar.jpg';

// // const UserProfile = () => {
// //   const { currentColor, user, setUser, isLoggedIn } = useStateContext();
// //   const navigate = useNavigate(); // Initialize the useNavigate hook

// //   const handleLogout = () => {
// //     // setUser(null); // Set user to null on logout
// //     navigate('/login'); // Redirect to login page
// //   };

// //   const handleLogin = (e) => {
// //     e.preventDefault()
// //     console.log("hello");
// //     navigate('/login')
// //   }
// //   return (
// //     <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
// //       <div className="flex justify-between items-center">
// //         <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
// //         <Button
// //           icon={<MdOutlineCancel />}
// //           color="rgb(153, 171, 180)"
// //           bgHoverColor="light-gray"
// //           size="2xl"
// //           borderRadius="50%"
// //         />
// //       </div>

// //       {/* Conditionally render content based on user authentication */}
// //       {true ? (
// //         <>
// //           <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
// //             <img
// //               className="rounded-full h-24 w-24"
// //               src={avatar} // You can replace this with the user's actual profile image
// //               alt="user-profile"
// //             />
// //             <div>
// //               <p className="font-semibold text-xl dark:text-gray-200">bhavya</p>
// //               <p className="text-gray-500 text-sm dark:text-gray-400">ezio</p>
// //               <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">xyz@gmail.com</p>
// //             </div>
// //           </div>
// //           <div className="mt-5">
// //             <Button
// //               color="white"
// //               bgColor={currentColor}
// //               text="Logout"
// //               borderRadius="10px"
// //               width="full"
// //               onClick={handleLogout} // Logout the user
// //             />
// //           </div>
// //         </>
// //       ) : (
// //         <div className="mt-5">
// //           <Button
// //             color="white"
// //             bgColor={currentColor}
// //             text="Login"
// //             borderRadius="10px"
// //             width="full"
// //             onClick={handleLogin} // Redirect to login page
// //           />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default UserProfile;
// import React from 'react';
// import { MdOutlineCancel } from 'react-icons/md';
// import { IoLogInSharp } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import { Button } from '.';
// import { useStateContext } from '../contexts/ContextProvider';
// import avatar from '../data/avatar.jpg';

// const UserProfile = () => {
//   const { currentColor, isLoggedIn } = useStateContext();
//   const navigate = useNavigate(); // Initialize the useNavigate hook
//   // Custom user profile options with onClick handlers
//   const userProfileData = [
//     {
//       title: 'Switch Account',
//       desc: 'Switch to a different account',
//       icon: <MdOutlineCancel />, // Replace with the desired icon
//       iconColor: 'blue',
//       iconBg: '#E5F3FF',
//       onClick: () => navigate('/login'), // Use navigate to redirect to login
//     },
//     {
//       title: 'View Account',
//       desc: 'View account details',
//       icon: <IoLogInSharp />, // Replace with the desired icon
//       iconColor: 'green',
//       iconBg: '#E5FFEB',
//       onClick: () => navigate('/view-account'), // Use navigate to redirect to view account
//     },
//   ];
//   const LoginData = [
//     {
//       title: 'Login Account',
//       desc: 'Log in to an account',
//       icon: <IoLogInSharp />, // Replace with the desired icon
//       iconColor: 'blue',
//       iconBg: '#E5F3FF',
//       onClick: () => navigate('/login'), // Use navigate to redirect to login
//     }
//   ];

//   return (
//     <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
//       <div className="flex justify-end items-center">
//         <Button
//           icon={<MdOutlineCancel />}
//           color="rgb(153, 171, 180)"
//           bgHoverColor="light-gray"
//           size="2xl"
//           borderRadius="50%"
//         />
//       </div>
//       {isLoggedIn ? (<><p className="font-semibold text-lg dark:text-gray-200">User Profile</p><div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
//         <img
//           className="rounded-full h-24 w-24"
//           src={avatar}
//           alt="user-profile"
//         />
//         <div>
//           <p className="font-semibold text-xl dark:text-gray-200">Michael Roberts</p>
//           <p className="text-gray-500 text-sm dark:text-gray-400">Administrator</p>
//           <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">info@shop.com</p>
//         </div>
//       </div>
//         <div>
//           {userProfileData.map((item, index) => (
//             <div
//               key={index}
//               className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]"
//               onClick={item.onClick} // Call the onClick handler
//             >
//               <button
//                 type="button"
//                 style={{ color: item.iconColor, backgroundColor: item.iconBg }}
//                 className="text-xl rounded-lg p-3 hover:bg-light-gray"
//               >
//                 {item.icon}
//               </button>

//               <div>
//                 <p className="font-semibold dark:text-gray-200">{item.title}</p>
//                 <p className="text-gray-500 text-sm dark:text-gray-400">{item.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="mt-5">
//           <Button
//             color="white"
//             bgColor={currentColor}
//             text="Logout"
//             borderRadius="10px"
//             width="full"
//           />
//         </div></>) : (<>
//           <div>
//             {LoginData.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]"
//                 onClick={item.onClick} // Call the onClick handler
//               >
//                 <button
//                   type="button"
//                   style={{ color: item.iconColor, backgroundColor: item.iconBg }}
//                   className="text-xl rounded-lg p-3 hover:bg-light-gray"
//                 >
//                   {item.icon}
//                 </button>

//                 <div>
//                   <p className="font-semibold dark:text-gray-200">{item.title}</p>
//                   <p className="text-gray-500 text-sm dark:text-gray-400">{item.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="mt-5">
//             <Button
//               color="white"
//               bgColor={currentColor}
//               text="Logout"
//               borderRadius="10px"
//               width="full"
//             />
//           </div></>)}
//     </div>
//   );
// };

// export default UserProfile;
import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { IoLogInSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';

const UserProfile = () => {
  const { user,currentColor, isLoggedIn } = useStateContext();
  const navigate = useNavigate(); // Initialize the useNavigate hook
  // Custom user profile options with onClick handlers
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
      onClick: () => navigate('/view-account'), // Use navigate to redirect to view account
    },
  ];
  const LoginData = [
    {
      title: 'Login Account',
      desc: 'Log in to an account',
      icon: <IoLogInSharp />, // Replace with the desired icon
      iconColor: 'blue',
      iconBg: '#E5F3FF',
      onClick: () => navigate('/login'), // Use navigate to redirect to login
    }
  ];

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-end items-center">
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      {isLoggedIn ? (<><p className="font-semibold text-lg dark:text-gray-200">User Profile</p><div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
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
              onClick={item.onClick} // Call the onClick handler
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
        <div className="mt-5">
          <Button
            color="white"
            bgColor={currentColor}
            text="Logout"
            borderRadius="10px"
            width="full"
          />
        </div></>) : (<>
          <div>
            {LoginData.map((item, index) => (
              <div
                key={index}
                className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]"
                onClick={item.onClick} // Call the onClick handler
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
          <div className="mt-5">
            <Button
              color="white"
              bgColor={currentColor}
              text="Logout"
              borderRadius="10px"
              width="full"
            />
          </div></>)}
    </div>
  );
};

export default UserProfile;