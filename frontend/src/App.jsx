import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";

import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";

import ChatHomePage from "./chat/pages/HomePage";
import ChatSettingsPage from "./chat/pages/SettingsPage";
import ChatProfilePage from "./chat/pages/ProfilePage";

import { Toaster } from "react-hot-toast";
import LoadingSpinner from "./components/common/LoadingSpinner";
import React from "react";
import { useAuthStore } from "./stores/useAuthStore";
import { useThemeStore } from "./stores/useThemeStore";

function App() {
  const location = useLocation();
  const isInChatPage = location.pathname.includes("/chat");

  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if (isCheckingAuth && !authUser) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div data-theme={theme} className="flex max-w-7xl mx-auto">
      {/* Common component, bc it's not wrapped with Routes */}
      {authUser && <Sidebar />}
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:username"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Routes>
        <Route
          path="/chat/"
          element={authUser ? <ChatHomePage /> : <Navigate to="/login" />}
        />
        <Route path="/chat/settings" element={<ChatSettingsPage />} />
        <Route
          path="/chat/profile"
          element={authUser ? <ChatProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
      {authUser && !isInChatPage && <RightPanel />}
      <Toaster />
    </div>
  );
}

export default App;
