// src/components/LogoutButton.jsx
import React from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="text-right mb-6">
      <button
        onClick={handleLogout}
        className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
