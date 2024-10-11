import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import ViewAccount from './components/ViewAccount';
import LoginPage from './components/login'; // Import the LoginPage component
import Signup from './components/signup'; // Import the Signup component
import UploadTool from './components/UploadTool';
import UploadedTools from './components/UploadedTools';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Home, Library, History, Pie } from './pages';
import Yourch from './pages/Yourch';
import './App.css';
import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  // Determine if we are on the login or signup page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: '50%' }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {!isAuthPage && ( // Only show Sidebar if not on auth pages
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu && !isAuthPage // Adjust layout based on auth page
              ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full'
              : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'
          }
        >
          {!isAuthPage && ( // Only show Navbar if not on auth pages
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
          )}
          <div>
            {themeSettings && <ThemeSettings />}

            <Routes>
              {/* Render the Login Page */}
              <Route path="/login" element={<LoginPage />} />
              {/* Render the Signup Page */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/UploadTool" element={<UploadTool />} />
              <Route path="/UploadedTools" element={<UploadedTools />} />

              {/* dashboard  */}
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/view-account" element={<ViewAccount />} />
              {/* Other routes... */}
              <Route path="/yourch" element={<Yourch />} />
              <Route path="/Library" element={<Library />} />
              <Route path="/History" element={<History />} />

              {/* apps  */}
              {/* <Route path="/kanban" element={<Kanban />} /> */}
              {/* <Route path="/editor" element={<Editor />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/color-picker" element={<ColorPicker />} /> */}

              {/* charts  */}
              {/* <Route path="/area" element={<Area />} /> */}
              {/* <Route path="/bar" element={<Bar />} /> */}
              <Route path="/pie" element={<Pie />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

// Wrap the App component with BrowserRouter here
const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWithRouter;
