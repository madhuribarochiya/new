// // import React, { createContext, useContext, useState } from 'react';

// // const StateContext = createContext();

// // const initialState = {
// //   chat: false,
// //   cart: false,
// //   userProfile: false,
// //   notification: false,
// // };

// // export const ContextProvider = ({ children }) => {
// //   const [screenSize, setScreenSize] = useState(undefined);
// //   const [currentColor, setCurrentColor] = useState('#03C9D7');
// //   const [currentMode, setCurrentMode] = useState('Light');
// //   const [themeSettings, setThemeSettings] = useState(false);
// //   const [activeMenu, setActiveMenu] = useState(true);
// //   const [isClicked, setIsClicked] = useState(initialState);

// //   const setMode = (e) => {
// //     setCurrentMode(e.target.value);
// //     localStorage.setItem('themeMode', e.target.value);
// //   };

// //   const setColor = (color) => {
// //     setCurrentColor(color);
// //     localStorage.setItem('colorMode', color);
// //   };

// //   const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

// //   return (
// //     // eslint-disable-next-line react/jsx-no-constructed-context-values
// //     <StateContext.Provider value={{ currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings }}>
// //       {children}
// //     </StateContext.Provider>
// //   );
// // };

// // export const useStateContext = () => useContext(StateContext);
// import React, { createContext, useContext, useState } from 'react';

// const StateContext = createContext();

// const initialState = {
//   chat: false,
//   cart: false,
//   userProfile: false,
//   notification: false,
// };

// export const ContextProvider = ({ children }) => {
//   const [screenSize, setScreenSize] = useState(undefined);
//   const [currentColor, setCurrentColor] = useState('#03C9D7');
//   const [currentMode, setCurrentMode] = useState('Light');
//   const [themeSettings, setThemeSettings] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(true);
//   const [isClicked, setIsClicked] = useState(initialState);

//   // New state for user authentication
//   const [user, setUser] = useState(null); // Null means no user is logged in

//   const setMode = (e) => {
//     setCurrentMode(e.target.value);
//     localStorage.setItem('themeMode', e.target.value);
//   };

//   const setColor = (color) => {
//     setCurrentColor(color);
//     localStorage.setItem('colorMode', color);
//   };

//   const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

//   return (
//     <StateContext.Provider value={{
//       currentColor,
//       currentMode,
//       activeMenu,
//       screenSize,
//       setScreenSize,
//       handleClick,
//       isClicked,
//       initialState,
//       setIsClicked,
//       setActiveMenu,
//       setCurrentColor,
//       setCurrentMode,
//       setMode,
//       setColor,
//       themeSettings,
//       setThemeSettings,
//       user,
//       setUser, // Expose the setUser method to update authentication status
//     }}>
//       {children}
//     </StateContext.Provider>
//   );
// };

// export const useStateContext = () => useContext(StateContext);
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// const StateContext = createContext();

// const initialState = {
//   chat: false,
//   cart: false,
//   userProfile: false,
//   notification: false,
// };

// export const ContextProvider = ({ children }) => {
//   const [screenSize, setScreenSize] = useState(undefined);
//   const [currentColor, setCurrentColor] = useState('#03C9D7');
//   const [currentMode, setCurrentMode] = useState('Light');
//   const [themeSettings, setThemeSettings] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(true);
//   const [isClicked, setIsClicked] = useState(initialState);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // New login state

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/verify", {
//           withCredentials: true,
//         });
//         if (response.data.success) {
//           setIsLoggedIn(true);
//         }else{
//           setIsLoggedIn(false);
//         }
//       } catch (error) {
//         console.error("Error fetching user data : ", error);
//       }
//     };

//     fetchUser();
//   }, [isLoggedIn]);
//   const setMode = (e) => {
//     setCurrentMode(e.target.value);
//     localStorage.setItem('themeMode', e.target.value);
//   };

//   const setColor = (color) => {
//     setCurrentColor(color);
//     localStorage.setItem('colorMode', color);
//   };

//   const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

//   return (
//     <StateContext.Provider
//       value={{
//         currentColor,
//         currentMode,
//         activeMenu,
//         screenSize,
//         setScreenSize,
//         handleClick,
//         isClicked,
//         initialState,
//         setIsClicked,
//         setActiveMenu,
//         setCurrentColor,
//         setCurrentMode,
//         setMode,
//         setColor,
//         themeSettings,
//         setThemeSettings,
//         isLoggedIn, // Provide login state
//         setIsLoggedIn, // Function to toggle login state
//       }}
//     >
//       {children}
//     </StateContext.Provider>
//   );
// };

// export const useStateContext = () => useContext(StateContext);
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New login state
  const [user, setUser] = useState()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user/profile", {
          withCredentials: true,
        });
        if (response.data.success) {
          setIsLoggedIn(true);
          setUser(response.data.data);
        } else {
          setIsLoggedIn(false)
        }
      } catch (error) {
        console.error("Error fetching user data : ", error);
        setIsLoggedIn(false)
      }
    };

    fetchUser();
  }, [isLoggedIn]);



  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
        isLoggedIn, // Provide login state
        setIsLoggedIn, // Function to toggle login state
        user, setUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
