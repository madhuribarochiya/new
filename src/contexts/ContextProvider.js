/* eslint-disable react/jsx-no-constructed-context-values */
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
  const [user, setUser] = useState();

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:4000/user/profile', {
        withCredentials: true,
      });
      if (response.data.success) {
        setIsLoggedIn(true);
        setUser(response.data.data);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    fetchUser();
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setCurrentMode(savedMode);
    }
  }, []);

  useEffect(() => {
  }, [user]);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: !isClicked[clicked] });

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
        user,
        setUser,
        fetchUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
