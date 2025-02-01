import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { APP_TITLE } from '../constants';

const Header: React.FC = () => {
  const { isLoggedIn, logout, setUser, user } = useAuthStore();
  const [storedUser, setStoredUser] = useState<{ username: string; role: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData?.username) {
      setUser(userData);
      setStoredUser(userData);
    }
  }, [setUser]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="bg-blue-900 text-white py-4 px-6 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <Link to="/" className="hover:text-gray-200">
          {APP_TITLE}
        </Link>
      </h1>

      {isLoggedIn && (
        <div className="flex items-center space-x-4">
          <span className="font-semibold">
            {storedUser?.username || user?.username || 'User'} ({storedUser?.role || user?.role || 'Guest'})
          </span>
          <button
            onClick={handleLogout}
            className="bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
